import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SuccessHeader } from '../src/components/transfer-success/SuccessHeader';
import { SuccessBadge } from '../src/components/transfer-success/SuccessBadge';
import { TransferSummary } from '../src/components/transfer-success/TransferSummary';
import { TransactionDetails } from '../src/components/transfer-success/TransactionDetails';
import { SecureBanner } from '../src/components/transfer-success/SecureBanner';
import { ActionButtons } from '../src/components/transfer-success/ActionButtons';
import { NeedHelp } from '../src/components/transfer-success/NeedHelp';
import { colors } from '../src/theme/colors';
import { CurrencyCode } from '../src/constants/currencies';

export default function TransferSuccessScreen() {
  const params = useLocalSearchParams<{
    amount?: string;
    currency?: string;
    recipientName?: string;
    recipientBank?: string;
    recipientInitials?: string;
    paymentMethod?: string;
    note?: string;
  }>();

  const amount = Number(params.amount) || 0;
  const currency = (params.currency as CurrencyCode) || 'NGN';
  const recipientName = params.recipientName || 'Recipient';
  const recipientBank = params.recipientBank || '';
  const recipientInitials = params.recipientInitials || recipientName.slice(0, 2).toUpperCase();
  const paymentMethod = params.paymentMethod || 'Bank Transfer';

  const reference = `TRF-${Date.now().toString().slice(-9)}`;
  const dateTime = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      <SuccessHeader />
      <SuccessBadge />
      <TransferSummary
        amount={amount}
        currency={currency}
        recipientName={recipientName}
        recipientBank={recipientBank}
        recipientInitials={recipientInitials}
      />
      <TransactionDetails
        amount={amount}
        currency={currency}
        reference={reference}
        dateTime={dateTime}
        paymentMethod={paymentMethod}
      />
      <SecureBanner />
      <View style={{ flex: 1 }} />
      <ActionButtons onBackHome={() => router.replace('/')} />
      <NeedHelp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 45, paddingBottom: 20, gap: 8 },
});