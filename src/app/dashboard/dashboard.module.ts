import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {CurrencyItemComponent} from './components/currency-item/currency-item.component';
import {HttpClientModule} from "@angular/common/http";
import {InputComponent} from './components/input/input.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NumbersOnlyDirective} from './directives/numbers-only.directive';
import {ToFixedPipe} from './pipes/to-fixed.pipe';
import {UPDATE_INTERVAL} from "./types/update-interval.token";


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
    ],
    providers: [
        {provide: UPDATE_INTERVAL, useValue: 10000}
    ]
})
export class DashboardModule {
}
