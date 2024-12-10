import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OidcSecurityService } from '../../auth/services/oidc.security.service';
import { Configuration } from '../services/configuration.service';



@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private  oidcSecurityService: OidcSecurityService, 
    private configuration: Configuration) { }
  intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

    if (this.configuration.ApiAddress &&
       request.url.indexOf(this.configuration.ApiAddress) > -1) {
      let tokenInfo = this.oidcSecurityService.getToken();
        
      if (tokenInfo) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${tokenInfo}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          });
      }
       
    }
      return newRequest.handle(request);
  }
}
