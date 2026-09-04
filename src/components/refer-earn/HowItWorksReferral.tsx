import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function HowItWorksReferral() {
  const { colors: themeColors } = useTheme();

  const STEPS = useMemo(
    () => [
      { icon: <Feather name="user-plus" size={17} color={themeColors.primaryLight} />, num: 1, title: 'Refer', sub: 'Share your unique referral link with your friends.' },
      { icon: <Feather name="user-check" size={17} color={themeColors.primaryLight} />, num: 2, title: 'They Join', sub: 'Your friend signs up using your link and completes KYC.' },
      { icon: <Feather name="gift" size={17} color={themeColors.primaryLight} />, num: 3, title: 'You Earn', sub: 'You earn rewards when they make their first transaction.' },
    ],
    [themeColors]
  );

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>How it works</Text>
      <View style={styles.row}>
        {STEPS.map((s, i) => (
          <View key={s.num} style={styles.step}>
            <View style={styles.iconWrap}>
              <View style={[styles.iconCircle, { backgroundColor: themeColors.primaryTint }]}>{s.icon}</View>
              <View style={[styles.numBadge, { backgroundColor: themeColors.primary, borderColor: themeColors.surface }]}>
                <Text style={styles.numText}>{s.num}</Text>
              </View>
              {i !== STEPS.length - 1 && (
                <View style={[styles.connector, { borderColor: themeColors.border }]} />
              )}
            </View>
            <Text style={[styles.stepTitle, { color: themeColors.textPrimary }]}>{s.title}</Text>
            <Text style={[styles.stepSub, { color: themeColors.textSecondary }]}>{s.sub}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, padding: 16 },
  title: { fontSize: 13.5, fontWeight: '700', marginBottom: 14 },
  row: { flexDirection: 'row' },
  step: { flex: 1, alignItems: 'center', paddingHorizontal: 4 },
  iconWrap: { position: 'relative', marginBottom: 8 },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24,
    justifyContent: 'center', alignItems: 'center',
  },
  numBadge: {
    position: 'absolute', bottom: -3, right: -3,
    width: 18, height: 18, borderRadius: 9,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2,
  },
  numText: { color: '#fff', fontSize: 9.5, fontWeight: '800' },
  connector: {
    position: 'absolute', top: 24, left: '100%', width: 24,
    height: 1, borderTopWidth: 1, borderStyle: 'dashed',
  },
  stepTitle: { fontSize: 11.5, fontWeight: '700', marginBottom: 3 },
  stepSub: { fontSize: 9.5, textAlign: 'center', lineHeight: 13 },
});