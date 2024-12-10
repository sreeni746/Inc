import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-spinner',
  templateUrl: './card-spinner.component.html',
  styleUrls: ['./card-spinner.component.css']
})
export class CardSpinnerComponent implements OnInit {
  @Input() isLoading:boolean=false;
  constructor() { }

  ngOnInit() {
  }

}
