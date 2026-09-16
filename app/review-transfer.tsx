import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReviewTransferHeader } from '../src/components/review-transfer/ReviewTransferHeader';
import { SourceAmountCard } from '../src/components/review-transfer/SourceAmountCard';
import { RecipientCard } from '../src/components/review-transfer/RecipientCard';
import { TransferSummaryCard } from '../src/components/review-transfer/TransferSummaryCard';
import { SecurityInfoCard } from '../src/components/review-transfer/SecurityInfoCard';
import { useTheme } from '../src/theme/ThemeContext';
import { getCurrency, CurrencyCode } from '../src/constants/currencies';
import { useBalances } from '../src/store/BalanceContext';

export default function ReviewTransferScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();
  const { debit, balances } = useBalances();
  const params = useLocalSearchParams<{
    currency?: string;
    amount?: string;
    recipientName?: string;
    idLabel?: string;
    idValue?: string;
    refLabel?: string;
    refValue?: string;
    note?: string;
  }>();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: themeColors.background },
        fixedHeader: { paddingHorizontal: 20, paddingBottom: 10, backgroundColor: themeColors.background },
        scroll: { flex: 1 },
        content: { paddingHorizontal: 20, paddingTop: 26, paddingBottom: 20, gap: 14 },
        noteBanner: {
          flexDirection: 'row', alignItems: 'flex-start', gap: 10,
          backgroundColor: themeColors.surface,
          borderRadius: 14,
          padding: 14,
        },
        noteText: { flex: 1, color: themeColors.textSecondary, fontSize: 10.5, lineHeight: 15 },
        fixedFooter: { paddingHorizontal: 20, paddingTop: 8, backgroundColor: themeColors.background },
        confirmBtn: {
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
          backgroundColor: themeColors.primary,
          borderRadius: 16,
          paddingVertical: 16,
        },
        confirmText: { color: '#fff', fontSize: 14.5, fontWeight: '700' },
        termsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 10, marginBottom: 4 },
        termsText: { color: themeColors.textSecondary, fontSize: 10 },
        termsLink: { color: themeColors.primaryLight, fontWeight: '600' },
      }),
    [themeColors],
  );

  const currencyCode: CurrencyCode =
    params.currency === 'USD' || params.currency === 'EUR' ? params.currency : 'USD';
  const { symbol, code, label, flag } = getCurrency(currencyCode);

  const amount = Number(params.amount) || 0;
  const availableBalance = balances[currencyCode];
  const fee = 0; // FREE, matching your screenshot
  const total = amount + fee;

  const money = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleConfirm = () => {
    debit(currencyCode, total);
    router.replace({
      pathname: '/transfer-success',
      params: {
        amount: total.toString(),
        currency: currencyCode,
        recipientName: params.recipientName || 'Recipient',
        recipientBank: '',
        recipientInitials: (params.recipientName || 'R')
          .split(' ')
          .map((p) => p[0])
          .slice(0, 2)
          .join('')
          .toUpperCase(),
        paymentMethod: `${code} Transfer`,
        note: params.note || '',
      },
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <ReviewTransferHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SourceAmountCard
          flag={flag}
          accountLabel={`${code} Account`}
          availableBalanceLabel={`${symbol}${money(availableBalance)}`}
          amountLabel={`${symbol}${money(amount)}`}
          currencyBadge={`${code} • ${label}`}
        />

        <RecipientCard
          recipientName={params.recipientName || 'Recipient'}
          idLabel={params.idLabel || 'Account Number'}
          idValue={params.idValue || ''}
          refLabel={params.refLabel || ''}
          refValue={params.refValue || ''}
          onEdit={() => router.back()}
        />

        <TransferSummaryCard
          sendLabel={`${symbol}${money(amount)} ${code}`}
          feeLabel="FREE"
          totalLabel={`${symbol}${money(total)} ${code}`}
          receiveLabel={`${symbol}${money(amount)} ${code}`}
        />

        <SecurityInfoCard />

        <View style={styles.noteBanner}>
          <Ionicons name="information-circle-outline" size={16} color={themeColors.textSecondary} />
          <Text style={styles.noteText}>
            Transfers made after 5:00 PM EST or on weekends may be processed the next business day.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.fixedFooter}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm & Send</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" />
        </TouchableOpacity>
        <View style={styles.termsRow}>
          <Ionicons name="lock-closed" size={10} color={themeColors.textSecondary} />
          <Text style={styles.termsText}>
            By confirming, you agree to our <Text style={styles.termsLink}>Terms & Conditions</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}