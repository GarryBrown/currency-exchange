import {Inject, Injectable} from '@angular/core';
import {Currency} from "../types/Currency.interface";
import {map, Observable, Subject, switchMap, takeUntil, tap, timer} from "rxjs";
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

  constructor(
      private currencyApi: CurrencyApiService,
      @Inject(UPDATE_INTERVAL) private updateInterval: number
      ) {
  }

  start(): void {
    timer(0, this.updateInterval).pipe(
      switchMap(_ => this.currencyApi.getData()),
      map(data => [...Object.keys(data.Valute).map((k) => data.Valute[k as Currencies])]),
      map(data => data.map(mapCurrencyDTO)),
      tap(data => this.store.next(data)),
      takeUntil(this.destroy$)
    ).subscribe()
  }

  stop(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

