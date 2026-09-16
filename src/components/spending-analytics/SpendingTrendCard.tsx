import {useState, useMemo} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { TrendPoint } from '../../constants/spendingData';
import { TrendLineChart } from './TrendLineChart';

type Props = {
  points: TrendPoint[];
  symbol: string;
};

export function SpendingTrendCard({ points, symbol }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: { backgroundColor: themeColors.surface, borderRadius: 20, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { color: themeColors.textPrimary, fontSize: 14, fontWeight: '700' },
  periodPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  periodText: { color: themeColors.textPrimary, fontSize: 10.5, fontWeight: '600' },
  chartRow: { flexDirection: 'row' },
  yAxis: { justifyContent: 'space-between', paddingRight: 6, paddingBottom: 4 },
  yLabel: { color: themeColors.textSecondary, fontSize: 8.5 },
  xAxisRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, paddingLeft: 34 },
  xLabel: { color: themeColors.textSecondary, fontSize: 8.5 },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  statCard: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 14, padding: 11 },
  statIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  statLabel: { color: themeColors.textSecondary, fontSize: 9 },
  statValue: { color: themeColors.textPrimary, fontSize: 12, fontWeight: '700', marginTop: 2 },
  statDate: { color: themeColors.textSecondary, fontSize: 8.5, marginTop: 1 },
}),
    [themeColors]
  );

  const [chartWidth, setChartWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => setChartWidth(e.nativeEvent.layout.width);

  const highest = points.reduce((max, p) => (p.amount > max.amount ? p : max), points[0]);
  const lowest = points.reduce((min, p) => (p.amount < min.amount ? p : min), points[0]);

  const money = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const maxVal = Math.max(...points.map((p) => p.amount), 1);
  const yLabels = [maxVal, maxVal * 0.75, maxVal * 0.5, maxVal * 0.25, 0];
  const fmtShort = (n: number) => (n >= 1000 ? `${symbol}${Math.round(n / 1000)}K` : `${symbol}${Math.round(n)}`);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Spending Trend</Text>
        <TouchableOpacity style={styles.periodPill}>
          <Text style={styles.periodText}>Daily</Text>
          <Ionicons name="chevron-down" size={12} color={themeColors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.chartRow}>
        <View style={styles.yAxis}>
          {yLabels.map((v, i) => (
            <Text key={i} style={styles.yLabel}>{fmtShort(v)}</Text>
          ))}
        </View>

        <View style={{ flex: 1 }} onLayout={onLayout}>
          {chartWidth > 0 && <TrendLineChart points={points} symbol={symbol} width={chartWidth} />}
        </View>
      </View>

      <View style={styles.xAxisRow}>
        {points
          .filter((_, i) => i % Math.ceil(points.length / 7) === 0)
          .map((p) => (
            <Text key={p.date} style={styles.xLabel}>{p.label}</Text>
          ))}
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: 'rgba(255,59,48,0.08)' }]}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(255,59,48,0.15)' }]}>
            <Feather name="trending-up" size={13} color={themeColors.danger} />
          </View>
          <View>
            <Text style={styles.statLabel}>Highest Spend</Text>
            <Text style={styles.statValue}>{symbol}{money(highest.amount)}</Text>
            <Text style={styles.statDate}>{highest.label} 2026</Text>
          </View>
        </View>

        <View style={[styles.statCard, { backgroundColor: 'rgba(52,199,89,0.08)' }]}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(52,199,89,0.15)' }]}>
            <Feather name="trending-down" size={13} color={themeColors.success} />
          </View>
          <View>
            <Text style={styles.statLabel}>Lowest Spend</Text>
            <Text style={styles.statValue}>{symbol}{money(lowest.amount)}</Text>
            <Text style={styles.statDate}>{lowest.label} 2026</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

