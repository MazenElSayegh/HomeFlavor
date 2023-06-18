import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/Services/orders.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { BackendService } from 'src/app/Services/backend.service';
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
  subscriptionDiscount: any = 0;
  paymentHandler: any = null;
  allProducts: any[] = [];
  user_data: any;
  totalCost = 0;
  order: any = {
    products: [],
    store_id: String,
    user_id: String,
  };

  constructor(
    private OrdersService: OrdersService,
    private myService: BackendService,
    private router: Router,
    private LocalStorageService: LocalStorageService
  ) {
    let data: any = localStorage.getItem('cart');
    this.LocalStorageService.getData('jwt_token').subscribe((data) => {
      this.user_data = data;
      if (this.user_data) {
        this.myService.getUserByID(this.user_data.user_id).subscribe({
          next: (data) => {
            this.user_data = data;
            if(this.user_data.is_subscribed){
              console.log(this.user_data.is_subscribed)
              this.subscriptionDiscount=0.2;
              this.totalCost=this.totalCost*0.8
            }
          },
          error: (err) => {
            console.log(err);
            console.log("innnn")
          },
        });
      }
    });
    this.allProducts = JSON.parse(data);
    this.order.store_id = this.allProducts[0].store_id;
    this.order.user_id = this.user_data.user_id;
    this.allProducts.forEach((product) => {
      this.totalCost += product.price * product.quantity;
    });
    console.log("user",this.user_data)
    if(this.user_data.is_subscribed){
      console.log(this.user_data.is_subscribed)
      this.subscriptionDiscount=0.2;
      this.totalCost=this.totalCost*0.8
    }
  }

  ngOnInit() {
    this.invokeStripe();
    console.log(this.user_data.is_subscribed)
  }

  AddOrder() {
    this.allProducts.forEach((product) => {
      let newPrice = parseFloat(product.price);
      product.price = newPrice;
      if(this.user_data.is_subscribed){
        product.price=newPrice*0.9/1.1
      }
      product.product_name = product.product_title;
      delete product.product_title;
      delete product.store_id;
      delete product.category;
      this.order.products.push(product);
    });

    this.OrdersService.AddNewOrder(this.order).subscribe();
    this.LocalStorageService.removeData('cart');
  }
  reload() {
    location.href = '/orders';
  }

  showButton() {
    let confirmButton = document.querySelector('.confirmButton');
    confirmButton?.classList.remove('hideButton');
    confirmButton?.classList.add('showButton');
  }
  hideButton() {
    let confirmButton = document.querySelector('.confirmButton');
    confirmButton?.classList.remove('showButton');
    confirmButton?.classList.add('hideButton');
  }
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NBO2YI8Mgz307EgfWYcnNfk7ccSrtdKyhJpHtB477RX7Eh32wTZdpbjdJ0CQBasiflrNknBeeRGxMYevmyhbEB200vuQeWDLw',
      locale: 'auto',
      token: (stripeToken: any) => {
        this.AddOrder();
        this.reload();
      },
    });
    paymentHandler.open({
      name: 'HomeFlavor',
      description: 'Credit card details',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51NBO2YI8Mgz307EgfWYcnNfk7ccSrtdKyhJpHtB477RX7Eh32wTZdpbjdJ0CQBasiflrNknBeeRGxMYevmyhbEB200vuQeWDLw',
          locale: 'auto',
          token: function (stripeToken: any) {
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
