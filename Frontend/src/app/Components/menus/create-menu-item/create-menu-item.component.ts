import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-create-menu-item',
  templateUrl: './create-menu-item.component.html',
  styleUrls: ['./create-menu-item.component.css']
})
export class CreateMenuItemComponent {
   menuImage:any;
  constructor(private myService: MenuService, private router: Router) {}

  addMenuItem(storeID: any, productImage: any, productTitle: any, price: any,productDetails: any,category:any) {
    const formData = new FormData();
    formData.append('store_id', storeID);
    formData.append('product_image',this.menuImage);
    formData.append('product_title', productTitle);
    formData.append('price', price);
    formData.append('product_details',productDetails);
    formData.append('category',category);
    this.myService.CreateMenuItem(formData).subscribe({
      next: (data) => {
        console.log(formData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  menuImageUpload(event: any) {
    this.menuImage = event.target.files[0];
    console.log(this.menuImage);
  }

 

}
