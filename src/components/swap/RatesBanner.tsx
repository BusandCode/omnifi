import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function RatesBanner() {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="refresh-cw" size={14} color={colors.primaryLight} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Best Rates. Zero Hidden Fees.</Text>
        <Text style={styles.sub}>Get real-time exchange rates with no extra charges.</Text>
      </View>
      <View style={styles.coins}>
        <View style={[styles.coin, styles.nairaCoin]}><Text style={styles.coinText}>₦</Text></View>
        <View style={[styles.coin, styles.dollarCoin]}><Text style={styles.coinText}>$</Text></View>
        <View style={[styles.coin, styles.euroCoin]}><Text style={styles.coinTextSmall}>€</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#1A1225', borderRadius: 14, padding: 11,
    borderWidth: 1, borderColor: 'rgba(167,139,250,0.2)',
  },
  iconBox: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 11, fontWeight: '700' },
  sub: { color: colors.textSecondary, fontSize: 9, marginTop: 2 },
  coins: { width: 54, height: 36, position: 'relative' },
  coin: { position: 'absolute', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  nairaCoin: { backgroundColor: '#5A3FD9', bottom: 0, left: 0 },
  dollarCoin: { backgroundColor: '#7C4FE0', bottom: 4, left: 16, width: 26, height: 26, borderRadius: 13 },
  euroCoin: { backgroundColor: '#3D9CFF', top: 0, right: 0, width: 18, height: 18, borderRadius: 9 },
  coinText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  coinTextSmall: { color: '#fff', fontSize: 9, fontWeight: '800' },
});