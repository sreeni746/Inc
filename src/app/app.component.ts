import { LoaderService } from './shared/services/loader.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { OidcSecurityService } from './auth/services/oidc.security.service';
import { Subscription } from 'rxjs';
import { AuthorizationResult } from './auth/models/authorization-result';
import { AuthorizationState } from './auth/models/authorization-state.enum';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>
    <app-loader></app-loader> `,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Incentive';
  isUserInfoLoaded = false;
  isAuthorizedSubscription: Subscription | undefined;
  isAuthorized = false;

  onChecksessionChanged: Subscription | undefined;
  checksession = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    public oidcSecurityService: OidcSecurityService,
    private loaderService: LoaderService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.doCallbackLogicIfRequired();
      });
    }

    this.oidcSecurityService.onCheckSessionChanged.subscribe(
      (checksession: boolean) => {
        this.checksession = checksession;
      }
    );

    this.oidcSecurityService.onAuthorizationResult.subscribe(
      (authorizationResult: AuthorizationResult) => {
        this.onAuthorizationResultComplete(authorizationResult);
      }
    );
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        //this.loaderService.show();
        return;
      }
    });
  }

  private doCallbackLogicIfRequired() {
    this.oidcSecurityService.authorizedCallbackWithCode(
      window.location.toString()
    );
  }

  private onAuthorizationResultComplete(
    authorizationResult: AuthorizationResult
  ) {
    if (
      authorizationResult.authorizationState === AuthorizationState.unauthorized
    ) {
      if (window.parent) {
        // sent from the child iframe, for example the silent renew
        this.router.navigate(['/login']);
      } else {
        window.location.href = '/login';
      }
    }
  }

  ngOnDestroy(): void {
    if (this.isAuthorizedSubscription) {
      this.isAuthorizedSubscription.unsubscribe();
    }
  }
}
