import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Reward = { icon: React.ReactNode; iconBg: string; title: string; sub: string; amount: string; amountColor: string };

const REWARDS: Reward[] = [
  {
    icon: <Ionicons name="person" size={13} color="#fff" />,
    iconBg: '#22C55E',
    title: 'When a friend completes KYC',
    sub: 'You earn',
    amount: '₦2,000',
    amountColor: colors.success,
  },
  {
    icon: <Feather name="credit-card" size={13} color="#fff" />,
    iconBg: '#3B82F6',
    title: 'When a friend makes first transaction',
    sub: 'You earn',
    amount: '₦3,000',
    amountColor: '#60A5FA',
  },
];

export function RewardsYouEarn() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Rewards You Earn</Text>
        <TouchableOpacity><Text style={styles.link}>View T&Cs</Text></TouchableOpacity>
      </View>

      {REWARDS.map((r) => (
        <View key={r.title} style={styles.row}>
          <View style={[styles.iconCircle, { backgroundColor: r.iconBg }]}>{r.icon}</View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rewardTitle}>{r.title}</Text>
            <Text style={styles.rewardSub}>{r.sub}</Text>
          </View>
          <Text style={[styles.amount, { color: r.amountColor }]}>{r.amount}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 18, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { color: colors.textPrimary, fontSize: 13.5, fontWeight: '700' },
  link: { color: colors.primaryLight, fontSize: 11, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  iconCircle: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  rewardTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '600' },
  rewardSub: { color: colors.textSecondary, fontSize: 9.5, marginTop: 1 },
  amount: { fontSize: 12.5, fontWeight: '700' },
});
