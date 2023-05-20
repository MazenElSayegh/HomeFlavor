import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string): Observable<any> {
    let data = localStorage.getItem(key);
    if (data) {
      const payload = jwt_decode(data);
      // console.log('JWT payload:', payload);
      return of(payload);
    } else {
      return of(null);
    }
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }
  clearStorage(): void {
    localStorage.clear();
  }
}
