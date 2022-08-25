import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatestWith, map, Observable, startWith, Subject} from "rxjs";
import {CurrencyStoreService} from "./services/currency-store.service";
import {Currency} from "./types/Currency.interface";
import {exchangeCurrency} from "./utils/exchange-currency";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
    readonly initialValue: number = 1;
    readonly updating$: Observable<boolean> = this.currencyStoreService.updating$;
    readonly currencyList$: Observable<Currency[]> = this.currencyStoreService.onDataReceived;
    private readonly amountChangeSource: Subject<number> = new Subject<number>();
    private readonly amount$: Observable<number> = this.amountChangeSource.asObservable();
    readonly exchangeCurrencyList$: Observable<Currency[]> =
        this.currencyList$.pipe(
            combineLatestWith(this.amount$.pipe(startWith(this.initialValue))),
            map(([cur, amount]) => cur.map(exchangeCurrency(amount))),
        );

    constructor(private currencyStoreService: CurrencyStoreService) {
    }

    trackBy(_: number, data: Currency): string {
        return data.id
    }

    amountChange(e: number): void {
        this.amountChangeSource.next(e);
    }

    forceUpdate(): void {
        this.currencyStoreService.forceUpdate();
    }

    ngOnInit(): void {
        this.currencyStoreService.start();
    }

    ngOnDestroy(): void {
        this.currencyStoreService.stop();
    }

}
