import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const confetti = [
  { top: 4, left: 30, color: '#A78BFA', size: 6 },
  { top: 18, left: 230, color: '#34C759', size: 5 },
  { top: 55, left: 20, color: '#F5A623', size: 5 },
  { top: 60, left: 240, color: '#A78BFA', size: 4 },
  { top: 0, left: 130, color: '#34C759', size: 4 },
];

export function SuccessBadge() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.confettiWrap} pointerEvents="none">
        {confetti.map((c, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { top: c.top, left: c.left, backgroundColor: c.color, width: c.size, height: c.size, borderRadius: c.size / 2 },
            ]}
          />
        ))}
      </View>

      <View style={styles.glowRing}>
        <View style={styles.checkCircle}>
          <Feather name="check" size={30} color={colors.success} />
        </View>
      </View>

      <Text style={styles.title}>Transfer Successful</Text>
      <Text style={styles.subtitle}>Your money has been sent</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', paddingVertical: 20 },
  confettiWrap: { position: 'absolute', width: 260, height: 70, top: 0 },
  dot: { position: 'absolute' },
  glowRing: {
    width: 90, height: 90, borderRadius: 50,
    borderWidth: 2.5, borderColor: colors.success,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: colors.success, shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: { width: 0, height: 0 },
    elevation: 6,
    marginBottom: 8,
  },
  checkCircle: {
    width: 60, height: 60, borderRadius: 50, backgroundColor: 'rgba(52,199,89,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
});