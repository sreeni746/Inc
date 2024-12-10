import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import * as moment from 'moment';
import { LevelService } from '../../../services/level.service';
import { Configuration } from 'src/app/shared/services/configuration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level-target-list',
  templateUrl: './level-target-list.component.html',
  styleUrls: ['./level-target-list.component.css'],
})
export class LevelTargetListComponent implements OnInit {
  constructor(
    private levelService: LevelService,
    private configuration: Configuration,
    private router: Router
  ) {}
  levelTargetList: any;
  @ViewChild('levelTargetList')
  dataGrid!: DxDataGridComponent;
  customDataSource: CustomStore = new CustomStore();

  filterForm = new FormGroup({
    searchText: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllLevels();
  }

  filter() {
    this.dataGrid.instance.pageIndex(0);
    this.dataGrid.instance.refresh();
  }
  edit = (e: any) => {
    console.log(e)
    this.dataGrid.instance.editRow(e.row.key);
  };
  getAllLevels() {
    this.customDataSource = new CustomStore({
      key: 'id',
      load: (loadOptions: any) => {
        let payload = {
          pageNo: loadOptions.skip / loadOptions.take + 1,
          pageSize: loadOptions.take,
          currentDate: moment().format(this.configuration.ApiDateFormat),
          searchText: this.filterForm.get('searchText')?.value,
        };

        return this.levelService
          .getAllLevelsPaginated(payload)
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
