import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  // allProducts:any;
  allProducts:any[] = [];
  order:any={
    products:[],
    store_id:String,
    user_id:String,
  }
  constructor(private OrdersService: OrdersService, private router: Router) {
    let data:any =localStorage.getItem('cart');
    this.allProducts = JSON.parse(data);
    this.order.store_id=this.allProducts[0].store_id;
    this.order.user_id="64601573d43cf29ceb17f570";

  }


  // getData(){
  //   this.allProducts = localStorage.getItem('cart');
  // }

  AddOrder(){
    this.allProducts.forEach(product => {
      let newPrice= parseFloat(product.price);
      product.price=newPrice;
      product.product_name=product.product_title;
      delete product.product_title;
      delete product.store_id;
      delete product.category;
      this.order.products.push(product);
    });

    this.OrdersService.AddNewOrder(this.order).subscribe();
    alert("Order confirmed");
    this.router.navigateByUrl('/orders');
  }
}
