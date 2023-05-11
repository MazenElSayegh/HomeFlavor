import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-create-menu-item',
  templateUrl: './create-menu-item.component.html',
  styleUrls: ['./create-menu-item.component.css']
})
export class CreateMenuItemComponent {
  constructor(private myService: MenuService, private router: Router) {}

  addMenuItem(storeID: any, productImage: any, productTitle: any, price: any,productDetails: any) {
    let newMenuItem = {
      store_id: storeID,
      product_image: productImage,
      product_title: productTitle,
      price: +price,
      product_details:productDetails
    };

    this.myService.CreateMenuItem(newMenuItem).subscribe({
      next: (data) => {
        console.log(newMenuItem);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }



}
