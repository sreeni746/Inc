import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AgentListComponent } from './pages/agent/agent-list/agent-list.component';
import {DxDataGridModule } from 'devextreme-angular';
import { ButtonModule, CardModule, DropdownModule, GridModule } from '@coreui/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgentEditComponent } from './pages/agent/agent-edit/agent-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgentService } from './services/agent.service';
import { LevelService } from './services/level.service';
import { ParentAgentService } from './services/parent-agent.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisableControlDirective } from '../../shared/directives/disable-control.directive';
import { LevelListComponent } from './pages/level/level-list/level-list.component';
import { LevelEditComponent } from './pages/level/level-edit/level-edit.component';
import { LevelAddComponent } from './pages/level/level-add/level-add.component';
import { LevelTargetListComponent } from './pages/level-target/level-target-list/level-target-list.component';
import { IconModule } from '@coreui/icons-angular';
import { AgentHierarchyTopComponent } from './pages/agent-hierarchy/agent-hierarchy-top/agent-hierarchy-top.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AgentHeirarchyService } from './services/agent-heirarchy.service';
import { AgentHierarchyBottomComponent } from './pages/agent-hierarchy/agent-hierarchy-bottom/agent-hierarchy-bottom.component';
@NgModule({
  declarations: [
    AgentListComponent,
    AgentEditComponent,
    LevelListComponent,
    LevelEditComponent,
    LevelAddComponent,
    LevelTargetListComponent,
    AgentHierarchyTopComponent,
    AgentHierarchyBottomComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CardModule,
    DxDataGridModule,
    ButtonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    SharedModule,
    IconModule,
    OrganizationChartModule,
  ],
  providers:[AgentService,LevelService,ParentAgentService,AgentHeirarchyService]
})
export class AdminModule { }
