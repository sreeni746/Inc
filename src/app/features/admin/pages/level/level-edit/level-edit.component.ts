import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LevelService } from '../../../services/level.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-level-edit',
  templateUrl: './level-edit.component.html',
  styleUrls: ['./level-edit.component.css'],
})
export class LevelEditComponent implements OnInit {
  levelForm = this.fb.group({
    id: [],
    levelName: [null, [Validators.required]],
    levelDesignation: ['', [Validators.required]],
  });
  isUpdating: boolean = false;
  isDataLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private levelService: LevelService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isDataLoading = true;
    this.levelService
      .getLevel(this.route.snapshot.queryParamMap.get('id'))
      .pipe(
        finalize(() => (this.isDataLoading = false)) // Execute when the observable completes
      )
      .subscribe((res: any) => {
        this.levelForm.patchValue(res?.data, { emitEvent: false });
      });
  }

  onSubmit() {
    this.levelForm.markAllAsTouched();
    if (this.levelForm.valid) {
      this.isUpdating = true;
      this.levelService
        .updateLevel(this.levelForm.value)
        .pipe(
          finalize(() => (this.isUpdating = false)) // Execute when the observable completes
        )
        .subscribe((res: any) => {
          if (res?.isSuccess) {
            this.alertService.showAlert({
              success: res?.isSuccess,
              message: res?.message,
            });
            this.router.navigate(['/admin/level']);
          } else {
            this.alertService.showAlert({
              success: res?.isSuccess,
              message: res?.message,
            });
          }
        });
    }
  }
}
