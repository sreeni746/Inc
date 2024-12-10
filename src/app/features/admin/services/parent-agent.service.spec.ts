/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParentAgentService } from './parent-agent.service';

describe('Service: ParentAgent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentAgentService]
    });
  });

  it('should ...', inject([ParentAgentService], (service: ParentAgentService) => {
    expect(service).toBeTruthy();
  }));
});
