import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LevelService } from '../../../services/level.service';
import { AgentService } from '../../../services/agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentAgentService } from '../../../services/parent-agent.service';
import { AlertService } from '../../../../../shared/services/alert.service';
import { pipe } from 'rxjs/internal/util/pipe';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.css'],
})
export class AgentEditComponent implements OnInit {
  levelList: any;
  agentForm = this.fb.group({
    id: [],
    agentId: [],
    agentName: [''],
    agentCode: [''],
    levelId: [null, [Validators.required]],
    tdsApplicableFlag: [false],
    isSalaried: ['', [Validators.required]],
    agentIndividualTarget: [''],
    basicPay: [null],
    salary: [null],
    parentAgentId: [null],
    collectionIncentiveRate: ['', [Validators.required]],
    uniqueAcctNo: ['', [Validators.required]],
    schemeCode: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
  });
  formData: any;
  isSalaried: any = null;
  parentAgentList: any;
  isDataLoading: boolean = false;
  isUpdating: boolean = false;
  constructor(
    private fb: FormBuilder,
    private levelService: LevelService,
    private agentService: AgentService,
    private route: ActivatedRoute,
    private parentAgentService: ParentAgentService,
    private alertService: AlertService,
    private router: Router
  ) {}

  onSubmit() {
    this.agentForm.markAllAsTouched();
    let formData = this.agentForm.getRawValue();
    formData.tdsApplicableFlag =
      formData.tdsApplicableFlag == null ? false : formData.tdsApplicableFlag;
    if (this.agentForm.valid) {
      if (formData.isSalaried) {
        formData.parentAgentId = null;
      } else {
        formData.agentIndividualTarget = null;
        formData.basicPay = null;
        formData.salary = null;
      }
      this.isUpdating = true;

      this.agentService
        .updateAgent(formData)
        .pipe(
          finalize(() => (this.isUpdating = false)) // Execute when the observable completes
        )
        .subscribe((res: any) => {
          this.isUpdating = false;
          if (res?.isSuccess) {
            this.alertService.showAlert({
              success: res?.isSuccess,
              message: res?.message,
            });
            this.router.navigate(['/admin/agents']);
          } else {
            this.alertService.showAlert({
              success: res?.isSuccess,
              message: res?.message,
            });
          }
        });
    }
  }
  ngOnInit() {
    this.isDataLoading = true;
    this.agentForm.get('isSalaried').valueChanges.subscribe((selectedValue) => {
      this.salariedValidation(selectedValue);
    });
    this.agentForm.get('levelId').valueChanges.subscribe((selectedValue) => {
      this.parentAgentService
        .getAllHigherLevelAgents(selectedValue)
        .subscribe((value: any) => {
          this.parentAgentList = value?.data;
        });
    });
    this.levelService.getAllLevel().subscribe((res: any) => {
      this.levelList = res?.data;
    });
    this.agentService
      .getAgent(this.route.snapshot.queryParamMap.get('id'))
      .pipe(
        finalize(() => (this.isDataLoading = false)) // Execute when the observable completes
      )
      .subscribe((res: any) => {
        this.agentForm.patchValue(res?.data, { emitEvent: false });
        this.isSalaried = res?.data.isSalaried;
        this.formData = res?.data;
        this.isDataLoading = false;
        if (res?.data.levelId != null) {
          this.parentAgentService
            .getAllHigherLevelAgents(res?.data.levelId)
            .subscribe((res: any) => {
              this.parentAgentList = res?.data;
            });
        }
      });
  }

  salariedValidation(selectedValue) {
    if (selectedValue == true) {
      this.isSalaried = true;
      this.agentForm.controls.agentIndividualTarget.setValidators([
        Validators.required,
      ]);
      this.agentForm.controls.salary.setValidators([Validators.required]);
      this.agentForm.controls.basicPay.setValidators([Validators.required]);
      /*   this.agentForm.controls.parentAgentId.removeValidators([
        Validators.required,
      ]); */
      this.agentForm.controls.agentIndividualTarget.updateValueAndValidity({
        emitEvent: false,
      });
      this.agentForm.controls.basicPay.updateValueAndValidity({
        emitEvent: false,
      });
      this.agentForm.controls.salary.updateValueAndValidity({
        emitEvent: false,
      });
      this.agentForm.controls.parentAgentId.updateValueAndValidity({
        emitEvent: false,
      });
    } else if (selectedValue === false) {
      console.log(this.isSalaried);
      this.isSalaried = false;
      this.agentForm.controls.agentIndividualTarget.removeValidators([
        Validators.required,
      ]);
      this.agentForm.controls.salary.removeValidators([Validators.required]);
      this.agentForm.controls.basicPay.removeValidators([Validators.required]);
      /*   this.agentForm.controls.parentAgentId.setValidators([
        Validators.required,
      ]); */
      this.agentForm.controls.agentIndividualTarget.updateValueAndValidity({
        emitEvent: false,
      });
      this.agentForm.controls.basicPay.updateValueAndValidity({
        emitEvent: false,
      });
      this.agentForm.controls.salary.updateValueAndValidity({
        emitEvent: false,
      });
    }
  }
}
