// src/components/transfer-success/TransactionDetails.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

type Props = {
  amount: number;
  currency: CurrencyCode;
  reference: string;
  dateTime: string;
  paymentMethod: string;
};

export function TransactionDetails({ amount, currency, reference, dateTime, paymentMethod }: Props) {
  const { colors: themeColors } = useTheme();
  const { symbol } = getCurrency(currency);
  const fmt = `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const feeFmt = `${symbol}0.00`;

  const rows = [
    { label: 'Amount sent', value: fmt },
    { label: 'Transfer fee', value: feeFmt, valueColor: themeColors.success, info: true },
  ];

  const metaRows = [
    { label: 'Payment method', value: paymentMethod },
    { label: 'Reference', value: reference },
    { label: 'Date & Time', value: dateTime },
  ];

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>Transaction Details</Text>

      {rows.map((r) => (
        <View key={r.label} style={styles.row}>
          <View style={styles.labelRow}>
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>{r.label}</Text>
            {r.info && <Feather name="info" size={10} color={themeColors.textSecondary} />}
          </View>
          <Text style={[styles.value, { color: themeColors.textPrimary }, r.valueColor && { color: r.valueColor }]}>{r.value}</Text>
        </View>
      ))}

      <View style={[styles.divider, { backgroundColor: themeColors.border }]} />

      <View style={styles.row}>
        <Text style={[styles.totalLabel, { color: themeColors.textPrimary }]}>Total</Text>
        <Text style={[styles.totalValue, { color: themeColors.textPrimary }]}>{fmt}</Text>
      </View>

      <View style={{ marginTop: 2 }}>
        {metaRows.map((r) => (
          <View key={r.label} style={styles.row}>
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>{r.label}</Text>
            <Text style={[styles.metaValue, { color: themeColors.textSecondary }]}>{r.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 20 },
  title: { fontSize: 12, fontWeight: '600', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  label: { fontSize: 10.5 },
  value: { fontSize: 10.5, fontWeight: '600' },
  divider: { height: 1, marginVertical: 4 },
  totalLabel: { fontSize: 11.5, fontWeight: '700' },
  totalValue: { fontSize: 11.5, fontWeight: '700' },
  metaValue: { fontSize: 10.5, fontWeight: '500' },
});