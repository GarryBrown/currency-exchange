import {Currency} from "../types/Currency.interface";

export function exchangeCurrency(amount: number): (v: Currency) => Currency {
    return (data: Currency) => ({
        ...data,
        value: amount / data.value
    })
}
