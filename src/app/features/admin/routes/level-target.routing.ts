import { Routes } from '@angular/router';
import { LevelTargetListComponent } from '../pages/level-target/level-target-list/level-target-list.component';
const prefix: string = 'level-target';

export const LEVEL_TARGET_ROUTES: Routes = [
  {
    path: prefix,
    component:LevelTargetListComponent,
  },
];