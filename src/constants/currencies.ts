export const CURRENCIES = [
  { code: "NGN", flag: "🇳🇬", label: "Nigerian Naira", symbol: "NGN ", rateFromNGN: 1 },
  { code: "USD", flag: "🇺🇸", label: "US Dollar", symbol: "$", rateFromNGN: 1 / 1550 },
  { code: "EUR", flag: "🇪🇺", label: "Euro", symbol: "€", rateFromNGN: 1 / 1680 },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export function getCurrency(code: CurrencyCode) {
  return CURRENCIES.find((c) => c.code === code)!;
}

export function formatAmount(amountNGN: number, code: CurrencyCode) {
  const currency = getCurrency(code);
  const sign = amountNGN < 0 ? "- " : amountNGN > 0 ? "+ " : "";
  const value = Math.abs(amountNGN * currency.rateFromNGN).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${sign}${currency.symbol}${value}`;
}