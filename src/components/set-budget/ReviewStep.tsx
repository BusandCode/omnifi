import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { BudgetCategory, DurationOption, DURATION_DAILY_DIVISOR } from '../../constants/budgetData';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

function ReviewIllustration() {
  return (
    <View style={illStyles.wrap}>
      <Svg width={52} height={57} viewBox="0 0 64 70">
        <Rect x={8} y={4} width={38} height={54} rx={6} fill="#EDE9FE" />
        <Rect x={20} y={0} width={14} height={8} rx={3} fill={colors.primary} />
        {[16, 26, 36, 46].map((y) => (
          <Path key={y} d={`M14 ${y} L18 ${y + 3} L26 ${y - 5}`} stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        ))}
        {[16, 26, 36, 46].map((y) => (
          <Rect key={`bar-${y}`} x={30} y={y - 1} width={12} height={2.5} rx={1.25} fill="#C4B5FD" />
        ))}
        <Circle cx={44} cy={50} r={16} fill={colors.primary} />
        <Path d="M37 50 L42 55 L52 43" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </Svg>
    </View>
  );
}

const illStyles = StyleSheet.create({ wrap: { width: 58, height: 58, justifyContent: 'center', alignItems: 'center' } });

type Props = {
  currency: CurrencyCode;
  category: BudgetCategory;
  amount: number;
  duration: DurationOption;
  startDateLabel: string;
  alert80: boolean;
  alert100: boolean;
  onToggle80: (v: boolean) => void;
  onToggle100: (v: boolean) => void;
  onCreate: () => void;
  loading: boolean;
};

