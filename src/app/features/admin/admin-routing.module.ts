import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AGENT_ROUTES } from './routes/agent.routing';
import { LEVEl_ROUTES } from './routes/level.routing';
import { LEVEL_TARGET_ROUTES } from './routes/level-target.routing';
import { AGENT_HIERARCHY_ROUTES } from './routes/agent-hierarchy.routing';

const routes: Routes = [
  ...AGENT_ROUTES,
  ...LEVEl_ROUTES,
  ...LEVEL_TARGET_ROUTES,
  ...AGENT_HIERARCHY_ROUTES
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
