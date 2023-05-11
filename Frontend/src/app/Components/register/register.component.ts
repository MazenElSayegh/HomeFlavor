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
  constructor(private myService: BackendService, public myRouter: Router) {}

  validationForm = new FormGroup({
    user_name: new FormControl(null, [Validators.required]),
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

  add(
    user_name: any,
    email: any,
    password: any,
    gender: any,
    role: any,
    user_image: any
  ) {
    if (this.validationForm.valid) {
      let user_name = this.validationForm.controls['user_name'].value;
      let email = this.validationForm.controls['email'].value;
      let password = this.validationForm.controls['password'].value;
      let gender = this.validationForm.controls['gender'].value;
      let role = this.validationForm.controls['role'].value;

      let newUser = { user_name, email, password, gender, role, user_image };

      this.myService.addNewUser(newUser).subscribe();

      alert('added successfully');
      location.href='/';
    } else {
      alert('please validate');
    }
  }
}
