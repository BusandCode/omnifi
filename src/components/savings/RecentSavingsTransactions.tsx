import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Txn = { name: string; time: string; amount: string; icon: keyof typeof Feather.glyphMap; bg: string };

const transactions: Txn[] = [
  { name: 'Interest Earned', time: '21 Jul 2026, 09:15 AM', amount: '+ ₦2,350.75', icon: 'arrow-down', bg: 'rgba(52,199,89,0.15)' },
  { name: 'Added to Savings', time: '18 Jul 2026, 02:40 PM', amount: '+ ₦50,000.00', icon: 'arrow-down', bg: 'rgba(167,139,250,0.15)' },
];

export function RecentSavingsTransactions() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity><Text style={styles.viewAll}>See All</Text></TouchableOpacity>
      </View>

      <View style={styles.card}>
        {transactions.map((t, i) => (
          <View key={t.name} style={[styles.row, i !== transactions.length - 1 && styles.divider]}>
            <View style={[styles.iconCircle, { backgroundColor: t.bg }]}>
              <Feather name={t.icon} size={15} color={colors.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{t.name}</Text>
              <Text style={styles.time}>{t.time}</Text>
            </View>
            <Text style={styles.amount}>{t.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  title: { color: colors.textPrimary, fontSize: 15, fontWeight: '600' },
  viewAll: { color: colors.primaryLight, fontSize: 12, fontWeight: '600' },
  card: { backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#2C2C2E' },
  iconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  name: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  time: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  amount: { color: colors.success, fontSize: 12, fontWeight: '600' },
});