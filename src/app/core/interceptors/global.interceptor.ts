import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const baseUrl = 'https://upskilling-egypt.com:3005/api';
    const accessToken = localStorage.getItem( 'userToken' ) ?? '';
    const newRequest = request.clone({
      url: request.url.includes('assets')
        ? request.url
        : baseUrl + '/' + request.url,
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
    });

    return next.handle(newRequest);
  }
}
