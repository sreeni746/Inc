import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { FieldErrorComponent } from './components/field-error/field-error.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { CardSpinnerComponent } from './components/card-spinner/card-spinner.component';
import { SpinnerModule } from '@coreui/angular';
import { DxDateBoxModule } from 'devextreme-angular';



@NgModule({
  declarations: [
    LoaderComponent,
    FieldErrorComponent,
    DisableControlDirective,
    CardSpinnerComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    DxDateBoxModule
  ],
  exports:[
    LoaderComponent,
    FieldErrorComponent,
    DisableControlDirective,
    CardSpinnerComponent,
    SpinnerModule,
    DxDateBoxModule
  ]
})
export class SharedModule { }
