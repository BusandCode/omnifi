// src/config/moreServices.ts — service tile definitions for the More screen
export type MoreServiceIcon =
  | 'airtime'
  | 'data'
  | 'giftCard'
  | 'betting'
  | 'utilityBill'
  | 'scanToPay'
  | 'electricity'
  | 'cable'
  | 'liveChat'
  | 'flights'
  | 'insurance'
  | 'airtimeToCash';

export interface MoreService {
  key: MoreServiceIcon;
  title: string;
  description: string;
  route: string;
}

export const MORE_SERVICES: MoreService[] = [
  {
    key: 'airtime',
    title: 'Airtime',
    description: 'Buy airtime for yourself or others',
    route: '/airtime',
  },
  {
    key: 'data',
    title: 'Data',
    description: 'Buy data bundles for any network',
    route: '/data',
  },
  {
    key: 'giftCard',
    title: 'Gift Card',
    description: 'Buy or trade gift cards',
    route: '/gift-card',
  },
  {
    key: 'betting',
    title: 'Betting',
    description: 'Fund your betting accounts instantly',
    route: '/betting',
  },
  {
    key: 'utilityBill',
    title: 'Utility Bill',
    description: 'Pay for water, waste and other utilities',
    route: '/utility-bill',
  },
  {
    key: 'scanToPay',
    title: 'Scan to Pay',
    description: 'Scan QR code and pay instantly',
    route: '/scan-to-pay',
  },
  {
    key: 'electricity',
    title: 'Electricity',
    description: 'Pay electricity bills with ease',
    route: '/electricity',
  },
  {
    key: 'cable',
    title: 'Cable',
    description: 'Pay for your cable TV subscriptions',
    route: '/cable',
  },
  {
    key: 'liveChat',
    title: 'Live Chat',
    description: 'Chat with our support team instantly',
    route: '/live-chat',
  },
  {
    key: 'flights',
    title: 'Flights',
    description: 'Book and manage flight tickets',
    route: '/flights',
  },
  {
    key: 'insurance',
    title: 'Insurance',
    description: 'Get covered with affordable plans',
    route: '/insurance',
  },
  {
    key: 'airtimeToCash',
    title: 'Airtime to Cash',
    description: 'Convert spare airtime to wallet cash',
    route: '/airtime-to-cash',
  },
];
