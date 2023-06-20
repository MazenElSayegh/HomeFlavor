import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  constructor(private http: HttpClient) {}
  private readonly Base_URL = 'https://homeflavor-backend.onrender.com/api/forgetpassword';

  sendOTP(email: string) {
    return this.http.post(`${this.Base_URL}/send-otp`, { email });
  }
  verifyOTP(otp: string) {
    return this.http.post<{ resetToken: string }>(`${this.Base_URL}/verify-otp`, { otp });
  }
  resetPassword(resetToken: string, newPassword: string) {
    return this.http.post(`${this.Base_URL}/reset-password`, { resetToken, newPassword });
  }
}
