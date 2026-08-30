export type TierNumber = 1 | 2 | 3;

export interface LimitRow {
  key: string;
  icon: 'bank' | 'card' | 'globe' | 'swap' | 'wallet' | 'deposit' | 'withdraw' | 'virtualCard';
  label: string;
  sublabel?: string;
  value: string;
  valueColor?: 'default' | 'success';
  showChevron?: boolean;
}

export interface UnlockCardItem {
  key: string;
  label: string;
}

export interface UnlockCardConfig {
  title: string;
  items: UnlockCardItem[];
  highestLevel?: boolean;
}

export interface TierConfig {
  tier: TierNumber;
  levelName: string;
  badgeLabel?: string;
  dailyLimit: string;
  monthlyLimit: string;
  progressPercent: number;
  caption: string;
  transferLimits: LimitRow[];
  walletLimits: LimitRow[];
  unlockCard: UnlockCardConfig;
  ctaLabel: string;
  showFooterHelp: boolean;
}

const TIER_1: TierConfig = {
  tier: 1,
  levelName: 'Tier 1',
  badgeLabel: 'Basic Account',
  dailyLimit: '₦200,000',
  monthlyLimit: '₦1,000,000',
  progressPercent: 50,
  caption: 'Upgrade to Tier 2 to unlock higher limits and more features.',
  transferLimits: [
    { key: 'bank', icon: 'bank', label: 'Bank Transfer', sublabel: 'Daily', value: '₦200,000', showChevron: true },
    { key: 'card', icon: 'card', label: 'Card Payments', sublabel: 'Daily', value: '₦100,000', showChevron: true },
    { key: 'intl', icon: 'globe', label: 'International Transfers', sublabel: 'Daily', value: '₦50,000', showChevron: true },
    { key: 'swap', icon: 'swap', label: 'Currency Swap', sublabel: 'Daily', value: '₦50,000', showChevron: true },
  ],
  walletLimits: [
    { key: 'walletBalance', icon: 'wallet', label: 'Wallet Balance', value: '₦500,000', valueColor: 'success' },
    { key: 'deposit', icon: 'deposit', label: 'Cash Deposit', value: '₦1,000,000/day' },
    { key: 'withdraw', icon: 'withdraw', label: 'Cash Withdrawal', value: '₦200,000/day' },
    { key: 'virtualCard', icon: 'virtualCard', label: 'Virtual Card Spending', value: '₦200,000/day' },
  ],
  unlockCard: {
    title: 'Unlock More with Tier 2',
    items: [
      { key: '1', label: 'Higher transfer limits' },
      { key: '2', label: 'Access to more features' },
      { key: '3', label: 'Priority customer support' },
      { key: '4', label: 'Business account access' },
    ],
  },
  ctaLabel: 'Upgrade to Tier 2',
  showFooterHelp: false,
};

const TIER_2: TierConfig = {
  tier: 2,
  levelName: 'Tier 2',
  dailyLimit: '₦5,000,000',
  monthlyLimit: 'Unlimited',
  progressPercent: 70,
  caption: 'Upgrade to Tier 3 to unlock higher transfer limits.',
  transferLimits: [
    { key: 'bank', icon: 'bank', label: 'Bank Transfer', sublabel: 'Daily', value: '₦5,000,000', showChevron: true },
    { key: 'card', icon: 'card', label: 'Card Payments', sublabel: 'Daily', value: '₦2,000,000', showChevron: true },
    { key: 'intl', icon: 'globe', label: 'International Transfers', sublabel: 'Daily', value: '$10,000', showChevron: true },
    { key: 'swap', icon: 'swap', label: 'Currency Swap', sublabel: 'Daily', value: '$20,000', showChevron: true },
  ],
  walletLimits: [
    { key: 'walletBalance', icon: 'wallet', label: 'Wallet Balance', value: 'Unlimited', valueColor: 'success' },
    { key: 'deposit', icon: 'deposit', label: 'Cash Deposit', value: '₦10,000,000/day' },
    { key: 'withdraw', icon: 'withdraw', label: 'Cash Withdrawal', value: '₦2,000,000/day' },
    { key: 'virtualCard', icon: 'virtualCard', label: 'Virtual Card Spending', value: '₦5,000,000/day' },
  ],
  unlockCard: {
    title: 'Unlock More with Tier 3',
    items: [
      { key: '1', label: 'Unlimited bank transfers' },
      { key: '2', label: 'Higher swap limits' },
      { key: '3', label: 'Unlimited wallet balance' },
      { key: '4', label: 'Higher crypto limits' },
      { key: '5', label: 'Priority support' },
    ],
  },
  ctaLabel: 'Upgrade Verification',
  showFooterHelp: false,
};

const TIER_3: TierConfig = {
  tier: 3,
  levelName: 'Tier 3',
  badgeLabel: 'Premium Verified',
  dailyLimit: 'Unlimited',
  monthlyLimit: 'Unlimited',
  progressPercent: 100,
  caption: 'You have the highest level. Enjoy unlimited access and maximum account features.',
  transferLimits: [
    { key: 'bank', icon: 'bank', label: 'Bank Transfer', sublabel: 'Daily', value: 'Unlimited', valueColor: 'success', showChevron: true },
    { key: 'card', icon: 'card', label: 'Card Payments', sublabel: 'Daily', value: 'Unlimited', valueColor: 'success', showChevron: true },
    { key: 'intl', icon: 'globe', label: 'International Transfers', sublabel: 'Daily', value: 'Unlimited', valueColor: 'success', showChevron: true },
    { key: 'swap', icon: 'swap', label: 'Currency Swap', sublabel: 'Daily', value: 'Unlimited', valueColor: 'success', showChevron: true },
  ],
  walletLimits: [
    { key: 'walletBalance', icon: 'wallet', label: 'Wallet Balance', value: 'Unlimited', valueColor: 'success' },
    { key: 'deposit', icon: 'deposit', label: 'Cash Deposit', value: 'Unlimited', valueColor: 'success' },
    { key: 'withdraw', icon: 'withdraw', label: 'Cash Withdrawal', value: 'Unlimited', valueColor: 'success' },
    { key: 'virtualCard', icon: 'virtualCard', label: 'Virtual Card Spending', value: 'Unlimited', valueColor: 'success' },
  ],
  unlockCard: {
    title: "You're at the Highest Level",
    items: [
      { key: '1', label: 'Unlimited transfers & payments' },
      { key: '2', label: 'Maximum wallet & spending limits' },
      { key: '3', label: 'Priority customer support' },
      { key: '4', label: 'Exclusive offers & early access' },
      { key: '5', label: 'Advanced investment features' },
      { key: '6', label: 'Business account access' },
    ],
    highestLevel: true,
  },
  ctaLabel: 'View Premium Benefits',
  showFooterHelp: true,
};

export const TIER_CONFIGS: Record<TierNumber, TierConfig> = {
  1: TIER_1,
  2: TIER_2,
  3: TIER_3,
};