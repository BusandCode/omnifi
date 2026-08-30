import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../../theme/colors';
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
  return (
    <View style={illStyles.wrap}>
      {CONFETTI.map((c, i) => (
        <View key={i} style={[illStyles.confetti, { left: c.x, top: c.y, backgroundColor: c.color, transform: [{ rotate: c.rotate }] }]} />
      ))}
      <View style={illStyles.glow} />
      <View style={illStyles.circle}>
        <Ionicons name="checkmark" size={40} color="#fff" />
      </View>
    </View>
  );
}

const illStyles = StyleSheet.create({
  wrap: { width: 200, height: 120, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  glow: { position: 'absolute', width: 110, height: 110, borderRadius: 55, backgroundColor: colors.primary, opacity: 0.25 },
  circle: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: colors.primary, shadowOpacity: 0.6, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 8,
  },
  confetti: { position: 'absolute', width: 8, height: 8, borderRadius: 2 },
});

function WalletIllustration() {
  return (
    <View style={walletStyles.wrap}>
      <Svg width={70} height={60} viewBox="0 0 70 60">
        <Path d="M6 20 h48 a6 6 0 0 1 6 6 v26 a6 6 0 0 1 -6 6 h-48 a6 6 0 0 1 -6 -6 v-26 a6 6 0 0 1 6 -6 Z" fill="#7C3AED" />
        <Path d="M6 10 h40 a6 6 0 0 1 6 6 v4 h-52 v-4 a6 6 0 0 1 6 -6 Z" fill="#A78BFA" />
        <Circle cx={48} cy={40} r={6} fill="#4C1D95" />
      </Svg>
      <View style={walletStyles.coinStack}>
        <View style={[walletStyles.coin, { bottom: 0 }]} />
        <View style={[walletStyles.coin, { bottom: 7 }]} />
        <View style={[walletStyles.coin, { bottom: 14 }]} />
      </View>
    </View>
  );
}

const walletStyles = StyleSheet.create({
  wrap: { width: 90, height: 70, position: 'relative' },
  coinStack: { position: 'absolute', right: -6, bottom: 0 },
  coin: {
    position: 'absolute', width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#8B5CF6', borderWidth: 1.5, borderColor: colors.background,
  },
});

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
  const { symbol } = getCurrency(currency);
  const dailyLimit = Math.round(amount / DURATION_DAILY_DIVISOR[duration.key]);

  const alertsLabel = [alert80 && '80%', alert100 && '100%'].filter(Boolean).join(' & ') || 'None';

  return (
    <View style={{ gap: 16 }}>
      <View style={{ alignItems: 'center' }}>
        <SuccessBadge />
        <Text style={styles.successTitle}>Budget Created Successfully! 🎉</Text>
        <Text style={styles.successSub}>You're all set. We'll help you stay on track.</Text>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.heroIcon}>
            <Ionicons name="swap-horizontal" size={16} color="#fff" />
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
            <Ionicons name="notifications" size={14} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextTitle}>Smart Alerts</Text>
            <Text style={styles.nextSub}>You'll get notified when you're close to or reach your budget limit.</Text>
          </View>
        </View>

        <View style={styles.nextRow}>
          <View style={styles.nextIcon}>
            <Feather name="trending-up" size={13} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextTitle}>Real-time Tracking</Text>
            <Text style={styles.nextSub}>We'll track your spending in real-time across all transactions.</Text>
          </View>
        </View>

        <View style={styles.nextRow}>
          <View style={styles.nextIcon}>
            <Feather name="bar-chart-2" size={13} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextTitle}>Helpful Insights</Text>
            <Text style={styles.nextSub}>Get personalized insights and tips to help you save more.</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.miniTrend}>
            {[0.3, 0.5, 0.4, 0.7, 0.55, 0.85, 1].map((h, i) => (
              <View key={i} style={[styles.trendDot, { bottom: 40 * h }]} />
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
  return (
    <View style={[detailStyles.row, divider && detailStyles.rowDivider]}>
      <View style={detailStyles.iconBox}>
        <Ionicons name={icon} size={14} color={colors.primaryLight} />
      </View>
      <Text style={detailStyles.label}>{label}</Text>
      <Text style={detailStyles.value}>{value}</Text>
    </View>
  );
}

const detailStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 },
  rowDivider: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  iconBox: {
    width: 28, height: 28, borderRadius: 9,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  label: { flex: 1, color: colors.textPrimary, fontSize: 11.5, fontWeight: '600' },
  value: { color: colors.primaryLight, fontSize: 11.5, fontWeight: '700' },
});

const styles = StyleSheet.create({
  successTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '700', marginTop: 4, textAlign: 'center' },
  successSub: { color: colors.textSecondary, fontSize: 11.5, marginTop: 4, textAlign: 'center' },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.25)',
  },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroIcon: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  heroCategoryText: { flex: 1, color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  durationPill: { backgroundColor: 'rgba(167,139,250,0.15)', borderRadius: 8, paddingHorizontal: 9, paddingVertical: 4 },
  durationPillText: { color: colors.primaryLight, fontSize: 10, fontWeight: '700' },
  heroBodyRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 12 },
  heroLabel: { color: colors.textSecondary, fontSize: 10.5 },
  heroAmount: { color: colors.textPrimary, fontSize: 22, fontWeight: '800', marginTop: 4 },
  heroSub: { color: colors.textPrimary, fontSize: 12, fontWeight: '600', marginTop: 8 },
  heroSubLabel: { color: colors.textSecondary, fontSize: 9.5, marginTop: 1 },
  sectionTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', marginBottom: 8 },
  detailsCard: { backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 13 },
  nextCard: { backgroundColor: colors.surface, borderRadius: 18, padding: 15, gap: 14 },
  nextRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  nextIcon: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  nextTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700' },
  nextSub: { color: colors.textSecondary, fontSize: 10, marginTop: 2, lineHeight: 14 },
  chartCard: {
    backgroundColor: 'rgba(139,92,246,0.1)',
    borderRadius: 14,
    padding: 14,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 90,
  },
  miniTrend: { position: 'absolute', right: 10, top: 10, width: 60, height: 44 },
  trendDot: { position: 'absolute', width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.primary },
  chartTitle: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700', maxWidth: '65%' },
  chartSub: { color: colors.textSecondary, fontSize: 10, marginTop: 4, maxWidth: '65%', lineHeight: 14 },
  chartHeart: { color: colors.primary, fontSize: 13, marginTop: 6 },
});