import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Configuration } from 'src/app/shared/services/configuration.service';

@Injectable()
export class LevelService {
  constructor(private http: HttpClient, private configuration: Configuration) {}

  getAllLevel(isFilter=false) {
    return this.http.get(
      `${this.configuration.ApiAddress}/Incentive/GetAllLevels?currentDate=` +
        moment().format(this.configuration.ApiDateFormat)+`&isFilter=`+isFilter
    );
  }
  getAllLevelsPaginated(filter: any) {
    return this.http.post(
      `${this.configuration.ApiAddress}/Incentive/GetAllLevelsPaginated`,
      filter
    );
  }
  getLevel(id: any) {
    return this.http.get(
      `${this.configuration.ApiAddress}/Incentive/GetLevelMasterById/` + id
    );
  }
  updateLevel(data: any) {
    return this.http.put(
      `${this.configuration.ApiAddress}/Incentive/UpdateLevel`,
      data
    );
  }
  saveLevel(data: any) {
    return this.http.post(
      `${this.configuration.ApiAddress}/Incentive/CreateLevel`,
      data
    );
  }
}
