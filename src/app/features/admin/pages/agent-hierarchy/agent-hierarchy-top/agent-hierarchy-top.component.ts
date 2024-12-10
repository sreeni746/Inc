import { Component, OnInit } from '@angular/core';
import { AgentHeirarchyService } from '../../../services/agent-heirarchy.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-agent-hierarchy-top',
  templateUrl: './agent-hierarchy-top.component.html',
  styleUrls: ['./agent-hierarchy-top.component.css'],
})
export class AgentHierarchyTopComponent implements OnInit {
  isDataLoading: boolean = false;
  constructor(
    private agentHeirarchyService: AgentHeirarchyService,
    private route: ActivatedRoute
  ) {}
 

  treeData: any = [];

  ngOnInit() {
    this.isDataLoading = true;
    this.agentHeirarchyService
      .getTopHeirarchy(this.route.snapshot.queryParamMap.get('id'),this.route.snapshot.queryParamMap.get('asOfDate'))
      .pipe(
        finalize(() => (this.isDataLoading = false)) // Execute when the observable completes
      )
      .subscribe((res: any) => {
        console.log(res.data);
        this.treeData.push(res.data);
      });
  }
}