export function ReviewStep({
  currency,
  category,
  amount,
  duration,
  startDateLabel,
  alert80,
  alert100,
  onToggle80,
  onToggle100,
  onCreate,
  loading,
}: Props) {
  const { symbol } = getCurrency(currency);
  const dailyLimit = Math.round(amount / DURATION_DAILY_DIVISOR[duration.key]);
  const monthlyProjection = Math.round(dailyLimit * 30);

  const bars = [0.6, 0.75, 1, 0.5, 0.65];

  return (
    <View style={{ gap: 13 }}>
      <View style={styles.introCard}>
        <View style={styles.introIcon}>
          <Feather name="clipboard" size={14} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.introTitle}>Review Your Budget</Text>
          <Text style={styles.introSub}>Please review your budget details before you confirm.</Text>
        </View>
        <ReviewIllustration />
      </View>

      <View>
        <Text style={styles.sectionTitle}>Budget Summary</Text>
        <View style={styles.summaryCard}>
          <SummaryRow icon="swap-horizontal" label="Category" sub="What you're budgeting for" value={category.label} />
          <SummaryRow icon="card" label="Budget Amount" sub="Total amount you want to spend" value={`${symbol}${amount.toLocaleString()}.00`} divider />
          <SummaryRow icon="calendar" label="Duration" sub="How long this budget will last" value={duration.label} divider />
          <SummaryRow icon="calendar" label="Start Date" sub="When this budget starts" value={startDateLabel} divider />
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Budget Preview</Text>
        <View style={styles.previewRow}>
          <View style={styles.previewCard}>
            <Text style={styles.previewLabel}>Daily Budget</Text>
            <Text style={styles.previewValue}>{symbol}{dailyLimit.toLocaleString()}</Text>
            <Text style={styles.previewSub}>Daily Limit (Average)</Text>
            <Text style={styles.previewSubValue}>{symbol}{dailyLimit.toLocaleString()} / day</Text>

            <View style={styles.miniChartWrap}>
              <View style={styles.miniChartLine} />
              <View style={styles.miniChartTag}>
                <Text style={styles.miniChartTagText}>{symbol}{Math.round(amount).toLocaleString()}</Text>
              </View>
            </View>
          </View>

          <View style={styles.previewCard}>
            <Text style={styles.previewLabel}>Monthly Projection</Text>
            <Text style={styles.previewValue}>{symbol}{monthlyProjection.toLocaleString()}</Text>
            <Text style={styles.previewSub}>Estimated total for 30 days</Text>

            <View style={styles.barsWrap}>
              {bars.map((h, i) => (
                <View key={i} style={[styles.bar, { height: 28 * h }]} />
              ))}
            </View>
            <View style={styles.barsLabelsRow}>
              {['W1', 'W2', 'W3', 'W4', 'W5'].map((w) => (
                <Text key={w} style={styles.barLabel}>{w}</Text>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.notifyCard}>
        <Text style={styles.notifyTitle}>You'll Be Notified When</Text>

        <View style={styles.notifyRow}>
          <View style={[styles.notifyIcon, { backgroundColor: 'rgba(139,92,246,0.15)' }]}>
            <Ionicons name="notifications" size={12} color={colors.primaryLight} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notifyItemTitle}>80% of your budget is used</Text>
            <Text style={styles.notifyItemSub}>At {symbol}{Math.round(amount * 0.8).toLocaleString()}.00</Text>
          </View>
          <Switch value={alert80} onValueChange={onToggle80} trackColor={{ false: colors.border, true: colors.success }} thumbColor="#fff" />
        </View>

        <View style={styles.notifyRow}>
          <View style={[styles.notifyIcon, { backgroundColor: 'rgba(255,59,48,0.15)' }]}>
            <Ionicons name="notifications" size={12} color={colors.danger} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notifyItemTitle}>100% of your budget is reached</Text>
            <Text style={styles.notifyItemSub}>At {symbol}{amount.toLocaleString()}.00</Text>
          </View>
          <Switch value={alert100} onValueChange={onToggle100} trackColor={{ false: colors.border, true: colors.success }} thumbColor="#fff" />
        </View>
      </View>

      <View style={styles.infoNote}>
        <Ionicons name="information-circle-outline" size={13} color={colors.textSecondary} />
        <Text style={styles.infoText}>
          We'll send you alerts and insights to help you stay on track and avoid overspending.
        </Text>
      </View>

      <TouchableOpacity style={styles.createBtn} onPress={onCreate} disabled={loading}>
        <Ionicons name="shield-checkmark-outline" size={13} color="#fff" />
        <Text style={styles.createText}>{loading ? 'Creating…' : 'Create Budget'}</Text>
        <Ionicons name="chevron-forward" size={14} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

function SummaryRow({
  icon,
  label,
  sub,
  value,
  divider,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub: string;
  value: string;
  divider?: boolean;
}) {
  return (
    <View style={[rowStyles.row, divider && rowStyles.rowDivider]}>
      <View style={rowStyles.iconBox}>
        <Ionicons name={icon} size={13} color={colors.primaryLight} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={rowStyles.label}>{label}</Text>
        <Text style={rowStyles.sub}>{sub}</Text>
      </View>
      <Text style={rowStyles.value}>{value}</Text>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 10 },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  iconBox: {
    width: 28, height: 28, borderRadius: 9,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  label: { color: colors.textPrimary, fontSize: 10, fontWeight: '600' },
  sub: { color: colors.textSecondary, fontSize: 8.5, marginTop: 1 },
  value: { color: colors.primaryLight, fontSize: 10, fontWeight: '700' },
});

const styles = StyleSheet.create({
  introCard: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.25)',
  },
  introIcon: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  introTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  introSub: { color: colors.textSecondary, fontSize: 9.5, marginTop: 3, lineHeight: 13 },
  sectionTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700', marginBottom: 7 },
  summaryCard: { backgroundColor: colors.surface, borderRadius: 14, paddingHorizontal: 11 },
  previewRow: { flexDirection: 'row', gap: 9 },
  previewCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 12, padding: 10 },
  previewLabel: { color: colors.textSecondary, fontSize: 9 },
  previewValue: { color: colors.textPrimary, fontSize: 13, fontWeight: '800', marginTop: 2 },
  previewSub: { color: colors.textSecondary, fontSize: 8, marginTop: 7 },
  previewSubValue: { color: colors.textPrimary, fontSize: 9.5, fontWeight: '600', marginTop: 2 },
  miniChartWrap: { height: 26, marginTop: 9, justifyContent: 'flex-end', position: 'relative' },
  miniChartLine: { height: 2, backgroundColor: colors.primary, borderRadius: 1, opacity: 0.6 },
  miniChartTag: {
    position: 'absolute', top: 0, right: 0,
    backgroundColor: colors.primary, borderRadius: 6,
    paddingHorizontal: 5, paddingVertical: 2,
  },
  miniChartTagText: { color: '#fff', fontSize: 7.5, fontWeight: '700' },
  barsWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 28, marginTop: 9 },
  bar: { flex: 1, backgroundColor: colors.primary, borderRadius: 3 },
  barsLabelsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  barLabel: { color: colors.textSecondary, fontSize: 7.5 },
  notifyCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 12, gap: 10 },
  notifyTitle: { color: colors.textPrimary, fontSize: 11, fontWeight: '700' },
  notifyRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  notifyIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  notifyItemTitle: { color: colors.textPrimary, fontSize: 10, fontWeight: '600' },
  notifyItemSub: { color: colors.textSecondary, fontSize: 8.5, marginTop: 2 },
  infoNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 7,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 10,
  },
  infoText: { flex: 1, color: colors.textSecondary, fontSize: 9.5, lineHeight: 13 },
  createBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
  },
  createText: { color: '#fff', fontSize: 12.5, fontWeight: '700' },
});