import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/Services/backend.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  ID: any;
  user: any;
  validationForm: any;
  user_image: any;

  is_valid_user_image = true;
  is_user_name_valid = true;
  is_user_email_valid = true;
  is_user_password_valid = true;
  is_user_gender_valid = true;
  is_user_role_valid = true;
  is_user_address_valid = true;
  is_user_mobile_valid = true;

  validatedForm = true;
  constructor(
    public myService: BackendService,
    public myRoute: ActivatedRoute,
    public router: Router
  ) {
    this.ID = myRoute.snapshot.params['id'];
  }

  // get user_nameValid() {
  //   return this.validationForm.controls['user_name'].valid;
  // }
  // get emailValid() {
  //   return this.validationForm.controls['email'].valid;
  // }
  // get passwordValid() {
  //   return this.validationForm.controls['password'].valid;
  // }
  // get genderValid() {
  //   return this.validationForm.controls['gender'].valid;
  // }
  // get roleValid() {
  //   return this.validationForm.controls['role'].valid;
  // }
  // get addressValid() {
  //   return this.validationForm.controls['address'].valid;
  // }
  // get mobileValid() {
  //   return this.validationForm.controls['mobile'].valid;
  // }

  upload(event: any) {
    this.user_image = event.target.files[0];
    console.log(this.user_image);
    if (
      !['image/jpeg', 'image/png', 'image/jpg'].includes(this.user_image.type)
    ) {
      this.is_valid_user_image = false;
      //      'Invalid file type. Only JPEG and PNG images are allowed.'
    } else {
      this.is_valid_user_image = true;
    }
  }
  ngOnInit(): void {
    this.myService.getUserByID(this.ID).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);

        this.validationForm = new FormGroup({
          user_name: new FormControl(null, [
            Validators.required,
            Validators.minLength(3),
          ]),
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, [
            Validators.required,
            Validators.minLength(8),
          ]),
          gender: new FormControl(null, [Validators.required]),
          role: new FormControl(null, [Validators.required]),
          mobile: new FormControl(null, [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            Validators.pattern('^[0-9]*$'),
          ]),
          address: new FormControl(null, [Validators.required]),
        });
        this.validationForm.patchValue(this.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  update(
    user_name: any,
    email: any,
    password: any,
    gender: any,
    role: any,
    address: any,
    mobile: any
  ) {
    const formData = new FormData();

    // console.log(this.user_image);
    // console.log(user_name);
    if (this.validationForm.valid && this.is_valid_user_image) {
      formData.append('user_image', this.user_image);
      formData.append('user_name', user_name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('gender', gender);
      formData.append('role', role);
      formData.append('address', address);
      formData.append('mobile', mobile);

      this.myService.updateUserByID(this.ID, formData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });

      // this.router.navigateByUrl('/');
      location.href = '/';
    } else {
      this.is_user_name_valid = this.validationForm.controls['user_name'].valid;
      this.is_user_email_valid = this.validationForm.controls['email'].valid;
      this.is_user_password_valid =
        this.validationForm.controls['password'].valid;
      this.is_user_gender_valid = this.validationForm.controls['gender'].valid;
      this.is_user_role_valid = this.validationForm.controls['role'].valid;
      this.is_user_address_valid =
        this.validationForm.controls['address'].valid;
      this.is_user_mobile_valid = this.validationForm.controls['mobile'].valid;
      this.validatedForm = false;
    }
  }
}
