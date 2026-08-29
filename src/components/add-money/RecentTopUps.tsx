import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type TopUp = {
  id: string;
  name: string;
  sub: string;
  amount: string;
  status: string;
};

const topUps: TopUp[] = [
  { id: '1', name: 'From Access Bank', sub: 'May 20, 2024  •  09:41 AM', amount: '+ NGN 50,000.00', status: 'Successful' },
  { id: '2', name: 'From Kuda Bank', sub: 'May 17, 2024  •  02:15 PM', amount: '+ NGN 120,000.00', status: 'Successful' },
  { id: '3', name: 'From GTBank', sub: 'May 10, 2024  •  11:02 AM', amount: '+ NGN 25,000.00', status: 'Successful' },
];

export function RecentTopUps() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Recent top-ups</Text>
        {topUps.length > 0 && (
          <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
        )}
      </View>

      {topUps.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No recent top-ups</Text>
        </View>
      ) : (
        <View style={styles.card}>
          {topUps.map((t, index) => (
            <TouchableOpacity
              key={t.id}
              style={[styles.row, index !== topUps.length - 1 && styles.rowDivider]}
            >
              <View style={styles.iconCircle}>
                <Feather name="arrow-down-left" size={16} color="#fff" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{t.name}</Text>
                <Text style={styles.sub}>{t.sub}</Text>
              </View>
              <View style={styles.rightCol}>
                <Text style={styles.amount}>{t.amount}</Text>
                <View style={styles.statusTag}>
                  <Text style={styles.statusText}>{t.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, marginTop: -10 },
  title: { color: colors.textPrimary, fontSize: 15, fontWeight: '600' },
  viewAll: { color: colors.primaryLight, fontSize: 12, fontWeight: '600' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    // marginTop:-,
    paddingVertical: 14,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  iconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1DB954', justifyContent: 'center', alignItems: 'center' },
  name: { color: colors.textPrimary, fontSize: 13, fontWeight: '600' },
  sub: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  amount: { color: colors.success, fontSize: 12, fontWeight: '600' },
  statusTag: { backgroundColor: 'rgba(167,139,250,0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { color: colors.primaryLight, fontSize: 9, fontWeight: '600' },
  textContainer: { flex: 1 },
  rightCol: { alignItems: 'flex-end', gap: 4 },
});