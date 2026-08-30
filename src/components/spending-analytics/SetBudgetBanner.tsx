import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../../theme/colors';

function TargetIllustration() {
  return (
    <View style={illStyles.wrap}>
      <Svg width={48} height={48} viewBox="0 0 48 48">
        <Circle cx={22} cy={26} r={18} fill="rgba(167,139,250,0.15)" stroke={colors.primaryLight} strokeWidth={1.5} />
        <Circle cx={22} cy={26} r={11} fill="rgba(167,139,250,0.15)" stroke={colors.primaryLight} strokeWidth={1.5} />
        <Circle cx={22} cy={26} r={4} fill={colors.primary} />
        <Path d="M38 8 L22 26" stroke={colors.primaryLight} strokeWidth={2} strokeLinecap="round" />
        <Path d="M38 8 L30 8 M38 8 L38 16" stroke={colors.primaryLight} strokeWidth={2} strokeLinecap="round" />
      </Svg>
      <View style={illStyles.coinStack}>
        <View style={[illStyles.coin, { bottom: 0, left: 0 }]} />
        <View style={[illStyles.coin, { bottom: 5, left: 3 }]} />
      </View>
    </View>
  );
}

export function SetBudgetBanner() {
  return (
    <View style={styles.card}>
      <TargetIllustration />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Set a Spending Limit</Text>
        <Text style={styles.sub}>Create budget limits for categories and stay on track.</Text>
      </View>
      <TouchableOpacity style={styles.cta} onPress={() => router.push('/set-budget')}>
        <Text style={styles.ctaText}>Set Budget</Text>
      </TouchableOpacity>
    </View>
  );
}

const illStyles = StyleSheet.create({
  wrap: { width: 56, height: 56, justifyContent: 'center', alignItems: 'center' },
  coinStack: { position: 'absolute', left: -2, bottom: -2 },
  coin: {
    position: 'absolute',
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#8B5CF6',
    borderWidth: 1.5, borderColor: colors.surface,
  },
});

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
  },
  title: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  sub: { color: colors.textSecondary, fontSize: 10.5, marginTop: 3, lineHeight: 14 },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  ctaText: { color: '#fff', fontSize: 11.5, fontWeight: '700' },
});