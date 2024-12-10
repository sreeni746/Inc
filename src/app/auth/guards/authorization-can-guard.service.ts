import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { OidcSecurityService } from '../services/oidc.security.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationCanGuard implements CanLoad {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  canLoad(): boolean {
    return this.oidcSecurityService.moduleSetup;
  }
}
