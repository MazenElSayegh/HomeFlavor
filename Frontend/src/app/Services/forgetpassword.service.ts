import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private readonly Base_URL = 'http://127.0.0.1:7005/api/forgetpassword';
  private email = '';
  private resetToken = '';



  private emailSubject = new BehaviorSubject<string>('');
  email$ = this.emailSubject.asObservable();

  constructor(private http: HttpClient,public myRouter: Router) {}

  sendOTP(email: string) {
    this.email = email;
    this.emailSubject.next(email);
    return this.http.post(`${this.Base_URL}/send-otp`, { email });
  }

  verifyOTP(otp: string) {

    return this.http.post<{ resetToken: string }>(`${this.Base_URL}/verify-otp`, { otp, email: this.email }).subscribe(
      response => {
        console.log(response);
        this.resetToken = response.resetToken;
        console.log('resetToken set to:', this.resetToken);
        if(this.resetToken){
          this.myRouter.navigate(['/resetpassword']);        }
        // Handle successful response
      },
      error => {
        console.error(error);
        // Handle error
      }
    );;
  }

  resetPassword(newPassword: string) {
    return this.http.post(`${this.Base_URL}/reset-password`, { resetToken: this.resetToken, newPassword });
  }
}
