import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function ReviewTransactionSummary() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Transaction summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>You send</Text>
        <Text style={styles.value}>$1,000.00</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Exchange rate</Text>
        <Text style={styles.value}>1 USD = 1,542.35 NGN</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>You receive</Text>
        <Text style={styles.valuePurple}>₦1,542,350.00</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.feeLabelRow}>
          <Text style={styles.label}>Transfer fee</Text>
          <Feather name="info" size={10} color={colors.textSecondary} />
        </View>
        <Text style={styles.feeValue}>$0.00</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>$1,000.00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 14 },
  title: { color: colors.textPrimary, fontSize: 12, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  feeLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  label: { color: colors.textSecondary, fontSize: 11 },
  value: { color: colors.textPrimary, fontSize: 11, fontWeight: '600' },
  valuePurple: { color: colors.primaryLight, fontSize: 11, fontWeight: '600' },
  feeValue: { color: colors.success, fontSize: 11, fontWeight: '600' },
  divider: { height: 1, borderStyle: 'dashed', borderWidth: 0.7, borderColor: '#3A3A3C', marginVertical: 4 },
  totalLabel: { color: colors.textPrimary, fontSize: 12, fontWeight: '700' },
  totalValue: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
});