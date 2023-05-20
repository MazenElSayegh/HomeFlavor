import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent {
  storeImg: any;
  constructor(private myService: StoresService, private router: Router) {}
  validationForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(5)]),
    image: new FormControl("", [Validators.required]),
    city : new FormControl("", [Validators.required]),
    about : new FormControl("", [Validators.required, Validators.minLength(20)])
  })

  get isNameValid() {
    return this.validationForm.controls["name"].valid;
  }

  get isImageValid() {
    return this.validationForm.controls["image"].valid;
  }

  get isCityValid() {
    return this.validationForm.controls["city"].valid;
  }

  get isAboutValid() {
    return this.validationForm.controls["about"].valid;
  }

  AddStore(userID: any, name: any, image: any, city: any, about: any) {
    if (this.validationForm.valid) {
    const formData = new FormData();
    formData.append('user_id', userID);
    formData.append('name', name);
    formData.append('image', this.storeImg);
    formData.append('city', city);
    formData.append('about', about);
    // let newStore = {
    //   user_id: userID,
    //   name: name,
    //   image: image,
    //   city: city,
    // };

    this.myService.createStore(formData).subscribe({
      next: (data) => {
        console.log(formData);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.log(err);
      },
    });
    }
  }

  storeImgUpload(event: any) {
    this.storeImg = event.target.files[0];
    console.log(this.storeImg);
  }
}
export function imageExtensionValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
  const file = control.value;

  if (file && !allowedExtensions.test(file.name)) {
    return { 'invalidExtension': true };
  }

  return null;
}
