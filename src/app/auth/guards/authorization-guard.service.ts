import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { Observable, forkJoin } from 'rxjs';
import { map, take, flatMap } from 'rxjs/operators';
import { OidcSecurityService } from '../services/oidc.security.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private oidcSecurityService: OidcSecurityService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.oidcSecurityService.getIsAuthorized().pipe(
      flatMap((isAuthorized: boolean) => {
        console.log(isAuthorized)
        return this.CheckRights(isAuthorized).pipe(
          map((isSuccess: boolean) => {     
            if (isSuccess) {
              return true;
            }          
            else
              this.router.navigate(['/login']);
            return false;
          }));
      }),
      take(1)
    );

  }

  public SetUrl(url: string): void {
    var index = url.lastIndexOf('/');

    if (url.toLowerCase().indexOf('/customer') != -1) {
      let oldCutomerID = this.oidcSecurityService.getRedirectUrl();
      let customerID = url.substring(index + 1);

      if (customerID != null || customerID != '') {
        if (oldCutomerID == null || oldCutomerID == '') {
          this.oidcSecurityService.setRedirectUrl(customerID);
        }
        else if (oldCutomerID != customerID) {
          this.oidcSecurityService.setRedirectUrl(customerID);
        }
      }
    }
  }

  public CheckRights(isAuthorized): Observable<boolean> {
    console.log('check')
    if (!isAuthorized)
      return new Observable(ob => { ob.next(false); });

    let rights = this.oidcSecurityService.getRights();
    if (rights == null) {
      /* return this.kycService.GetRights().pipe(
        map((per: Usercontext) => {
          this.oidcSecurityService.setRights(per);
          return true;
        })); */
        return new Observable(ob => { ob.next(true); });
    }
    else { return new Observable(ob => { ob.next(true); }); }
  }
}
