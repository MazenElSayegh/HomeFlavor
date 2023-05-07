import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  UpdateOrderByID(id:any,updatedOrder:any){
    return this.myClient.put(this.Base_URL+"/"+id,updatedOrder);
  }
  // AddNewStudent(newUser:any){
  //   return this.myClient.post(this.Base_URL, newUser);
  // }
}
