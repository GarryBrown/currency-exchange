import {Currencies} from "./currencies.enum";
import {CurrencyDTO} from "./CurrencyDTO.interface";

export interface CurrencyDataDTO {
    "Date": string,
    "PreviousDate": string,
    "PreviousURL": string,
    "Timestamp": string,
    "Valute": { [key in keyof typeof Currencies]: CurrencyDTO }
    // "Valute": {[key in Currencies]: CurrencyDTO }
}


