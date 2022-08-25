import {CurrencyDTO} from "../types/CurrencyDTO.interface";
import {Currency} from "../types/Currency.interface";

export function mapCurrencyDTO(data: CurrencyDTO): Currency {
    return {
        id: data.id,
        code: data.CharCode,
        nominal: data.Nominal,
        name: data.Name,
        value: data.Value,
    }
}
