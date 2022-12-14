import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {CurrencyDataDTO} from "../types/CurrencyDataDTO.interface";

@Injectable({
    providedIn: 'root'
})
export class CurrencyApiService {

    constructor(private http: HttpClient) {
    }


    getData(): Observable<CurrencyDataDTO> {
        return this.http.get<CurrencyDataDTO>('https://www.cbr-xml-daily.ru/daily_json.js').pipe(
            // just to see UI loading
            delay(1000)
        )
    }
}
