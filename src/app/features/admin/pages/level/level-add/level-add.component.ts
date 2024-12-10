import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LevelService } from '../../../services/level.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-level-add',
  templateUrl: './level-add.component.html',
  styleUrls: ['./level-add.component.css'],
})
export class LevelAddComponent implements OnInit {
  levelForm = this.fb.group({
    id: [0],
    levelName: [null, [Validators.required]],
    levelDesignation: [null, [Validators.required]],
  });
  isUpdating: boolean = false;

  constructor(
    private fb: FormBuilder,
    private levelService: LevelService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.levelForm.markAllAsTouched();
    if (this.levelForm.valid) {
      this.isUpdating = true;
      this.levelService
        .saveLevel(this.levelForm.value)
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
