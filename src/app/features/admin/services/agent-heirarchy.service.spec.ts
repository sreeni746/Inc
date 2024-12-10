/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AgentHeirarchyService } from './agent-heirarchy.service';

describe('Service: AgentHeirarchy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentHeirarchyService]
    });
  });

  it('should ...', inject([AgentHeirarchyService], (service: AgentHeirarchyService) => {
    expect(service).toBeTruthy();
  }));
});
