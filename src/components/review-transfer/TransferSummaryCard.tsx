import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  sendLabel: string;
  feeLabel: string;
  totalLabel: string;
  receiveLabel: string;
};

export function TransferSummaryCard({ sendLabel, feeLabel, totalLabel, receiveLabel }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Transfer Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>You will send</Text>
        <Text style={styles.value}>{sendLabel}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transfer Fee</Text>
        <Text style={styles.freeValue}>{feeLabel}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Total to be deducted</Text>
        <Text style={styles.value}>{totalLabel}</Text>
      </View>

      <View style={styles.receiveRow}>
        <Text style={styles.receiveLabel}>Recipient will receive</Text>
        <Text style={styles.receiveValue}>{receiveLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 18, padding: 16, overflow: 'hidden' },
  title: { color: colors.textPrimary, fontSize: 13.5, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  label: { color: colors.textSecondary, fontSize: 12 },
  value: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  freeValue: { color: colors.success, fontSize: 12.5, fontWeight: '700' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginVertical: 10 },
  receiveRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    marginHorizontal: -16,
    marginBottom: -16,
    marginTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  receiveLabel: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  receiveValue: { color: colors.success, fontSize: 13.5, fontWeight: '700' },
});