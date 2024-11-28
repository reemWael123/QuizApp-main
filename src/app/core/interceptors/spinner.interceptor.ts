import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.show(undefined, {
      type: 'ball-clip-rotate-pulse',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      size: 'default',
    });

    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.hide(); // Hide loader
      })
    );
  }
}
