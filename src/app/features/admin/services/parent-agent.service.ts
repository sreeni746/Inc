import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Configuration } from 'src/app/shared/services/configuration.service';

@Injectable()
export class ParentAgentService {
  constructor(private http: HttpClient, private configuration: Configuration) {}

  getAllHigherLevelAgents(id:any) {
    return this.http.get(
      `${this.configuration.ApiAddress}/Incentive/GetAllHigherLevelAgents/${id}?currentDate=` + moment().format(this.configuration.ApiDateFormat)
    );
  }
}
