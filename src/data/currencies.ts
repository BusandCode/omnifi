export type CurrencyCode = 'USD' | 'NGN' | 'EUR';

export type Currency = {
  code: CurrencyCode;
  name: string;
  flag: string;
  balance: number;
};

export const currencies: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', name: 'US Dollar', flag: '🇺🇸', balance: 1250.0 },
  NGN: { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', balance: 798518301.2 },
  EUR: { code: 'EUR', name: 'Euro', flag: '🇪🇺', balance: 340.5 },
};