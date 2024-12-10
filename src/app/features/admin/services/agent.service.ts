import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Configuration } from 'src/app/shared/services/configuration.service';
@Injectable()
export class AgentService {
  constructor(private http: HttpClient, private configuration: Configuration) {}

  getAgentList(filter: any) {
    return this.http.post(
      `${this.configuration.ApiAddress}/Incentive/GetAllAgents`,
      filter
    );
  }

  getAgent(id: any) {
    return this.http.get(
      `${this.configuration.ApiAddress}/Incentive/GetAgent/${id}?currentDate=` +
        moment().format(this.configuration.ApiDateFormat)
    );
  }

  syncAgents() {
    return this.http.get(
      `${this.configuration.ApiAddress}/Incentive/SyncAgents`
    );
  }

  updateAgent(data: any) {
    return this.http.put(
      `${this.configuration.ApiAddress}/Incentive/UpdateAgent`,
      data
    );
  }
}
