import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type RequestStatus = 'Pending' | 'Paid' | 'Declined';

type RecentRequest = {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  amount: string;
  status: RequestStatus;
  date: string;
  time: string;
};

const requests: RecentRequest[] = [
  { id: '1', name: 'Adebayo Daniel', initials: 'AD', avatarBg: 'rgba(167,139,250,0.25)', amount: '$50.00', status: 'Pending', date: 'Today', time: '9:20 AM' },
  { id: '2', name: 'Oluwakemi O.', initials: 'OO', avatarBg: 'rgba(52,199,89,0.25)', amount: '$25.00', status: 'Paid', date: 'May 23', time: '3:15 PM' },
  { id: '3', name: 'Michael Johnson', initials: 'MJ', avatarBg: 'rgba(10,132,255,0.25)', amount: '$100.00', status: 'Declined', date: 'May 22', time: '11:05 AM' },
];

const statusColors: Record<RequestStatus, { bg: string; text: string }> = {
  Pending: { bg: 'rgba(255,159,10,0.18)', text: '#FF9F0A' },
  Paid: { bg: 'rgba(52,199,89,0.18)', text: colors.success },
  Declined: { bg: 'rgba(255,59,48,0.18)', text: colors.danger },
};

export function RecentRequestsList() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Requests</Text>
        {requests.length > 0 && (
          <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        )}
      </View>

      {requests.length === 0 ? (
        <View style={styles.emptyCard}>
          <Feather name="inbox" size={26} color={colors.textSecondary} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>No recent requests</Text>
          <Text style={styles.emptySub}>Requests you send will show up here.</Text>
        </View>
      ) : (
        <View style={styles.card}>
          {requests.map((r, index) => {
            const status = statusColors[r.status];
            return (
              <TouchableOpacity
                key={r.id}
                style={[styles.row, index !== requests.length - 1 && styles.rowDivider]}
              >
                <View style={[styles.avatar, { backgroundColor: r.avatarBg }]}>
                  <Text style={styles.avatarText}>{r.initials}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{r.name}</Text>
                  <Text style={styles.sub}>Requested {r.amount}</Text>
                </View>
                <View style={styles.rightCol}>
                  <View style={[styles.statusTag, { backgroundColor: status.bg }]}>
                    <Text style={[styles.statusText, { color: status.text }]}>{r.status}</Text>
                  </View>
                  <Text style={styles.date}>{r.date}</Text>
                  <Text style={styles.time}>{r.time}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  title: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  viewAll: { color: colors.primaryLight, fontSize: 11, fontWeight: '600' },
  card: { backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 12 },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: { marginBottom: 10 },
  emptyText: { color: colors.textPrimary, fontSize: 13.5, fontWeight: '700', textAlign: 'center' },
  emptySub: { color: colors.textSecondary, fontSize: 11, marginTop: 5, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  avatar: {
    width: 38, height: 38, borderRadius: 19,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: colors.textPrimary, fontSize: 12, fontWeight: '700' },
  textContainer: { flex: 1 },
  name: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  sub: { color: colors.textSecondary, fontSize: 10.5, marginTop: 2 },
  rightCol: { alignItems: 'flex-end', gap: 3 },
  statusTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { fontSize: 9.5, fontWeight: '700' },
  date: { color: colors.textSecondary, fontSize: 9.5, marginTop: 1 },
  time: { color: colors.textSecondary, fontSize: 9.5 },
});