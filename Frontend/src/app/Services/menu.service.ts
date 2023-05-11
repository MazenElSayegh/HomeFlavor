import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private myClient: HttpClient) { }

  private Base_URL = 'http://localhost:7005/api/menu';

  getAllMenu(id:any) {
    return this.myClient.get(`${this.Base_URL}/${id}`);
  }

  CreateMenuItem(newItem: any) {
    return this.myClient.post(`${this.Base_URL}/create`, newItem);
  }

  updateItemByID(id: any, newItem: any) {
    return this.myClient.put(`${this.Base_URL}/${id}`, newItem);
  }

  deleteMenuItemByID(id: any) {
    return this.myClient.delete(`${this.Base_URL}/${id}`);
  }
}
