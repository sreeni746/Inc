import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) {}
  ngOnInit() {
   this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
        console.log(state)
      }
    );
  }
  ngOnDestroy() {
   // this.subscription.unsubscribe();
  }
}
