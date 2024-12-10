import { Component } from '@angular/core';
import { OidcSecurityService } from '../../services/oidc.security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public oidcSecurityService: OidcSecurityService) {}
  login() {
    let culture = 'en-US';


    this.oidcSecurityService.setCustomRequestParameters({
      ui_locales: culture,
    });
    this.oidcSecurityService.authorize();
  }
}
