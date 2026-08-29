import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Txn = { name: string; time: string; amount: string; bg: string; icon: React.ReactNode };

const UBER_LOGO: ImageSourcePropType = require('../../../assets/uber.png');
const JUMIA_LOGO: ImageSourcePropType = require('../../../assets/jumia.png');

const transactions: Txn[] = [
  { name: 'Spotify', time: 'Today, 8:21 AM', amount: '- NGN 2,500.00', bg: '#1DB954', icon: <FontAwesome5 name="spotify" size={16} color="#fff" /> },
  { name: 'Uber', time: 'Yesterday, 6:45 PM', amount: '- NGN 3,600.00', bg: '#000', icon: <Image source={UBER_LOGO} style={{ width: 16, height: 16, resizeMode: 'contain' }} /> },
  { name: 'Jumia', time: 'May 18, 12:18 PM', amount: '- NGN 12,900.00', bg: '#F68B1E', icon: <Image source={JUMIA_LOGO} style={{ width: 16, height: 16, resizeMode: 'contain' }} />},
];

export function RecentCardTransactions() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent card transactions</Text>
        <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
      </View>

      {transactions.map((t) => (
        <View key={t.name} style={styles.row}>
          <View style={styles.left}>
            <View style={[styles.iconCircle, { backgroundColor: t.bg }]}>{t.icon}</View>
            <View>
              <Text style={styles.name}>{t.name}</Text>
              <Text style={styles.time}>{t.time}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 4 }}>
            <Text style={styles.amount}>{t.amount}</Text>
            <View style={styles.onlineTag}>
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>
        </View>
      ))}

      {/* <TouchableOpacity style={styles.viewAllRow}>
        <Text style={styles.viewAllText}>View all transactions</Text>
        <Feather name="chevron-right" size={16} color={colors.primaryLight} />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  title: { color: colors.textPrimary, fontSize: 13, fontWeight: '600' },
  viewAll: { color: colors.primaryLight, fontSize: 12, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconCircle: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  name: { color: colors.textPrimary, fontSize: 12, fontWeight: '600' },
  time: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  amount: { color: colors.textPrimary, fontSize: 12, fontWeight: '600' },
  onlineTag: { backgroundColor: '#2C2C2E', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  onlineText: { color: colors.textSecondary, fontSize: 9 },
  // viewAllRow: {
  //   flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  //   paddingTop: 10, marginTop: 4, borderTopWidth: 1, borderTopColor: '#2C2C2E',
  // },
  viewAllText: { color: colors.primaryLight, fontSize: 12, fontWeight: '600' },
});