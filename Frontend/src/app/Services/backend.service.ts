import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private serverClient: HttpClient) {}
  private readonly Base_URL = 'http://127.0.0.1:7005/api/';

  addNewUser(newUser: any) {
    return this.serverClient.post(this.Base_URL + 'users', newUser);
  }

  userLogin(user: any) {
    console.log(user);

    return this.serverClient.post(this.Base_URL + 'login', user);
  }
}
