export type PeriodKey = 'week' | 'month' | 'quarter' | 'year';

export type SpendingCategory = {
  key: string;
  label: string;
  icon: string;
  color: string;
  amount: number;
};

export type TrendPoint = {
  date: string;
  label: string;
  amount: number;
};

export type PeriodData = {
  totalSpent: number;
  vsLastPeriodPercent: number;
  moneyIn: number;
  moneyOut: number;
  categories: SpendingCategory[];
  trend: TrendPoint[];
};

const MONTH_CATEGORIES: SpendingCategory[] = [
  { key: 'transfers', label: 'Transfers', icon: 'arrow-up', color: '#8B5CF6', amount: 120000 },
  { key: 'bills', label: 'Bills & Utilities', icon: 'zap', color: '#F59E0B', amount: 68450 },
  { key: 'shopping', label: 'Shopping', icon: 'shopping-bag', color: '#3B82F6', amount: 46800 },
  { key: 'food', label: 'Food & Dining', icon: 'coffee', color: '#22C55E', amount: 34250 },
  { key: 'transport', label: 'Transport', icon: 'truck', color: '#EC4899', amount: 24500 },
  { key: 'entertainment', label: 'Entertainment', icon: 'play', color: '#14B8A6', amount: 18200 },
  { key: 'others', label: 'Others', icon: 'more-horizontal', color: '#6B7280', amount: 14250.75 },
];

const MONTH_TREND: TrendPoint[] = [
  { date: '2026-05-01', label: '1 May', amount: 14200 },
  { date: '2026-05-03', label: '3 May', amount: 22100 },
  { date: '2026-05-05', label: '5 May', amount: 18500 },
  { date: '2026-05-07', label: '7 May', amount: 27800 },
  { date: '2026-05-09', label: '9 May', amount: 21000 },
  { date: '2026-05-11', label: '11 May', amount: 30200 },
  { date: '2026-05-13', label: '13 May', amount: 25600 },
  { date: '2026-05-16', label: '16 May', amount: 48750 },
  { date: '2026-05-18', label: '18 May', amount: 35400 },
  { date: '2026-05-20', label: '20 May', amount: 29800 },
  { date: '2026-05-22', label: '22 May', amount: 33100 },
  { date: '2026-05-25', label: '25 May', amount: 38900 },
  { date: '2026-05-27', label: '27 May', amount: 12450 },
  { date: '2026-05-29', label: '29 May', amount: 26700 },
  { date: '2026-05-31', label: '31 May', amount: 19300 },
];

const scale = (points: TrendPoint[], factor: number): TrendPoint[] =>
  points.map((p) => ({ ...p, amount: Math.round(p.amount * factor) }));

const scaleCategories = (cats: SpendingCategory[], factor: number): SpendingCategory[] =>
  cats.map((c) => ({ ...c, amount: Math.round(c.amount * factor * 100) / 100 }));

export const SPENDING_DATA: Record<PeriodKey, PeriodData> = {
  week: {
    totalSpent: 74300,
    vsLastPeriodPercent: -4.2,
    moneyIn: 250000,
    moneyOut: 74300,
    categories: scaleCategories(MONTH_CATEGORIES, 0.23),
    trend: scale(MONTH_TREND.slice(-7), 1),
  },
  month: {
    totalSpent: 326450.75,
    vsLastPeriodPercent: -8.5,
    moneyIn: 1245800.0,
    moneyOut: 326450.75,
    categories: MONTH_CATEGORIES,
    trend: MONTH_TREND,
  },
  quarter: {
    totalSpent: 918200,
    vsLastPeriodPercent: 5.1,
    moneyIn: 3400000,
    moneyOut: 918200,
    categories: scaleCategories(MONTH_CATEGORIES, 2.8),
    trend: scale(MONTH_TREND, 2.6),
  },
  year: {
    totalSpent: 3820500,
    vsLastPeriodPercent: 2.3,
    moneyIn: 14200000,
    moneyOut: 3820500,
    categories: scaleCategories(MONTH_CATEGORIES, 11.7),
    trend: scale(MONTH_TREND, 10.4),
  },
};