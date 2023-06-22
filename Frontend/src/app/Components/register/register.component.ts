import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/Services/backend.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
declare const google: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user_image: any;
  // user_name: any;
  email: any;
  password: any;
  gender: any;
  role: any;
  mobile: any;
  address: any;

  is_valid_user_image = true;
  is_user_name_valid = true;
  is_user_email_valid = true;
  is_user_password_valid = true;
  is_user_gender_valid = true;
  is_user_role_valid = true;
  is_user_address_valid = true;
  is_user_mobile_valid = true;
  validatedForm = true;
  clientId =
    '129503736404-5ngv63pcim0njm3pbb5ev32hli36t18b.apps.googleusercontent.com';
  constructor(
    private myService: BackendService,
    public myRouter: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    // google.accounts.id.initialize({
    //   client_id: this.clientId,
    //   callback: this.handleCredentialResponse.bind(this),
    //   auto_select: false,
    //   cancel_on_tap_outside: true,
    // });

    // google.accounts.id.renderButton(document.getElementById('g_id_onload'), {
    //   theme: 'outline',
    //   size: 'large',
    //   width: '600',
    //   locale: 'en',
    //   text: 'continue_with',
    //   logo_alignment: 'center',
    // });

    // @ts-ignore
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById('g_id_onload'),
      {
        theme: 'outline',
        size: 'large',
        width: '600',
        locale: 'en',
        text: 'continue_with',
        logo_alignment: 'center',
        color: '#FF0000',
      }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});
  }

  async handleCredentialResponse(credential: CredentialResponse) {
    console.log(credential);
    // await this.myService.googleLogin(credential).subscribe({
    //   next: (res: any) => {
    //     this.localStorageService.getData('jwt_token').subscribe((data) => {
    //       console.log(data);

    //       if (data.role == 'seller') location.href = '/stores/create';
    //       else location.href = '/';
    //     });

    //     // if(res.body.success){
    //     //   localStorage.setItem("X-Auth-Token",res.headers.get("X-Auth-Token"));
    //     //   this.router.navigateByUrl("/home");
    //     // }
    //     // console.log(res.headers.get("X-Auth-Token"))
    //     console.log('data');
    //   },
    //   error: (err) => {
    //     console.log('errrrrrrrror');
    //   },
    // });
  }

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
    mobile: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern('^[0-9]*$'),
    ]),
    address: new FormControl(null, [Validators.required]), // Adding pattern
  });
  upload(event: any) {
    this.user_image = event.target.files[0];
    console.log(event);
    if (
      !['image/jpeg', 'image/png', 'image/jpg'].includes(this.user_image.type)
    ) {
      this.is_valid_user_image = false;
    } else {
      this.is_valid_user_image = true;
    }
  }

  logout() {
    this.localStorageService.removeData('jwt_token');
  }

  add(user_name: any) {
    const formData = new FormData();

    console.log(this.user_image);

    if (this.validationForm.valid && this.is_valid_user_image) {
      formData.append('user_image', this.user_image);
      formData.append('user_name', user_name);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('gender', this.gender);
      formData.append('role', this.role);
      formData.append('address', this.address);
      formData.append('mobile', this.mobile);

      this.myService.addNewUser(formData).subscribe({
        next: (data) => {
          this.localStorageService.getData('jwt_token').subscribe((data) => {
            console.log(data);

            if (data.role == 'seller') location.href = '/stores/create';
            else location.href = '/';
          });
        },
        error: (err) => {
          this.validatedForm = false;
        },
      });
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
