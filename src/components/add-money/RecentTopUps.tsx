import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

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
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Recent top-ups</Text>
        {topUps.length > 0 && (
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: themeColors.primaryLight }]}>View all</Text>
          </TouchableOpacity>
        )}
      </View>

      {topUps.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: themeColors.surface }]}>
          <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>No recent top-ups</Text>
        </View>
      ) : (
        <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
          {topUps.map((t, index) => (
            <TouchableOpacity
              key={t.id}
              style={[
                styles.row,
                index !== topUps.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: themeColors.border,
                },
              ]}
            >
              <View style={styles.iconCircle}>
                <Feather name="arrow-down-left" size={16} color="#fff" />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.name, { color: themeColors.textPrimary }]}>{t.name}</Text>
                <Text style={[styles.sub, { color: themeColors.textSecondary }]}>{t.sub}</Text>
              </View>
              <View style={styles.rightCol}>
                <Text style={[styles.amount, { color: themeColors.success }]}>{t.amount}</Text>
                <View style={[styles.statusTag, { backgroundColor: themeColors.primaryTint }]}>
                  <Text style={[styles.statusText, { color: themeColors.primaryLight }]}>{t.status}</Text>
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
  title: { fontSize: 15, fontWeight: '600' },
  viewAll: { fontSize: 12, fontWeight: '600' },
  card: {
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  emptyCard: {
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  iconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1DB954', justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 13, fontWeight: '600' },
  sub: { fontSize: 11, marginTop: 2 },
  amount: { fontSize: 12, fontWeight: '600' },
  statusTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { fontSize: 9, fontWeight: '600' },
  textContainer: { flex: 1 },
  rightCol: { alignItems: 'flex-end', gap: 4 },
});