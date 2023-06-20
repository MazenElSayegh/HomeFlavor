import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  constructor(private myClient: HttpClient) {}
  private Base_URL = 'https://homeflavor-backend.onrender.com/api/stores';

  public user: any;
  getAllStores() {
    return this.myClient.get(this.Base_URL);
  }

  getStoreByID(id: any) {
    return this.myClient.get(`${this.Base_URL}/${id}`);
  }

  createStore(newStore: any) {
    return this.myClient.post(`${this.Base_URL}/create`, newStore);
  }

  updateStoreByID(id: any, newStore: any) {
    return this.myClient.put(`${this.Base_URL}/${id}`, newStore);
  }

  deleteStoreByID(id: any) {
    return this.myClient.delete(`${this.Base_URL}/${id}`);
  }
}
