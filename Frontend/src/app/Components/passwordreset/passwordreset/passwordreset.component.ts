import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgetPasswordService } from 'src/app/Services/forgetpassword.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent {
  newPassword: any;
  confirmPassword: any;
  resetToken: any;
  isPasswordMatching = true;

  constructor(
    private resetPasswordService: ForgetPasswordService,
    private router: Router
  ) {}

  resetPassword() {
    this.resetPasswordService.resetPassword(this.resetToken, this.newPassword).subscribe(
      response => {
        console.log(response);
        // Handle successful response
        this.router.navigate(['/login']);
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      
      this.isPasswordMatching= false;
      return;
    }

    this.resetPassword();
  }
}
