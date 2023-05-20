import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoresService } from 'src/app/Services/stores.service';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-update-store',
  templateUrl: './update-store.component.html',
  styleUrls: ['./update-store.component.css'],
})
export class UpdateStoreComponent {
  id: any;
  storeImg: any;
  store: any;
  constructor(
    private myService: StoresService,
    private router: Router,
    myRoute: ActivatedRoute
  ) {
    this.id = myRoute.snapshot.params['id'];

    this.myService.getStoreByID(this.id).subscribe({
      next: (data: any) => {
        this.store = data;
        console.log(this.store);
        this.validationForm.patchValue(this.store);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
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

  updateStore(userID: any, name: any, image: any, city: any, about: any) {
    if (this.validationForm.valid) {
    const formData = new FormData();
    formData.append('user_id', userID);
    formData.append('name', name);
    formData.append('image', this.storeImg);
    formData.append('city', city);
    formData.append('about', about);

    this.myService.updateStoreByID(this.id, formData).subscribe({
      next: (data) => {
        console.log(formData);
        this.router.navigateByUrl('/stores');
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


// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { StoresService } from 'src/app/Services/stores.service';
// import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';

// @Component({
//   selector: 'app-update-store',
//   templateUrl: './update-store.component.html',
//   styleUrls: ['./update-store.component.css'],
// })
// export class UpdateStoreComponent {
//   id: any;
//   storeImg: any;
//   store: any;

//   is_valid_image = true;
//   is_name_valid = true;
//   is_city_valid = true;
//   is_about_valid = true;


//   validatedForm = true;

//   constructor(
//     private myService: StoresService,
//     private router: Router,
//     myRoute: ActivatedRoute
//   ) {
//     this.id = myRoute.snapshot.params['id'];

//     this.myService.getStoreByID(this.id).subscribe({
//       next: (data: any) => {
//         this.store = data;
//         console.log(this.store);
//       },
//       error: (err: any) => {
//         console.log(err);
//       },
//     });
//   }
//   // validationForm = new FormGroup({
//   //   name: new FormControl("", [Validators.required, Validators.minLength(5)]),
//   //   image: new FormControl("", [Validators.required]),
//   //   city : new FormControl("", [Validators.required]),
//   //   about : new FormControl("", [Validators.required, Validators.minLength(20)])
//   // })

//   // get isNameValid() {
//   //   return this.validationForm.controls["name"].valid;
//   // }

//   // get isImageValid() {
//   //   return this.validationForm.controls["image"].valid;
//   // }

//   // get isCityValid() {
//   //   return this.validationForm.controls["city"].valid;
//   // }

//   // get isAboutValid() {
//   //   return this.validationForm.controls["about"].valid;
//   // }

//   updateStore(userID: any, name: any, image: any, city: any, about: any) {
//     if (this.validationForm.valid) {
//     const formData = new FormData();
//     formData.append('user_id', userID);
//     formData.append('name', name);
//     formData.append('image', this.storeImg);
//     formData.append('city', city);
//     formData.append('about', about);

//     this.myService.updateStoreByID(this.id, formData).subscribe({
//       next: (data) => {
//         console.log(formData);
//         this.router.navigateByUrl('/stores');
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }
//   }

//   storeImgUpload(event: any) {
//     this.storeImg = event.target.files[0];
//     console.log(this.storeImg);
//   }
// }