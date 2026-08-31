import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Props = {
  totalEarnings: number;
  earningsThisMonth: number;
  successfulReferrals: number;
  referralsThisMonth: number;
  availableBalance: number;
  pendingBalance: number;
};

export function EarningsStatsCard({
  totalEarnings,
  earningsThisMonth,
  successfulReferrals,
  referralsThisMonth,
  availableBalance,
  pendingBalance,
}: Props) {
  const fmt = (n: number) => `₦${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.col}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Total Earnings</Text>
            <Ionicons name="help-circle-outline" size={12} color={colors.textSecondary} />
          </View>
          <Text style={styles.bigValue}>{fmt(totalEarnings)}</Text>
          <Text style={styles.deltaGreen}>+ {fmt(earningsThisMonth)} this month</Text>
        </View>

        <View style={styles.vDivider} />

        <View style={styles.col}>
          <Text style={styles.label}>Successful Referrals</Text>
          <Text style={styles.bigValue}>{successfulReferrals}</Text>
          <Text style={styles.deltaBlue}>+ {referralsThisMonth} this month</Text>
        </View>
      </View>

      <View style={styles.hDivider} />

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.balanceItem}>
          <View style={styles.iconCircle}>
            <Ionicons name="wallet" size={14} color={colors.primaryLight} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceValue}>{fmt(availableBalance)}</Text>
          </View>
          <Feather name="chevron-right" size={14} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.balanceItem}>
          <View style={styles.iconCircle}>
            <Feather name="clock" size={14} color={colors.primaryLight} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.labelRow}>
              <Text style={styles.balanceLabel}>Pending Balance</Text>
              <Ionicons name="help-circle-outline" size={11} color={colors.textSecondary} />
            </View>
            <Text style={styles.balanceValue}>{fmt(pendingBalance)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'rgba(167,139,250,0.08)', borderRadius: 18, padding: 16 },
  topRow: { flexDirection: 'row' },
  col: { flex: 1 },
  vDivider: { width: 1, backgroundColor: colors.border, marginHorizontal: 14 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  label: { color: colors.textSecondary, fontSize: 11 },
  bigValue: { color: colors.textPrimary, fontSize: 19, fontWeight: '800' },
  deltaGreen: { color: colors.success, fontSize: 10, marginTop: 4, fontWeight: '600' },
  deltaBlue: { color: '#60A5FA', fontSize: 10, marginTop: 4, fontWeight: '600' },
  hDivider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginVertical: 14 },
  bottomRow: { flexDirection: 'row', gap: 14 },
  balanceItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconCircle: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  balanceLabel: { color: colors.textSecondary, fontSize: 10 },
  balanceValue: { color: colors.textPrimary, fontSize: 12, fontWeight: '700', marginTop: 2 },
});
