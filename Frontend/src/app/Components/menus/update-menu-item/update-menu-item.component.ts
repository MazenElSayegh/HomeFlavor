import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-update-menu-item',
  templateUrl: './update-menu-item.component.html',
  styleUrls: ['./update-menu-item.component.css'],
})
export class UpdateMenuItemComponent {
  validationForm: any;
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
      next: (data: any) => {
        console.log(data);
        this.itemDetails = data;
        this.validationForm = new FormGroup({
          product_title: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
          ]),
          product_image: new FormControl('', [Validators.required]),
          price: new FormControl('', [Validators.required]),
          product_details: new FormControl('', [
            Validators.required,
            Validators.minLength(20),
          ]),
          category: new FormControl('', [Validators.required]),
        });
        this.validationForm.patchValue(data[0]);
        console.log(data[0]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //  this.validationForm = new FormGroup({
  //   productTitle: new FormControl("", [Validators.required, Validators.minLength(5)]),
  //   productImage: new FormControl("", [Validators.required]),
  //   price : new FormControl("", [Validators.required]),
  //   productDetails : new FormControl("", [Validators.required, Validators.minLength(20)]),
  //   category : new FormControl("", [Validators.required])
  // })

  get isProductTitleValid() {
    return this.validationForm.controls['product_title'].valid;
  }

  get isProductImageValid() {
    return this.validationForm.controls['product_image'].valid;
  }

  get isPriceValid() {
    return this.validationForm.controls['price'].valid;
  }

  get isProductDetailsValid() {
    return this.validationForm.controls['product_details'].valid;
  }

  get isCategoryValid() {
    return this.validationForm.controls['category'].valid;
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
        location.href = `/stores/${storeID}`;
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
