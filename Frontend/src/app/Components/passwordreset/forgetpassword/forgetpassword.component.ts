import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ForgetPasswordService } from 'src/app/Services/forgetpassword.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {

  email: any;
  constructor(private forgetPasswordService: ForgetPasswordService, public myRouter: Router) {}

  onSubmit(email:any) {
    console.log("this is the sent email",email);

    this.forgetPasswordService.sendOTP(email).subscribe(

      response => {
        console.log(response);
        // Handle successful response and navigate to reset password page
        this.myRouter.navigate(['/otp']);


      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }
}
