import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';
import { StoresService } from 'src/app/Services/stores.service';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-create-menu-item',
  templateUrl: './create-menu-item.component.html',
  styleUrls: ['./create-menu-item.component.css'],
})
export class CreateMenuItemComponent {
  menuImage: any;
  storeIDReceived: any;
  constructor(private myService: MenuService, private router: Router) {
    const previousNavigation =
      this.router.getCurrentNavigation()?.previousNavigation;

    const storeID =
      previousNavigation?.finalUrl?.root.children['primary'].segments[1].path;

    this.storeIDReceived = storeID;
  }
  validationForm = new FormGroup({
    productTitle: new FormControl("", [Validators.required, Validators.minLength(5)]),
    productImage: new FormControl("", [Validators.required]),
    price : new FormControl("", [Validators.required]),
    productDetails : new FormControl("", [Validators.required, Validators.minLength(20)]),
    category : new FormControl("", [Validators.required])
  })

  get isProductTitleValid() {
    return this.validationForm.controls["productTitle"].valid;
  }

  get isProductImageValid() {
    return this.validationForm.controls["productImage"].valid;
  }

  get isPriceValid() {
    return this.validationForm.controls["price"].valid;
  }

  get isProductDetailsValid() {
    return this.validationForm.controls["productDetails"].valid;
  }

  get isCategoryValid() {
    return this.validationForm.controls["category"].valid;
  }

  addMenuItem(
    storeID: any,
    productImage: any,
    productTitle: any,
    price: any,
    productDetails: any,
    category: any
  ) {
    if (this.validationForm.valid){
    const formData = new FormData();
    formData.append('store_id', storeID);
    formData.append('product_image', this.menuImage);
    formData.append('product_title', productTitle);
    formData.append('price', price);
    formData.append('product_details', productDetails);
    formData.append('category', category);
    this.myService.CreateMenuItem(formData).subscribe({
      next: (data) => {
        console.log(formData);
        this.router.navigateByUrl(`/stores/${this.storeIDReceived}`);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
  menuImageUpload(event: any) {
    this.menuImage = event.target.files[0];
    console.log(this.menuImage);
  }
}
