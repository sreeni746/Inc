import { TestBed } from '@angular/core/testing';

import { AuthorizationCanGuardService } from './authorization-can-guard.service';

describe('AuthorizationCanGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationCanGuardService = TestBed.get(AuthorizationCanGuardService);
    expect(service).toBeTruthy();
  });
});
