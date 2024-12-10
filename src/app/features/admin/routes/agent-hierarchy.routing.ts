import { Routes } from '@angular/router';
import { AgentHierarchyTopComponent } from '../pages/agent-hierarchy/agent-hierarchy-top/agent-hierarchy-top.component';
import { AgentHierarchyBottomComponent } from '../pages/agent-hierarchy/agent-hierarchy-bottom/agent-hierarchy-bottom.component';

export const AGENT_HIERARCHY_ROUTES: Routes = [
  {
    path: 'agent-hierarchy-top',
    component: AgentHierarchyTopComponent,
  },
  {
    path: 'agent-hierarchy-bottom',
    component: AgentHierarchyBottomComponent,
  },
];
