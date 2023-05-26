import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/Services/backend.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  validatedForm = true;
  is_user_email_valid = true;
  is_user_password_valid = true;
  constructor(
    private myService: BackendService,
    public myRouter: Router,
    private localStorageService: LocalStorageService
  ) {}

  validationForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  async add(email: any, password: any) {
    if (this.validationForm.valid) {
      let email = this.validationForm.controls['email'].value;
      let password = this.validationForm.controls['password'].value;

      let user = { email, password };

      this.myService.userLogin(user).subscribe(
        (data) => {
          console.log(data);
          this.localStorageService.getData('jwt_token').subscribe((data) => {
            console.log(data);

            location.href = '/home';
          });
        },
        (error) => {
          this.validatedForm = false;
        }
      );
    } else {
      this.is_user_email_valid = this.validationForm.controls['email'].valid;
      this.is_user_password_valid =
        this.validationForm.controls['password'].valid;
      this.validatedForm = false;
    }
  }
}
