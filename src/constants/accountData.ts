import { CurrencyCode } from "./currencies";

export type AccountTransaction = {
  id: string;
  kind: "received" | "sent" | "converted";
  title: string;
  date: string;
  amount: string;
  status: string;
};

export type AccountDetailRow = {
  id: string;
  icon: string;
  label: string;
  value: string;
  copyable?: boolean;
  chevron?: boolean;
};

export type ForeignAccountData = {
  code: "USD" | "EUR";
  flag: string;
  fullName: string;
  balance: number;
  onHold: number;
  details: AccountDetailRow[];
  exchangeRateLabel: string;
  transactions: AccountTransaction[];
};

export const accountData: Record<"USD" | "EUR", ForeignAccountData> = {
  USD: {
    code: "USD",
    flag: "🇺🇸",
    fullName: "United States Dollar",
    balance: 12560.75,
    onHold: 300.0,
    details: [
      { id: "number", icon: "hash", label: "Account Number", value: "USD 1234 5678 9012", copyable: true },
      { id: "swift", icon: "globe", label: "SWIFT/BIC", value: "OMNIFUSDXXX", copyable: true },
      { id: "type", icon: "bank", label: "Account Type", value: "Savings Account", chevron: true },
      { id: "date", icon: "calendar", label: "Date Opened", value: "15 Jan 2024" },
    ],
    exchangeRateLabel: "1 USD = ₦1,562.00 NGN",
    transactions: [
      { id: "1", kind: "received", title: "Received from John D.", date: "18 Jul 2026, 09:23 AM", amount: "+ $2,500.00", status: "Completed" },
      { id: "2", kind: "sent", title: "Sent to Amazon Services", date: "17 Jul 2026, 04:11 PM", amount: "- $69.99", status: "Completed" },
      { id: "3", kind: "converted", title: "Converted to NGN", date: "16 Jul 2026, 11:07 AM", amount: "- $1,200.00", status: "Completed" },
    ],
  },
  EUR: {
    code: "EUR",
    flag: "🇪🇺",
    fullName: "Euro",
    balance: 8735.4,
    onHold: 250.0,
    details: [
      { id: "number", icon: "hash", label: "Account Number", value: "EUR 1234 5678 9012", copyable: true },
      { id: "iban", icon: "globe", label: "IBAN", value: "DE89 3704 0044 0532 0130 00", copyable: true },
      { id: "swift", icon: "globe", label: "SWIFT/BIC", value: "DEUTDEFFXXX", copyable: true },
      { id: "type", icon: "bank", label: "Account Type", value: "Savings Account", chevron: true },
      { id: "date", icon: "calendar", label: "Date Opened", value: "15 Jan 2024" },
    ],
    exchangeRateLabel: "1 EUR = ₦1,702.35 NGN",
    transactions: [
      { id: "1", kind: "received", title: "Received from Anna M.", date: "19 Jul 2026, 10:31 AM", amount: "+ €1,250.00", status: "Completed" },
      { id: "2", kind: "sent", title: "Sent to Booking.com", date: "18 Jul 2026, 03:42 PM", amount: "- €120.50", status: "Completed" },
      { id: "3", kind: "converted", title: "Converted to NGN", date: "17 Jul 2026, 11:09 AM", amount: "- €500.00", status: "Completed" },
    ],
  },
};

export function getForeignAccount(code: Exclude<CurrencyCode, "NGN">) {
  return accountData[code];
}