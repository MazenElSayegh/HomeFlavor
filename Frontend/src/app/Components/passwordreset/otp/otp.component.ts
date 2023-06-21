import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgetPasswordService } from 'src/app/Services/forgetpassword.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otp: string= '';
  resetToken: string = '';

  constructor(private forgetPasswordService: ForgetPasswordService, public myRouter: Router) {}

  onSubmit(otp:any ,) {
    this.forgetPasswordService.verifyOTP(otp)
  }
}
