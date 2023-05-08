import { Component } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent {
  id:any;
  order:any;
  constructor(myRoute:ActivatedRoute, public myService: OrdersService){
    this.id= myRoute.snapshot.params["id"];
  }
  ngOnInit(): void {
    this.myService.GetOrderByID(this.id).subscribe(
      {
        next:(data)=>{this.order=data;
        console.log(this.order.products);},
        error:(err)=>{console.log(err);
        }
      }
    )
  }
}
