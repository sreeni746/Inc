import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/shared/services/configuration.service';

@Injectable()
export class AgentHeirarchyService {
  constructor(private http: HttpClient, private configuration: Configuration) {}

  getTopHeirarchy(id: any,asOfDate:any) {
    return this.http.get(
      `${this.configuration.ApiAddress}/Incentive/GetAgentHierarchyTopToBottom/${id}?asOfDate=${asOfDate}`
    );
  }
  getBottomHeirarchy(id: any,asOfDate:any) {
    return this.http.get(
      `${this.configuration.ApiAddress}/Incentive/GetAgentHierarchyBottomToTop/${id}?asOfDate=${asOfDate}`
    );
  }
}
