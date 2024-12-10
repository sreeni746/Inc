import { Component, OnInit, ViewChild } from '@angular/core';
import { LevelService } from '../../../services/level.service';
import { Configuration } from 'src/app/shared/services/configuration.service';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css'],
})
export class LevelListComponent implements OnInit {
  constructor(
    private levelService: LevelService,
    private configuration: Configuration,
    private router: Router
  ) {}
  levelList: any;
  @ViewChild('levelList')
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
    this.router.navigate(['/admin/level-edit'], {
      queryParams: { id: e.row.data.id },
    });
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
