import { AgentListComponent } from './../pages/agent/agent-list/agent-list.component';
import { Routes } from "@angular/router";
import { AgentEditComponent } from '../pages/agent/agent-edit/agent-edit.component';


const prefix: string = 'agents';

export const AGENT_ROUTES: Routes = [
  {
    path: prefix,
    component:AgentListComponent,
  },
  {
    path: prefix+'-edit',
    component:AgentEditComponent,
  }
];
