import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { BudgetCategory, DurationOption, DURATION_DAILY_DIVISOR } from '../../constants/budgetData';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

const CONFETTI = [
  { x: 30, y: 30, color: '#22C55E', rotate: '20deg' },
  { x: 260, y: 24, color: '#F59E0B', rotate: '-15deg' },
  { x: 40, y: 90, color: '#8B5CF6', rotate: '10deg' },
  { x: 270, y: 80, color: '#3B82F6', rotate: '-10deg' },
  { x: 90, y: 10, color: '#EC4899', rotate: '15deg' },
];

function SuccessBadge() {
  const { colors: themeColors } = useTheme();
  const illStyles = useMemo(
    () =>
      StyleSheet.create({
        wrap: { width: 170, height: 102, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', position: 'relative' },
        glow: { position: 'absolute', width: 94, height: 94, borderRadius: 47, backgroundColor: themeColors.primary, opacity: 0.25 },
        circle: {
          width: 75, height: 75, borderRadius: 37.5,
          backgroundColor: themeColors.primary,
          justifyContent: 'center', alignItems: 'center',
          shadowColor: themeColors.primary, shadowOpacity: 0.6, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 8,
        },
        confetti: { position: 'absolute', width: 7, height: 7, borderRadius: 2 },
      }),
    [themeColors]
  );

  return (
    <View style={illStyles.wrap}>
      {CONFETTI.map((c, i) => (
        <View key={i} style={[illStyles.confetti, { left: c.x, top: c.y, backgroundColor: c.color, transform: [{ rotate: c.rotate }] }]} />
      ))}
      <View style={illStyles.glow} />
      <View style={illStyles.circle}>
        <Ionicons name="checkmark" size={34} color="#fff" />
      </View>
    </View>
  );
}

function WalletIllustration() {
  const { colors: themeColors } = useTheme();
  const walletStyles = useMemo(
    () =>
      StyleSheet.create({
        wrap: { width: 76, height: 60, position: 'relative' },
        coinStack: { position: 'absolute', right: -5, bottom: 0 },
        coin: {
          position: 'absolute', width: 19, height: 19, borderRadius: 9.5,
          backgroundColor: '#8B5CF6', borderWidth: 1.5, borderColor: themeColors.background,
        },
      }),
    [themeColors]
  );

  return (
    <View style={walletStyles.wrap}>
      <Svg width={60} height={51} viewBox="0 0 70 60">
        <Path d="M6 20 h48 a6 6 0 0 1 6 6 v26 a6 6 0 0 1 -6 6 h-48 a6 6 0 0 1 -6 -6 v-26 a6 6 0 0 1 6 -6 Z" fill="#7C3AED" />
        <Path d="M6 10 h40 a6 6 0 0 1 6 6 v4 h-52 v-4 a6 6 0 0 1 6 -6 Z" fill="#A78BFA" />
        <Circle cx={48} cy={40} r={6} fill="#4C1D95" />
      </Svg>
      <View style={walletStyles.coinStack}>
        <View style={[walletStyles.coin, { bottom: 0 }]} />
        <View style={[walletStyles.coin, { bottom: 6 }]} />
        <View style={[walletStyles.coin, { bottom: 12 }]} />
      </View>
    </View>
  );
}

type Props = {
  currency: CurrencyCode;
  category: BudgetCategory;
  amount: number;
  duration: DurationOption;
  startDateLabel: string;
  alert80: boolean;
  alert100: boolean;
};

export function BudgetCreatedContent({ currency, category, amount, duration, startDateLabel, alert80, alert100 }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        successTitle: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '700', marginTop: 3, textAlign: 'center' },
        successSub: { color: themeColors.textSecondary, fontSize: 10, marginTop: 3, textAlign: 'center' },
        heroCard: {
          backgroundColor: themeColors.surface,
          borderRadius: 16,
          padding: 13,
          borderWidth: 1,
          borderColor: 'rgba(139,92,246,0.25)',
        },
        heroTopRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
        heroIcon: {
          width: 28, height: 28, borderRadius: 14,
          backgroundColor: themeColors.primary,
          justifyContent: 'center', alignItems: 'center',
        },
        heroCategoryText: { flex: 1, color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '700' },
        durationPill: { backgroundColor: 'rgba(167,139,250,0.15)', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 3 },
        durationPillText: { color: themeColors.primaryLight, fontSize: 9, fontWeight: '700' },
        heroBodyRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 },
        heroLabel: { color: themeColors.textSecondary, fontSize: 9.5 },
        heroAmount: { color: themeColors.textPrimary, fontSize: 19, fontWeight: '800', marginTop: 3 },
        heroSub: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '600', marginTop: 7 },
        heroSubLabel: { color: themeColors.textSecondary, fontSize: 8.5, marginTop: 1 },
        sectionTitle: { color: themeColors.textPrimary, fontSize: 11.5, fontWeight: '700', marginBottom: 7 },
        detailsCard: { backgroundColor: themeColors.surface, borderRadius: 14, paddingHorizontal: 11 },
        nextCard: { backgroundColor: themeColors.surface, borderRadius: 16, padding: 13, gap: 12 },
        nextRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
        nextIcon: {
          width: 26, height: 26, borderRadius: 13,
          backgroundColor: themeColors.primary,
          justifyContent: 'center', alignItems: 'center',
        },
        nextTitle: { color: themeColors.textPrimary, fontSize: 10.5, fontWeight: '700' },
        nextSub: { color: themeColors.textSecondary, fontSize: 9, marginTop: 2, lineHeight: 13 },
        chartCard: {
          backgroundColor: 'rgba(139,92,246,0.1)',
          borderRadius: 12,
          padding: 12,
          position: 'relative',
          overflow: 'hidden',
          minHeight: 78,
        },
        miniTrend: { position: 'absolute', right: 9, top: 9, width: 52, height: 38 },
        trendDot: { position: 'absolute', width: 4.5, height: 4.5, borderRadius: 2.25, backgroundColor: themeColors.primary },
        chartTitle: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '700', maxWidth: '65%' },
        chartSub: { color: themeColors.textSecondary, fontSize: 9, marginTop: 3, maxWidth: '65%', lineHeight: 13 },
        chartHeart: { color: themeColors.primary, fontSize: 11, marginTop: 5 },
      }),
    [themeColors]
  );

  const { symbol } = getCurrency(currency);
  const dailyLimit = Math.round(amount / DURATION_DAILY_DIVISOR[duration.key]);

  const alertsLabel = [alert80 && '80%', alert100 && '100%'].filter(Boolean).join(' & ') || 'None';

  return (
    <View style={{ gap: 13 }}>
      <View style={{ alignItems: 'center' }}>
        <SuccessBadge />
        <Text style={styles.successTitle}>Budget Created Successfully! 🎉</Text>
        <Text style={styles.successSub}>You're all set. We'll help you stay on track.</Text>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.heroIcon}>
            <Ionicons name="swap-horizontal" size={14} color="#fff" />
          </View>
          <Text style={styles.heroCategoryText}>{category.label}</Text>
          <View style={styles.durationPill}>
            <Text style={styles.durationPillText}>{duration.label}</Text>
          </View>
        </View>

        <View style={styles.heroBodyRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroLabel}>Daily Budget</Text>
            <Text style={styles.heroAmount}>{symbol}{amount.toLocaleString()}.00</Text>
            <Text style={styles.heroSub}>{symbol}{dailyLimit.toLocaleString()}.00 / day</Text>
            <Text style={styles.heroSubLabel}>Daily Limit (Average)</Text>
          </View>
          <WalletIllustration />
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Budget Details</Text>
        <View style={styles.detailsCard}>
          <DetailRow icon="swap-horizontal" label="Category" value={category.label} />
          <DetailRow icon="card" label="Budget Amount" value={`${symbol}${amount.toLocaleString()}.00`} divider />
          <DetailRow icon="calendar" label="Duration" value={duration.label} divider />
          <DetailRow icon="calendar" label="Start Date" value={startDateLabel} divider />
          <DetailRow icon="notifications" label="Alerts" value={alertsLabel} divider />
        </View>
      </View>

      <View style={styles.nextCard}>
        <View style={styles.nextRow}>
          <View style={styles.nextIcon}>
            <Ionicons name="notifications" size={12} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextTitle}>Smart Alerts</Text>
            <Text style={styles.nextSub}>You'll get notified when you're close to or reach your budget limit.</Text>
          </View>
        </View>

        <View style={styles.nextRow}>
          <View style={styles.nextIcon}>
            <Feather name="trending-up" size={11} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextTitle}>Real-time Tracking</Text>
            <Text style={styles.nextSub}>We'll track your spending in real-time across all transactions.</Text>
          </View>
        </View>

        <View style={styles.nextRow}>
          <View style={styles.nextIcon}>
            <Feather name="bar-chart-2" size={11} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextTitle}>Helpful Insights</Text>
            <Text style={styles.nextSub}>Get personalized insights and tips to help you save more.</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.miniTrend}>
            {[0.3, 0.5, 0.4, 0.7, 0.55, 0.85, 1].map((h, i) => (
              <View key={i} style={[styles.trendDot, { bottom: 34 * h }]} />
            ))}
          </View>
          <Text style={styles.chartTitle}>You're in control!</Text>
          <Text style={styles.chartSub}>Let's build better spending habits together.</Text>
          <Text style={styles.chartHeart}>♥</Text>
        </View>
      </View>
    </View>
  );
}

function DetailRow({ icon, label, value, divider }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string; divider?: boolean }) {
  const { colors: themeColors } = useTheme();
  const detailStyles = useMemo(
    () =>
      StyleSheet.create({
        row: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 10 },
        rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: themeColors.border },
        iconBox: {
          width: 24, height: 24, borderRadius: 8,
          backgroundColor: 'rgba(167,139,250,0.15)',
          justifyContent: 'center', alignItems: 'center',
        },
        label: { flex: 1, color: themeColors.textPrimary, fontSize: 10, fontWeight: '600' },
        value: { color: themeColors.primaryLight, fontSize: 10, fontWeight: '700' },
      }),
    [themeColors]
  );

  return (
    <View style={[detailStyles.row, divider && detailStyles.rowDivider]}>
      <View style={detailStyles.iconBox}>
        <Ionicons name={icon} size={12} color={themeColors.primaryLight} />
      </View>
      <Text style={detailStyles.label}>{label}</Text>
      <Text style={detailStyles.value}>{value}</Text>
    </View>
  );
}