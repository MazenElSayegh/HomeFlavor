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

  public googleLogin(userCredential: any) {
    return this.serverClient.post(
      this.Base_URL + 'users/googleAuth',
      userCredential
    );
  }
  userLogout(user: any) {
    console.log(user);
    return this.serverClient.post(this.Base_URL + 'logout', user);
  }

  getUserByID(id: any) {
    return this.serverClient.get(this.Base_URL + 'users' + '/' + id);
  }
  updateUserByID(id: any, user: any) {
    return this.serverClient.put(this.Base_URL + 'users' + '/' + id, user);
  }

  getAllUsers() {
    return this.serverClient.get(this.Base_URL + 'users');
  }
  subscribeUser(user: any) {
    console.log('hi');
    console.log(user);
    console.log(this.Base_URL + 'users/subscribe');
    return this.serverClient.post(
      this.Base_URL + 'users' + '/' + 'subscribe',
      user
    );
  }
  deleteUser(id: any) {
    return this.serverClient.delete(this.Base_URL + 'users/' + id);
  }
}
