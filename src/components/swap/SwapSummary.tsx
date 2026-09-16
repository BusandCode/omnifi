import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CurrencyCode } from '../../data/currencies';
import { useTheme } from '../../theme/ThemeContext';
import { router } from 'expo-router';

type Props = {
  sendCurrency: CurrencyCode;
  receiveCurrency: CurrencyCode;
  sendAmount: string;
  receiveAmount: string;
  rate: number;
};

export function SwapSummary({ sendCurrency, receiveCurrency, sendAmount, receiveAmount, rate }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: { backgroundColor: themeColors.surface, borderRadius: 14, padding: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  label: { color: themeColors.textSecondary, fontSize: 10.5 },
  value: { color: themeColors.textPrimary, fontSize: 10.5, fontWeight: '600' },
  fee: { color: themeColors.success, fontSize: 10.5, fontWeight: '600' },
  divider: { height: 1, borderStyle: 'dashed', borderWidth: 0.7, borderColor: themeColors.border, marginVertical: 6 },
  totalLabel: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  totalValue: { color: themeColors.textPrimary, fontSize: 13, fontWeight: '700' },
  cta: { backgroundColor: themeColors.primary, borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  ctaText: { color: '#fff', fontSize: 13.5, fontWeight: '700' },
}),
    [themeColors]
  );

  const sendSymbol = sendCurrency === 'NGN' ? '₦' : sendCurrency === 'USD' ? '$' : '€';
  const receiveSymbol = receiveCurrency === 'NGN' ? '₦' : receiveCurrency === 'USD' ? '$' : '€';

  return (
    <View style={{ gap: 8 }}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>You send</Text>
          <Text style={styles.value}>{sendSymbol}{sendAmount || '0.00'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Exchange rate</Text>
          <Text style={styles.value}>1 {sendCurrency} = {rate.toLocaleString('en-US', { minimumFractionDigits: 2 })} {receiveCurrency}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Transfer fee</Text>
          <Text style={styles.fee}>{receiveSymbol}0.00</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>You receive</Text>
          <Text style={styles.totalValue}>{receiveSymbol}{receiveAmount}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cta} onPress={() => router.push('/review-swap')}>
        <Text style={styles.ctaText}>Review Swap</Text>
      </TouchableOpacity>
    </View>
  );
}