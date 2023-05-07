import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private serverClient: HttpClient) {}
  private readonly Base_URL = 'http://localhost:7005/api/users';

  addNewUser(newUser: any) {
    return this.serverClient.post(this.Base_URL, newUser);
  }
}
