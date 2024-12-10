import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentService } from '../../../services/agent.service';
import { LevelService } from '../../../services/level.service';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Configuration } from '../../../../../shared/services/configuration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss'],
})
export class AgentListComponent implements OnInit {
  constructor(
    private agentService: AgentService,
    private levelService: LevelService,
    private configuration: Configuration,
    private alertService: AlertService,
    private router: Router
  ) {}
  levelList: any;
  @ViewChild('agentList')
  dataGrid!: DxDataGridComponent;
  customDataSource: CustomStore = new CustomStore();
  isSyncing: boolean = false;
  currentDate=moment().format(this.configuration.ApiDateFormat);

  filterForm = new FormGroup({
    levelId: new FormControl(null),
    parentLevelId: new FormControl(null),
    searchText: new FormControl(''),
    asOfDate:new FormControl(this.currentDate)
  });

  ngOnInit(): void {
    this.levelService.getAllLevel(true).subscribe((value: any) => {
      this.levelList = value.data;
    });
    this.getAllReportedIncidents();
  }

  filter() {
    this.dataGrid.instance.pageIndex(0);
    this.dataGrid.instance.refresh();
  }

isEditable(e) {
  return !e.row.data.isEditable;
}
  
  topTreee=(e: any) => {
    this.router.navigate(['/admin/agent-hierarchy-top'], {
      queryParams: { id: e.row.data.agentId,asOfDate:this.filterForm.get('asOfDate')?.value },
    });
  };

  bottomTreee=(e: any) => {
    this.router.navigate(['/admin/agent-hierarchy-bottom'], {
      queryParams: { id: e.row.data.agentId, asOfDate:this.filterForm.get('asOfDate')?.value },
    });
  };
  stopWriting(e:any)
  {
      e.event.preventDefault();
      e.event.stopPropagation();
  }
  syncAgents() {
    this.isSyncing = true;
    this.agentService
      .syncAgents()
      .pipe(
        finalize(() => (this.isSyncing = false)) // Execute when the observable completes
      )
      .subscribe((res: any) => {
        if (res.isSuccess) {
          this.getAllReportedIncidents();
          this.alertService.showAlert({
            success: res?.isSuccess,
            message: res?.message,
          });
        } else {
          this.alertService.showAlert({
            success: res?.isSuccess,
            message: res?.message,
          });
        }
      });
  }

  edit = (e: any) => {
    this.router.navigate(['/admin/agents-edit'], {
      queryParams: { id: e.row.data.agentId },
    });
  };
  getAllReportedIncidents() {
    this.customDataSource = new CustomStore({
      key: 'id',
      load: (loadOptions: any) => {
        let payload = {
          pageNo: loadOptions.skip / loadOptions.take + 1,
          pageSize: loadOptions.take,
          currentDate: this.filterForm.get('asOfDate')?.value,
          levelId:
            this.filterForm.get('levelId')?.value == null
              ? null
              : this.filterForm.get('levelId')?.value,
          parentLevelId: null,
          searchText: this.filterForm.get('searchText')?.value,
        };

        return this.agentService
          .getAgentList(payload)
          .toPromise()
          .then((v: any) => {
            return {
              data: v?.data?.items,
              totalCount: v?.data?.total,
            };
          });
      },
    });
  }
}
