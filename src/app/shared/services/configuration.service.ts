import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Configuration {

  constructor() { }
  public ApiAddress = '';
  public OrganizationName = '';
  public OrganizationCode = '';
  public ApiDateFormat="yyyy-MM-DD"
}
