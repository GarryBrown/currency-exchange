import {Inject, Injectable} from '@angular/core';
import {Currency} from "../types/Currency.interface";
import {
    combineLatestWith,
    debounceTime,
    map,
    Observable,
    startWith,
    Subject,
    switchMap,
    takeUntil,
    tap,
    timer
} from "rxjs";
import {CurrencyApiService} from "./currency-api.service";
import {Currencies} from "../types/currencies.enum";
import {mapCurrencyDTO} from "../utils/map-currency-DTO";
import {UPDATE_INTERVAL} from "../types/update-interval.token";

@Injectable({
    providedIn: 'root'
})
export class CurrencyStoreService {
    private readonly store: Subject<Currency[]> = new Subject<Currency[]>();
    readonly onDataReceived: Observable<Currency[]> = this.store.asObservable();
    private readonly destroy$: Subject<void> = new Subject();
    private readonly updatingSource: Subject<boolean> = new Subject<boolean>();
    readonly updating$: Observable<boolean> = this.updatingSource.asObservable();
    private readonly forceUpdateSource: Subject<void> = new Subject<void>();
    private readonly forceUpdate$: Observable<void> = this.forceUpdateSource.pipe(debounceTime(500))

    constructor(
        private currencyApi: CurrencyApiService,
        @Inject(UPDATE_INTERVAL) private updateInterval: number
    ) {
    }

    forceUpdate(): void {
        this.forceUpdateSource.next()
    }

    start(): void {

        timer(0, this.updateInterval).pipe(
            combineLatestWith(this.forceUpdate$.pipe(startWith(0))),
            tap(_ => this.updatingSource.next(true)),
            switchMap(_ => this.currencyApi.getData()),
            map(data => [...Object.keys(data.Valute).map((k) => data.Valute[k as Currencies])]),
            map(data => data.map(mapCurrencyDTO)),
            tap(_ => this.updatingSource.next(false)),
            tap(data => this.store.next(data)),
            takeUntil(this.destroy$)
        ).subscribe()
    }

    stop(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}

