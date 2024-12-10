import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';


  /**
   * Adds a default error handler to all requests.
   */
  @Injectable({
    providedIn: 'root'
  })
  export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private router: Router, private alertService: AlertService,) {}
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next
        .handle(request)
        .pipe(catchError(error => this.errorHandler(error)));
    }

    // Customize the default error handler here if needed
    private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
console.log(response['status'])
       // Do something with the error
       switch (response['status']) {
        case HttpError.Unauthorized: {
          this.router.navigate(['/login'], { replaceUrl: true });
          break;
        }
        case HttpError.NotFound: {
          //this.router.navigate(['/404'], { replaceUrl: true });
          break;
        }
        case HttpError.InternalServerError: {
          this.alertService.showAlert({
            success: false,
            message: 'Internal server error',
          });
          //this.router.navigate(['/500'], { replaceUrl: true });
          break;
        }
      }
      throw response;
    }
  }
  export class HttpError {
    static Unauthorized = 401;
    static NotFound = 404;
    static InternalServerError = 500;
  }
