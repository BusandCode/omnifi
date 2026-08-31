import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const STEPS = [
  { icon: <Feather name="user-plus" size={17} color={colors.primaryLight} />, num: 1, title: 'Refer', sub: 'Share your unique referral link with your friends.' },
  { icon: <Feather name="user-check" size={17} color={colors.primaryLight} />, num: 2, title: 'They Join', sub: 'Your friend signs up using your link and completes KYC.' },
  { icon: <Feather name="gift" size={17} color={colors.primaryLight} />, num: 3, title: 'You Earn', sub: 'You earn rewards when they make their first transaction.' },
];

export function HowItWorksReferral() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>How it works</Text>
      <View style={styles.row}>
        {STEPS.map((s, i) => (
          <View key={s.num} style={styles.step}>
            <View style={styles.iconWrap}>
              <View style={styles.iconCircle}>{s.icon}</View>
              <View style={styles.numBadge}>
                <Text style={styles.numText}>{s.num}</Text>
              </View>
              {i !== STEPS.length - 1 && <View style={styles.connector} />}
            </View>
            <Text style={styles.stepTitle}>{s.title}</Text>
            <Text style={styles.stepSub}>{s.sub}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 18, padding: 16 },
  title: { color: colors.textPrimary, fontSize: 13.5, fontWeight: '700', marginBottom: 14 },
  row: { flexDirection: 'row' },
  step: { flex: 1, alignItems: 'center', paddingHorizontal: 4 },
  iconWrap: { position: 'relative', marginBottom: 8 },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  numBadge: {
    position: 'absolute', bottom: -3, right: -3,
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: colors.surface,
  },
  numText: { color: '#fff', fontSize: 9.5, fontWeight: '800' },
  connector: {
    position: 'absolute', top: 24, left: '100%', width: 24,
    height: 1, borderTopWidth: 1, borderStyle: 'dashed', borderColor: colors.border,
  },
  stepTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700', marginBottom: 3 },
  stepSub: { color: colors.textSecondary, fontSize: 9.5, textAlign: 'center', lineHeight: 13 },
});
