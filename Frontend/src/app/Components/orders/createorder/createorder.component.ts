import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators, FormBuilder} from '@angular/forms';
import { OrdersService } from 'src/app/Services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.css']
})
export class CreateorderComponent {
  constructor(private myService:OrdersService,private router:Router){ }

  validationForm=new FormGroup({
    product_name:new FormControl(null),
    price:new FormControl(null),
    product_image:new FormControl(null),
    product_details:new FormControl(null),
    quantity:new FormControl(null),
  })


  AddOrder(product_name:any,product_image:any,price:any,product_details:any,quantity:any){
    console.log(product_name)
    let integerQuantity=parseInt(quantity)
    let floatPrice=parseFloat(price)
    let product={product_name,product_image,floatPrice,product_details,integerQuantity}
    let products=[product]
    let newOrder = {products};
    this.myService.AddNewOrder(newOrder).subscribe();
    alert("added successfully");
    this.router.navigateByUrl('/orders');
  }

}
