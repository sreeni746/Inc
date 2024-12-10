import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AgentHeirarchyService } from '../../../services/agent-heirarchy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agent-hierarchy-bottom',
  templateUrl: './agent-hierarchy-bottom.component.html',
  styleUrls: ['./agent-hierarchy-bottom.component.css']
})
export class AgentHierarchyBottomComponent implements OnInit {

  isDataLoading: boolean = false;
  constructor(
    private agentHeirarchyService: AgentHeirarchyService,
    private route: ActivatedRoute
  ) {}
 

  treeData: any = [];

  ngOnInit() {
    this.isDataLoading = true;
    this.agentHeirarchyService
      .getBottomHeirarchy(this.route.snapshot.queryParamMap.get('id'),this.route.snapshot.queryParamMap.get('asOfDate'))
      .pipe(
        finalize(() => (this.isDataLoading = false)) // Execute when the observable completes
      )
      .subscribe((res: any) => {
        console.log(res.data);
        this.treeData.push(res.data);
      });
  }
}
