import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/Services/orders.service';
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
  totalCost = 0;
  order: any = {
    products: [],
    store_id: String,
    user_id: String,
  };

  constructor(private OrdersService: OrdersService, private router: Router) {
    let data: any = localStorage.getItem('cart');
    this.allProducts = JSON.parse(data);
    this.order.store_id = this.allProducts[0].store_id;
    this.order.user_id = '6468ab3be2cb9a2bee3a1696';
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
    this.router.navigateByUrl('/orders');
  }


}
