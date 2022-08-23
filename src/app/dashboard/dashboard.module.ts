import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {CurrencyItemComponent} from './components/currency-item/currency-item.component';
import {HttpClientModule} from "@angular/common/http";
import {InputComponent} from './components/input/input.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NumbersOnlyDirective} from './directives/numbers-only.directive';
import {ToFixedPipe} from './pipes/to-fixed.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    CurrencyItemComponent,
    InputComponent,
    NumbersOnlyDirective,
    ToFixedPipe
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule {
}
