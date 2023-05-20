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

  get emailValid() {
    return this.validationForm.controls['email'].valid;
  }
  get passwordValid() {
    return this.validationForm.controls['password'].valid;
  }

  async add(email: any, password: any) {
    if (this.validationForm.valid) {
      let email = this.validationForm.controls['email'].value;
      let password = this.validationForm.controls['password'].value;

      let user = { email, password };

      this.myService.userLogin(user).subscribe((res) => {
        console.log(res);
        this.localStorageService.getData('jwt_token').subscribe((data) => {
          console.log(data);
          // this.myRouter.navigateByUrl('/profile/' + data.user_id);
          location.href = '/profile/' + data.user_id;
        });
      });
    } else {
      this.validatedForm = false;
    }
  }
}
