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
    if(this.user_data){
    ordersService.GetAllOrders().subscribe({
      next: (data: any) => {
        this.orders = data;
        this.orders.forEach((order) => {
          this.storeID = order.store_id._id;
          console.log('storeiddd', this.storeID);
          if (order.status == 'Pending') {
            this.count = this.count + 1;
          }
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }}

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
    console.log(this.addedProducts);
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

  // logout() {
  //   this.localStorageService.removeData('jwt_token');
  //   console.log('hi');
  // }
  // this.user_data =



  ngOnInit(): void {
    this.localStorageService.getData('jwt_token').subscribe((data) => {
      console.log(data);
      this.user_data = data;
      // this.user_image = `http://localhost:7005${this.user_data.user_image}`;

      if (this.user_data) {
        this.myService.getUserByID(this.user_data.user_id).subscribe({
          next: (data) => {
            console.log(data);

            this.user_data = data;
            this.user_image = `http://localhost:7005${this.user_data.user_image}`;
            console.log(data);
            console.log(this.user_image);
            // localStorage.setItem('omar', 'hi');

            // const myData = localStorage.getItem('omar');
            // const myData2 = localStorage.getItem('jwt_token');
            // console.log(myData);
            // console.log(myData2);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
    console.log(this.user_data);
  }

  logout() {
    // Send logout request to backend
    this.myService.userLogout({}).subscribe();
    console.log('hi');
    this.localStorageService.removeData('jwt_token');
    this.localStorageService.removeData('cart');
    location.href = '/';
  }
}
