import { accountData } from "./accountData";

export type ForeignCurrency = "USD" | "EUR";

export type ForeignAccountBrief = {
  code: ForeignCurrency;
  flagEmoji: string;
  symbol: string;
  balance: number;
  country: string;
  accountType: string;
};

const SYMBOLS: Record<ForeignCurrency, string> = { USD: "$", EUR: "€" };
const FLAGS: Record<ForeignCurrency, string> = { USD: "🇺🇸", EUR: "🇪🇺" };
const COUNTRIES: Record<ForeignCurrency, string> = { USD: "United States", EUR: "Germany" };

export const FOREIGN_ACCOUNTS: Record<ForeignCurrency, ForeignAccountBrief> = {
  USD: {
    code: "USD",
    flagEmoji: FLAGS.USD,
    symbol: SYMBOLS.USD,
    balance: accountData.USD.balance,
    country: COUNTRIES.USD,
    accountType: "Checking Account",
  },
  EUR: {
    code: "EUR",
    flagEmoji: FLAGS.EUR,
    symbol: SYMBOLS.EUR,
    balance: accountData.EUR.balance,
    country: COUNTRIES.EUR,
    accountType: "Current Account",
  },
};

export type SendMethodId = "bank" | "omnifi" | "account" | "qr" | "saved";

export type SendMethodDef = {
  id: SendMethodId;
  icon: { lib: "Ionicons" | "Feather"; name: string };
  label: (currency: ForeignCurrency) => string;
};

export const FOREIGN_SEND_METHODS: SendMethodDef[] = [
  { id: "bank", icon: { lib: "Ionicons", name: "business" }, label: () => "To Bank Account" },
  { id: "omnifi", icon: { lib: "Ionicons", name: "person" }, label: () => "To OmniFi User" },
  { id: "account", icon: { lib: "Ionicons", name: "card" }, label: (c) => `To ${c} Account` },
  { id: "qr", icon: { lib: "Ionicons", name: "qr-code" }, label: () => "Scan QR Code" },
  { id: "saved", icon: { lib: "Feather", name: "file-text" }, label: () => "Saved Recipients" },
];

export type BankFieldDef = {
  key: string;
  label: string;
  verified?: boolean;
  actionIcon?: { lib: "Feather"; name: string };
};

export const FOREIGN_BANK_FIELDS: Record<ForeignCurrency, BankFieldDef[]> = {
  USD: [
    { key: "routingNumber", label: "Routing Number (ABA)", actionIcon: { lib: "Feather", name: "user" } },
    { key: "accountNumber", label: "Account Number", verified: true },
    { key: "recipientName", label: "Recipient Name", verified: true },
  ],
  EUR: [
    { key: "iban", label: "IBAN", actionIcon: { lib: "Feather", name: "user" } },
    { key: "bic", label: "BIC / SWIFT" },
    { key: "recipientName", label: "Recipient Name", verified: true },
  ],
};

export const MOCK_BANK_VALUES: Record<ForeignCurrency, Record<string, string>> = {
  USD: {
    routingNumber: "026073150",
    accountNumber: "1234 5678 9001",
    recipientName: "John Michael Smith",
  },
  EUR: {
    iban: "DE89 3704 0044 0532 0130 00",
    bic: "COBADEFFXXX",
    recipientName: "Anna Fischer",
  },
};