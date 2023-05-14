import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/Services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user_image: any;
  user_name: any;
  email: any;
  password: any;
  gender: any;
  role: any;

  constructor(private myService: BackendService, public myRouter: Router) {}

  validationForm = new FormGroup({
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
  });

  get user_nameValid() {
    return this.validationForm.controls['user_name'].valid;
  }
  get emailValid() {
    return this.validationForm.controls['email'].valid;
  }
  get passwordValid() {
    return this.validationForm.controls['password'].valid;
  }
  get genderValid() {
    return this.validationForm.controls['gender'].valid;
  }
  get roleValid() {
    return this.validationForm.controls['role'].valid;
  }

  upload(event: any) {
    this.user_image = event.target.files[0];
    console.log(this.user_image);
  }
  add() {
    // user_image: any
    const formData = new FormData();

    console.log(this.user_image);
    console.log(this.user_name);
    if (this.validationForm.valid) {
      formData.append('user_image', this.user_image);
      formData.append('user_name', this.user_name);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('gender', this.gender);
      formData.append('role', this.role);
      // let user_name = this.validationForm.controls['user_name'].value;

      //   let email = this.validationForm.controls['email'].value;
      //   let password = this.validationForm.controls['password'].value;
      //   let gender = this.validationForm.controls['gender'].value;
      //   let role = this.validationForm.controls['role'].value;

      //   let newUser = { user_name, email, password, gender, role };

      // formData.append('user_name', this.user_name);
      // formData.append('email', this.email);
      // formData.append('password', this.password);
      // formData.append('gender', this.gender);
      // formData.append('role', this.role);
      // console.log(formData);
      this.myService.addNewUser(formData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });

      alert('added successfully');
      location.href = '/';
    } else {
      alert('please validate');
    }
  }
}
