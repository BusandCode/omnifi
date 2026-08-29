import { Feather } from '@expo/vector-icons';

export type TxnCategory = 'in' | 'out' | 'airtime_data' | 'other';

export type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  amount: number;
  direction: 'in' | 'out';
  category: TxnCategory;
  status: 'Successful' | 'Pending' | 'Failed';
  icon: keyof typeof Feather.glyphMap;
  iconBg: string;
  iconColor: string;
};

export const transactionsByDate: { date: string; transactions: Transaction[] }[] = [
  {
    date: 'Today',
    transactions: [
      {
        id: 't1',
        title: 'Money Received',
        subtitle: 'From John Adeyemi',
        time: '09:21 AM',
        amount: 50000,
        direction: 'in',
        category: 'in',
        status: 'Successful',
        icon: 'arrow-down',
        iconBg: 'rgba(167,139,250,0.15)',
        iconColor: '#A78BFA',
      },
      {
        id: 't2',
        title: 'Transfer to Bank',
        subtitle: 'First Bank •••• 1234',
        time: '08:43 AM',
        amount: 120000,
        direction: 'out',
        category: 'out',
        status: 'Successful',
        icon: 'arrow-up',
        iconBg: 'rgba(167,139,250,0.15)',
        iconColor: '#A78BFA',
      },
      {
        id: 't3',
        title: 'Airtime Purchase',
        subtitle: 'MTN • 0803 123 4567',
        time: '07:55 AM',
        amount: 1000,
        direction: 'out',
        category: 'airtime_data',
        status: 'Successful',
        icon: 'smartphone',
        iconBg: 'rgba(245,166,35,0.15)',
        iconColor: '#F5A623',
      },
      {
        id: 't4',
        title: 'Money Received',
        subtitle: 'From Maryam Garba',
        time: '07:20 AM',
        amount: 30000,
        direction: 'in',
        category: 'in',
        status: 'Successful',
        icon: 'arrow-down',
        iconBg: 'rgba(52,199,89,0.15)',
        iconColor: '#34C759',
      },
    ],
  },
  {
    date: 'Yesterday, 20 Jul 2026',
    transactions: [
      {
        id: 't5',
        title: 'Data Purchase',
        subtitle: 'Airtel • 5GB',
        time: '09:15 PM',
        amount: 1500,
        direction: 'out',
        category: 'airtime_data',
        status: 'Successful',
        icon: 'wifi',
        iconBg: 'rgba(59,130,246,0.15)',
        iconColor: '#3B82F6',
      },
      {
        id: 't6',
        title: 'Payment to Merchant',
        subtitle: 'Jumia Nigeria',
        time: '06:32 PM',
        amount: 15000,
        direction: 'out',
        category: 'other',
        status: 'Successful',
        icon: 'shopping-bag',
        iconBg: 'rgba(245,166,35,0.15)',
        iconColor: '#F5A623',
      },
      {
        id: 't7',
        title: 'Money Received',
        subtitle: 'From Ibrahim Musa',
        time: '04:18 PM',
        amount: 25000,
        direction: 'in',
        category: 'in',
        status: 'Successful',
        icon: 'arrow-down',
        iconBg: 'rgba(52,199,89,0.15)',
        iconColor: '#34C759',
      },
      {
        id: 't8',
        title: 'Transfer to Bank',
        subtitle: 'Access Bank •••• 5678',
        time: '11:07 AM',
        amount: 80000,
        direction: 'out',
        category: 'out',
        status: 'Successful',
        icon: 'arrow-up',
        iconBg: 'rgba(167,139,250,0.15)',
        iconColor: '#A78BFA',
      },
    ],
  },
];