import { Routes } from '@angular/router';
import { LevelListComponent } from '../pages/level/level-list/level-list.component';
import { LevelEditComponent } from '../pages/level/level-edit/level-edit.component';
import { LevelAddComponent } from '../pages/level/level-add/level-add.component';
const prefix: string = 'level';

export const LEVEl_ROUTES: Routes = [
  {
    path: prefix,
    component:LevelListComponent,
  },
  {
    path: prefix+'-edit',
    component:LevelEditComponent,
  },
  {
    path: prefix+'-add',
    component:LevelAddComponent,
  }
];