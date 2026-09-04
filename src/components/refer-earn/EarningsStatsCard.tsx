import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../theme/ThemeContext';

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
  const { colors: themeColors } = useTheme();
  const fmt = (n: number) => `₦${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  const handleAvailableBalancePress = () => {
    router.push('/balance');
  };

  const handlePendingBalancePress = () => {
    router.push('/balance');
  };

  return (
    <View style={[styles.card, { backgroundColor: themeColors.primaryTint }]}>
      <View style={styles.topRow}>
        <View style={styles.col}>
          <View style={styles.labelRow}>
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>Total Earnings</Text>
            <Ionicons name="help-circle-outline" size={12} color={themeColors.textSecondary} />
          </View>
          <Text style={[styles.bigValue, { color: themeColors.textPrimary }]}>{fmt(totalEarnings)}</Text>
          <Text style={[styles.deltaGreen, { color: themeColors.success }]}>+ {fmt(earningsThisMonth)} this month</Text>
        </View>

        <View style={[styles.vDivider, { backgroundColor: themeColors.border }]} />

        <View style={styles.col}>
          <Text style={[styles.label, { color: themeColors.textSecondary }]}>Successful Referrals</Text>
          <Text style={[styles.bigValue, { color: themeColors.textPrimary }]}>{successfulReferrals}</Text>
          <Text style={styles.deltaBlue}>+ {referralsThisMonth} this month</Text>
        </View>
      </View>

      <View style={[styles.hDivider, { backgroundColor: themeColors.border }]} />

      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.balanceItem}
          onPress={handleAvailableBalancePress}
          activeOpacity={0.7}
        >
          <View style={[styles.iconCircle, { backgroundColor: themeColors.primaryTint }]}>
            <Ionicons name="wallet" size={14} color={themeColors.primaryLight} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.balanceLabel, { color: themeColors.textSecondary }]}>Available Balance</Text>
            <Text style={[styles.balanceValue, { color: themeColors.textPrimary }]}>{fmt(availableBalance)}</Text>
          </View>
          <Feather name="chevron-right" size={14} color={themeColors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.balanceItem}
          onPress={handlePendingBalancePress}
          activeOpacity={0.7}
        >
          <View style={[styles.iconCircle, { backgroundColor: themeColors.primaryTint }]}>
            <Feather name="clock" size={14} color={themeColors.primaryLight} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.labelRow}>
              <Text style={[styles.balanceLabel, { color: themeColors.textSecondary }]}>Pending Balance</Text>
              <Ionicons name="help-circle-outline" size={11} color={themeColors.textSecondary} />
            </View>
            <Text style={[styles.balanceValue, { color: themeColors.textPrimary }]}>{fmt(pendingBalance)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, padding: 16 },
  topRow: { flexDirection: 'row' },
  col: { flex: 1 },
  vDivider: { width: 1, marginHorizontal: 14 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  label: { fontSize: 11 },
  bigValue: { fontSize: 19, fontWeight: '800' },
  deltaGreen: { fontSize: 10, marginTop: 4, fontWeight: '600' },
  deltaBlue: { color: '#60A5FA', fontSize: 10, marginTop: 4, fontWeight: '600' },
  hDivider: { height: StyleSheet.hairlineWidth, marginVertical: 14 },
  bottomRow: { flexDirection: 'row', gap: 14 },
  balanceItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceLabel: { fontSize: 10 },
  balanceValue: { fontSize: 12, fontWeight: '700', marginTop: 2 },
});