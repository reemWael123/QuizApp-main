import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((httpError: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';
        if (httpError.error?.message) {
          errorMessage = Array.isArray(httpError.error.message)
            ? httpError.error.message[0]
            : httpError.error.message;
        }

        this.toastr.error(errorMessage, 'Error');

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
