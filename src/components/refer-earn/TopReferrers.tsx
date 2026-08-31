import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Referrer = { rank: number; name: string; badge?: string; amount: string; avatarColor: string; initials: string };

const REFERRERS: Referrer[] = [
  { rank: 1, name: 'Daniel Okafor', badge: 'Top Referrer', amount: '₦256,000', avatarColor: '#F5A623', initials: 'DO' },
];

export function TopReferrers() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Top Referrers</Text>
        <TouchableOpacity><Text style={styles.link}>View Leaderboard</Text></TouchableOpacity>
      </View>

      {REFERRERS.map((r) => (
        <TouchableOpacity key={r.rank} style={styles.row}>
          <View style={styles.rankBadge}>
            <Text style={styles.rankText}>{r.rank}</Text>
          </View>
          <View style={[styles.avatar, { backgroundColor: r.avatarColor }]}>
            <Text style={styles.avatarText}>{r.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{r.name}</Text>
              {r.badge && (
                <View style={styles.badgePill}>
                  <Text style={styles.badgeText}>{r.badge}</Text>
                </View>
              )}
            </View>
          </View>
          <Text style={styles.amount}>{r.amount}</Text>
          <Feather name="chevron-right" size={14} color={colors.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 18, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { color: colors.textPrimary, fontSize: 13.5, fontWeight: '700' },
  link: { color: colors.primaryLight, fontSize: 11, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rankBadge: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#F5A623',
    justifyContent: 'center', alignItems: 'center',
  },
  rankText: { color: '#fff', fontSize: 10.5, fontWeight: '800' },
  avatar: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  name: { color: colors.textPrimary, fontSize: 12, fontWeight: '600' },
  badgePill: { backgroundColor: 'rgba(167,139,250,0.15)', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  badgeText: { color: colors.primaryLight, fontSize: 8.5, fontWeight: '700' },
  amount: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700' },
});
