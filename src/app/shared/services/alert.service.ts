import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private toastrService: ToastrService) {}
  showAlert(response: any) {
    if (response.success) {
      this.success(response.message);
    } else {
      this.error(response.message);
    }
  }
  success(msg: string) {
    this.toastrService.success(msg);
  }
  error(msg: string) {
    this.toastrService.error(msg);
  }
  info(msg: string) {
    this.toastrService.info(msg);
  }
}
