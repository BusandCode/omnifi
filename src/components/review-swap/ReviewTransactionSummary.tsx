import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function ReviewTransactionSummary() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: { backgroundColor: themeColors.surface, borderRadius: 16, padding: 14 },
  title: { color: themeColors.textPrimary, fontSize: 12, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  feeLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  label: { color: themeColors.textSecondary, fontSize: 11 },
  value: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '600' },
  valuePurple: { color: themeColors.primaryLight, fontSize: 11, fontWeight: '600' },
  feeValue: { color: themeColors.success, fontSize: 11, fontWeight: '600' },
  divider: { height: 1, borderStyle: 'dashed', borderWidth: 0.7, borderColor: '#3A3A3C', marginVertical: 4 },
  totalLabel: { color: themeColors.textPrimary, fontSize: 12, fontWeight: '700' },
  totalValue: { color: themeColors.textPrimary, fontSize: 13, fontWeight: '700' },
}),
    [themeColors]
  );

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
          <Feather name="info" size={10} color={themeColors.textSecondary} />
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

