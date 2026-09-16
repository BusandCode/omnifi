import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../theme/ThemeContext';
import { SpendingCategory } from '../../constants/spendingData';
import { CurrencyCode, getCurrency } from '../../constants/currencies';
import { DonutChart } from './DonutChart';

type Props = {
  categories: SpendingCategory[];
  totalSpent: number;
  currency: CurrencyCode;
};

export function SpendingOverviewCard({ categories, totalSpent, currency }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: { backgroundColor: themeColors.surface, borderRadius: 20, padding: 16 },
  title: { color: themeColors.textPrimary, fontSize: 14, fontWeight: '700', marginBottom: 14 },
  body: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  donutWrap: { width: 140, height: 140, justifyContent: 'center', alignItems: 'center' },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
    width: 90,
  },
  centerLabel: { color: themeColors.textSecondary, fontSize: 10 },
  centerAmount: { color: themeColors.textPrimary, fontSize: 10, fontWeight: '800', marginTop: 2 },
  centerPercent: { color: themeColors.textSecondary, fontSize: 9.5, marginTop: 1 },
  legend: { flex: 1, gap: 10 },
  legendRow: { flexDirection: 'row', alignItems: 'center' },
  legendLeft: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { color: themeColors.textPrimary, fontSize: 10, flexShrink: 1 },
  legendValue: { color: themeColors.textPrimary, fontSize: 9, fontWeight: '600', marginRight: 8 },
  legendPct: { color: themeColors.textSecondary, fontSize: 9, width: 38, textAlign: 'right' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: themeColors.border, marginTop: 14, marginBottom: 10 },
  viewAllRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  viewAllText: { color: themeColors.primaryLight, fontSize: 10, fontWeight: '600' },
}),
    [themeColors]
  );

  const { symbol } = getCurrency(currency);
  const money = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: n % 1 !== 0 ? 2 : 2, maximumFractionDigits: 2 });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Spending Overview</Text>

      <View style={styles.body}>
        <View style={styles.donutWrap}>
          <DonutChart categories={categories} size={140} strokeWidth={22} />
          <View style={styles.donutCenter}>
            <Text style={styles.centerLabel}>Total</Text>
            <Text style={styles.centerAmount} numberOfLines={1} adjustsFontSizeToFit>
              {symbol}{money(totalSpent)}
            </Text>
            <Text style={styles.centerPercent}>100%</Text>
          </View>
        </View>

        <View style={styles.legend}>
          {categories.map((c) => {
            const pct = totalSpent > 0 ? (c.amount / totalSpent) * 100 : 0;
            return (
              <View key={c.key} style={styles.legendRow}>
                <View style={styles.legendLeft}>
                  <View style={[styles.dot, { backgroundColor: c.color }]} />
                  <Text style={styles.legendLabel} numberOfLines={1}>{c.label}</Text>
                </View>
                <Text style={styles.legendValue}>{symbol}{money(c.amount)}</Text>
                <Text style={styles.legendPct}>{pct.toFixed(1)}%</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.viewAllRow} onPress={() => router.push('/transaction-history')}>
        <Text style={styles.viewAllText}>View All Transactions</Text>
        <Feather name="chevron-down" size={14} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

