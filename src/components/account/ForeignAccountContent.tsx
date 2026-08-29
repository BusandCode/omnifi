import { AccountBalanceCard } from './AccountBalanceCard';
import { AccountQuickActions } from './AccountQuickActions';
import { AccountDetailsCard } from './AccountDetailsCard';
import { ExchangeRateRow } from './ExchangeRateRow';
import { AccountRecentTransactions } from './AccountRecentTransactions';
import { getForeignAccount } from '../../constants/accountData';

type ForeignAccountContentProps = {
  currency: 'USD' | 'EUR';
};

export function ForeignAccountContent({ currency }: ForeignAccountContentProps) {
  const account = getForeignAccount(currency);

  return (
    <>
      <AccountBalanceCard
        flag={account.flag}
        code={account.code}
        balance={account.balance}
        onHold={account.onHold}
      />
      <AccountQuickActions currency={currency} />
      <AccountDetailsCard details={account.details} />
      <ExchangeRateRow label={account.exchangeRateLabel} />
      <AccountRecentTransactions transactions={account.transactions} />
    </>
  );
}