export type BudgetCategoryKey =
  | 'transfers' | 'bills' | 'shopping' | 'food' | 'transport' | 'entertainment' | 'travel' | 'others';

export type BudgetCategory = {
  key: BudgetCategoryKey;
  label: string;
  icon: string;
  color: string;
  avgLastMonth: number;
};

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  { key: 'transfers', label: 'Transfers', icon: 'swap', color: '#8B5CF6', avgLastMonth: 24650 },
  { key: 'bills', label: 'Bills & Utilities', icon: 'zap', color: '#F59E0B', avgLastMonth: 18200 },
  { key: 'shopping', label: 'Shopping', icon: 'shopping-bag', color: '#3B82F6', avgLastMonth: 15600 },
  { key: 'food', label: 'Food & Dining', icon: 'coffee', color: '#22C55E', avgLastMonth: 12800 },
  { key: 'transport', label: 'Transport', icon: 'truck', color: '#EC4899', avgLastMonth: 9400 },
  { key: 'entertainment', label: 'Entertainment', icon: 'play', color: '#14B8A6', avgLastMonth: 7200 },
  { key: 'travel', label: 'Travel', icon: 'send', color: '#6366F1', avgLastMonth: 5100 },
  { key: 'others', label: 'Others', icon: 'more-horizontal', color: '#6B7280', avgLastMonth: 4300 },
];

export type DurationKey = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';

export type DurationOption = {
  key: DurationKey;
  label: string;
  sub: string;
};

export const DURATION_OPTIONS: DurationOption[] = [
  { key: 'daily', label: 'Daily', sub: 'Resets every day' },
  { key: 'weekly', label: 'Weekly', sub: 'Resets every week' },
  { key: 'monthly', label: 'Monthly', sub: 'Resets every month' },
  { key: 'quarterly', label: 'Quarterly', sub: 'Resets every 3 months' },
  { key: 'yearly', label: 'Yearly', sub: 'Resets every year' },
  { key: 'custom', label: 'Custom', sub: 'Set a custom start and end date' },
];

export const AMOUNT_SUGGESTIONS = [10000, 20000, 50000, 100000];

export const DURATION_DAILY_DIVISOR: Record<DurationKey, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  quarterly: 90,
  yearly: 365,
  custom: 30,
};