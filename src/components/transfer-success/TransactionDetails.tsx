import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Props = {
  amount: number;
  reference: string;
  dateTime: string;
  paymentMethod: string;
};

export function TransactionDetails({ amount, reference, dateTime, paymentMethod }: Props) {
  const fmt = `₦${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const rows = [
    { label: 'Amount sent', value: fmt },
    { label: 'Transfer fee', value: '₦0.00', valueColor: colors.success, info: true },
  ];

  const metaRows = [
    { label: 'Payment method', value: paymentMethod },
    { label: 'Reference', value: reference },
    { label: 'Date & Time', value: dateTime },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Transaction Details</Text>

      {rows.map((r) => (
        <View key={r.label} style={styles.row}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>{r.label}</Text>
            {r.info && <Feather name="info" size={10} color={colors.textSecondary} />}
          </View>
          <Text style={[styles.value, r.valueColor && { color: r.valueColor }]}>{r.value}</Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{fmt}</Text>
      </View>

      <View style={{ marginTop: 2 }}>
        {metaRows.map((r) => (
          <View key={r.label} style={styles.row}>
            <Text style={styles.label}>{r.label}</Text>
            <Text style={styles.metaValue}>{r.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 20 },
  title: { color: colors.textPrimary, fontSize: 12, fontWeight: '600', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  label: { color: colors.textSecondary, fontSize: 10.5 },
  value: { color: colors.textPrimary, fontSize: 10.5, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#2C2C2E', marginVertical: 4 },
  totalLabel: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700' },
  totalValue: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700' },
  metaValue: { color: colors.textSecondary, fontSize: 10.5, fontWeight: '500' },
});