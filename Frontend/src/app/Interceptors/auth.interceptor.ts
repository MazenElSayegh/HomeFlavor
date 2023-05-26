import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  token: any;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authReq);
    }
    // return next.handle(request);
    else {
      return next.handle(request).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) console.log(event.headers);
          if (
            event instanceof HttpResponse &&
            event.headers.has('X-Auth-Token')
          ) {
            this.token = event.headers.get('X-Auth-Token')?.split(' ')[1];

            localStorage.setItem('jwt_token', this.token);
          }
        })
      );
    }
  }
}
