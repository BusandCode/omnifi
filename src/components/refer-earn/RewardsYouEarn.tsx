import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Reward = { icon: React.ReactNode; iconBg: string; title: string; sub: string; amount: string; amountColor: string };

export function RewardsYouEarn() {
  const { colors: themeColors } = useTheme();

  const REWARDS: Reward[] = useMemo(
    () => [
      {
        icon: <Ionicons name="person" size={13} color="#fff" />,
        iconBg: '#22C55E',
        title: 'When a friend completes KYC',
        sub: 'You earn',
        amount: '₦2,000',
        amountColor: themeColors.success,
      },
      {
        icon: <Feather name="credit-card" size={13} color="#fff" />,
        iconBg: '#3B82F6',
        title: 'When a friend makes first transaction',
        sub: 'You earn',
        amount: '₦3,000',
        amountColor: '#60A5FA',
      },
    ],
    [themeColors]
  );

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Rewards You Earn</Text>
        <TouchableOpacity><Text style={[styles.link, { color: themeColors.primaryLight }]}>View T&Cs</Text></TouchableOpacity>
      </View>

      {REWARDS.map((r) => (
        <View key={r.title} style={styles.row}>
          <View style={[styles.iconCircle, { backgroundColor: r.iconBg }]}>{r.icon}</View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.rewardTitle, { color: themeColors.textPrimary }]}>{r.title}</Text>
            <Text style={[styles.rewardSub, { color: themeColors.textSecondary }]}>{r.sub}</Text>
          </View>
          <Text style={[styles.amount, { color: r.amountColor }]}>{r.amount}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 13.5, fontWeight: '700' },
  link: { fontSize: 11, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  iconCircle: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  rewardTitle: { fontSize: 11.5, fontWeight: '600' },
  rewardSub: { fontSize: 9.5, marginTop: 1 },
  amount: { fontSize: 12.5, fontWeight: '700' },
});