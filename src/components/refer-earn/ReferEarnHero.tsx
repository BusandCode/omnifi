import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

function GiftIllustration({ themeColors }: { themeColors: ReturnType<typeof useTheme>['colors'] }) {
  return (
    <View style={illStyles.wrap}>
      <View style={[illStyles.envelope, { backgroundColor: themeColors.primary }]}>
        <Ionicons name="person" size={16} color="#fff" />
      </View>
      <View style={illStyles.giftBox}>
        <View style={illStyles.ribbonV} />
        <View style={illStyles.ribbonBow} />
      </View>
      <View style={[illStyles.coin, illStyles.coinLeft, { borderColor: themeColors.background }]}>
        <Text style={illStyles.coinText}>₦</Text>
      </View>
      <View style={[illStyles.coin, illStyles.coinRight, { borderColor: themeColors.background }]}>
        <Text style={illStyles.coinText}>₦</Text>
      </View>
    </View>
  );
}

export function ReferEarnHero() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.textCol}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Refer friends.</Text>
        <Text style={[styles.title, { color: themeColors.primaryLight }]}>Earn rewards.</Text>
        <Text style={[styles.sub, { color: themeColors.textSecondary }]}>
          Invite your friends to Omnifi and earn exciting rewards when they join and transact.
        </Text>
      </View>
      <GiftIllustration themeColors={themeColors} />
    </View>
  );
}

const illStyles = StyleSheet.create({
  wrap: { width: 100, height: 90, position: 'relative' },
  envelope: {
    position: 'absolute', top: 4, left: 4,
    width: 52, height: 40, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    transform: [{ rotate: '-8deg' }],
  },
  giftBox: {
    position: 'absolute', bottom: 14, right: 0,
    width: 58, height: 52, borderRadius: 10,
    backgroundColor: '#6D28D9',
    transform: [{ rotate: '6deg' }],
    overflow: 'hidden',
  },
  ribbonV: {
    position: 'absolute', top: 0, bottom: 0, left: '46%',
    width: 8, backgroundColor: 'rgba(255,255,255,0.6)',
  },
  ribbonBow: {
    position: 'absolute', top: -8, left: '50%', marginLeft: -10,
    width: 20, height: 14, borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  coin: {
    position: 'absolute',
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: '#F5A623',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2,
  },
  coinLeft: { bottom: 0, left: 6 },
  coinRight: { bottom: 6, right: 2 },
  coinText: { color: '#7A4A00', fontSize: 11, fontWeight: '800' },
});

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  textCol: { flex: 1 },
  title: { fontSize: 19, fontWeight: '800', lineHeight: 24 },
  sub: { fontSize: 11.5, lineHeight: 16, marginTop: 8 },
});