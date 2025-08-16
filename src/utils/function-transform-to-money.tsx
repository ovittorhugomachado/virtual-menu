import { Money } from "../types/types-money.d";

export const toMoney = (value: number, currency: string = "BRL"): Money => {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);

  return formatted as Money;
}