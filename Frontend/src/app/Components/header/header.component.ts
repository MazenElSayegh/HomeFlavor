import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() addedProducts: any;
  localhost="http://localhost:7005";

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
}
