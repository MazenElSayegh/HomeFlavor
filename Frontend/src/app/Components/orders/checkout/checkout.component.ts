import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/Services/orders.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    trigger('flipCard', [
      state(
        'front',
        style({
          transform: 'none',
        })
      ),
      state(
        'back',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      transition('front => back', [animate('0.6s')]),
      transition('back => front', [animate('0.6s')]),
    ]),
  ],
})
export class CheckoutComponent {
  // allProducts:any;
  allProducts: any[] = [];
  user_data:any;
  totalCost = 0;
  order: any = {
    products: [],
    store_id: String,
    user_id: String,
  };

  constructor(private OrdersService: OrdersService, private router: Router,private LocalStorageService:LocalStorageService) {
    let data: any = localStorage.getItem('cart');
    console.log(data)
    this.LocalStorageService.getData('jwt_token').subscribe((data) => {
      this.user_data = data;
    });
    console.log(this.user_data);
    this.allProducts = JSON.parse(data);
    this.order.store_id = this.allProducts[0].store_id;
    this.order.user_id = this.user_data.user_id;
    this.allProducts.forEach((product) => {
      this.totalCost += product.price * product.quantity;
    });
  }

  AddOrder() {
    this.allProducts.forEach((product) => {
      let newPrice = parseFloat(product.price);
      product.price = newPrice;
      product.product_name = product.product_title;
      delete product.product_title;
      delete product.store_id;
      delete product.category;
      this.order.products.push(product);
    });

    this.OrdersService.AddNewOrder(this.order).subscribe();
    alert('Order confirmed');
    this.LocalStorageService.removeData('cart');
    this.router.navigateByUrl('/orders');
  }



}
