import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-update-menu-item',
  templateUrl: './update-menu-item.component.html',
  styleUrls: ['./update-menu-item.component.css'],
})
export class UpdateMenuItemComponent {
  menuImage: any;
  id: any;
  itemDetails: any;
  constructor(
    private myService: MenuService,
    private router: Router,
    myRoute: ActivatedRoute
  ) {
    this.id = myRoute.snapshot.params['id'];

    this.myService.getItemByID(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.itemDetails = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateMenuItem(
    storeID: any,
    productImage: any,
    productTitle: any,
    price: any,
    productDetails: any,
    category: any
  ) {
    const formData = new FormData();
    formData.append('store_id', storeID);
    formData.append('product_image', this.menuImage);
    formData.append('product_title', productTitle);
    formData.append('price', price);
    formData.append('product_details', productDetails);
    formData.append('category', category);

    this.myService.updateItemByID(this.id, formData).subscribe({
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
