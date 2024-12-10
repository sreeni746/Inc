import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { OidcSecurityService } from 'src/app/auth/services/oidc.security.service';
import { OidcSecurityUserService } from 'src/app/auth/services/oidc.security.user-service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  @Input() sidebarId: string = 'sidebar';

  userdata;

  constructor(
    private classToggler: ClassToggleService,
    private oidcSecurityService: OidcSecurityService,
    private oidcSecurityUserService: OidcSecurityUserService
  ) {
    super();
  }
  ngOnInit() {
    //console.log(this.oidcSecurityUserService.getUserData())
    this.oidcSecurityService.getUserData().subscribe((value) => {
      this.userdata=value;
      console.log(this.userdata)
    });
  }
  logout() {
    this.oidcSecurityService.logoff();
  }
}
