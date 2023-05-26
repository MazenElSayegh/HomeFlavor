import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent {
  storeImg: any;
  user_data:any;
  constructor(private myService: StoresService, private router: Router,private LocalStorageService:LocalStorageService) {
    this.LocalStorageService.getData('jwt_token').subscribe((data) => {
      this.user_data = data;
    });
  }
  validationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    image: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    about: new FormControl('', [Validators.required, Validators.minLength(20)]),
  });

  get isNameValid() {
    return this.validationForm.controls['name'].valid;
  }

  get isImageValid() {
    return this.validationForm.controls['image'].valid;
  }

  get isCityValid() {
    return this.validationForm.controls['city'].valid;
  }

  get isAboutValid() {
    return this.validationForm.controls['about'].valid;
  }

  AddStore(name: any, image: any, city: any, about: any) {
    if (this.validationForm.valid) {
      const formData = new FormData();
      formData.append('user_id', this.user_data.user_id);
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
          location.href = '/';
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
export function imageExtensionValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
  const file = control.value;

  if (file && !allowedExtensions.test(file.name)) {
    return { invalidExtension: true };
  }

  return null;
}
