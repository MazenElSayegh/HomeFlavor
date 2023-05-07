import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private myClient:HttpClient) { }
  private Base_URL = "http://localhost:7005/api/orders";

  public user:any;
  GetAllOrders(){
    return this.myClient.get(this.Base_URL);
  }
  // GetUserByID(id:any){
  //   return this.myClient.get(this.Base_URL+"/"+id);
  // }
  // AddNewStudent(newUser:any){
  //   return this.myClient.post(this.Base_URL, newUser);
  // }
}
