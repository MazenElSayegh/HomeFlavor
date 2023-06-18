import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { BackendService } from 'src/app/Services/backend.service';
import { OrdersService } from 'src/app/Services/orders.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() addedProducts: any;
  paymentHandler: any = null;
  user_data: any;
  user_image: any;
  count: any;
  orders: any[] = [];
  storeID: any;
  constructor(
    private localStorageService: LocalStorageService,
    private myService: BackendService,
    private ordersService: OrdersService
  ) {
    this.count = 0;
      ordersService.GetAllOrders().subscribe({
        next: (data: any) => {
          this.orders = data;
          this.orders.forEach((order) => {
            this.storeID = order.store_id._id;
            if (order.status == 'Pending') {
              this.count = this.count + 1;
            }
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  localhost = 'http://localhost:7005';
  removeProduct(product: any) {
    let arrayOfProducts = localStorage.getItem('cart');
    if (arrayOfProducts) {
      let data = JSON.parse(arrayOfProducts);
      data.forEach((item: any, index: any) => {
        if (item._id === product._id) {
          data.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(data));
          this.addedProducts = data;
        }
      });
    }
  }

  incrementQuantity(product: any) {
    let arrayOfProducts = localStorage.getItem('cart');
    if (arrayOfProducts) {
      let data = JSON.parse(arrayOfProducts);
      data.forEach((item: any, index: any) => {
        if (item._id === product._id) {
          ++data[index].quantity;
          localStorage.setItem('cart', JSON.stringify(data));
          this.addedProducts = data;
        }
      });
    }
  }

  decrementQuantity(product: any) {
    let arrayOfProducts = localStorage.getItem('cart');
    if (arrayOfProducts) {
      let data = JSON.parse(arrayOfProducts);
      data.forEach((item: any, index: any) => {
        if (item._id === product._id) {
          if (product.quantity > 1) {
            --data[index].quantity;
            localStorage.setItem('cart', JSON.stringify(data));
            this.addedProducts = data;
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.invokeStripe();
    this.localStorageService.getData('jwt_token').subscribe((data) => {
      this.user_data = data;

      if (this.user_data) {
        this.myService.getUserByID(this.user_data.user_id).subscribe({
          next: (data) => {
            this.user_data = data;
            this.user_image = `http://localhost:7005${this.user_data.user_image}`;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  logout() {
    // Send logout request to backend
    this.myService.userLogout({}).subscribe();
    this.localStorageService.removeData('jwt_token');
    this.localStorageService.removeData('cart');
    location.href = '/';
  }
  subscribe(){
    console.log(this.user_data)
    this.myService.subscribeUser(this.user_data).subscribe();
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

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NBO2YI8Mgz307EgfWYcnNfk7ccSrtdKyhJpHtB477RX7Eh32wTZdpbjdJ0CQBasiflrNknBeeRGxMYevmyhbEB200vuQeWDLw',
      locale: 'auto',
      token: (stripeToken: any) => {
        this.subscribe();
        this.reload();
      },
    });
    paymentHandler.open({
      name: 'HomeFlavor',
      description: 'Credit card details',
      amount: amount * 100,
    });
  }
  reload() {
    location.href = '/';
  }
}
