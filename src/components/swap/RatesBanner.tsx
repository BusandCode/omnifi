import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function RatesBanner() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: themeColors.surface, borderRadius: 14, padding: 11,
    borderWidth: 1, borderColor: themeColors.primaryTint,
  },
  iconBox: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: themeColors.primaryTint,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '700' },
  sub: { color: themeColors.textSecondary, fontSize: 9, marginTop: 2 },
  coins: { width: 54, height: 36, position: 'relative' },
  coin: { position: 'absolute', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  nairaCoin: { backgroundColor: '#5A3FD9', bottom: 0, left: 0 },
  dollarCoin: { backgroundColor: '#7C4FE0', bottom: 4, left: 16, width: 26, height: 26, borderRadius: 13 },
  euroCoin: { backgroundColor: '#3D9CFF', top: 0, right: 0, width: 18, height: 18, borderRadius: 9 },
  coinText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  coinTextSmall: { color: '#fff', fontSize: 9, fontWeight: '800' },
}),
    [themeColors]
  );

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="refresh-cw" size={14} color={themeColors.primaryLight} />
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