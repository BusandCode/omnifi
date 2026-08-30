import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../../theme/colors';

const CONFETTI = [
  { x: 18, y: 26, color: '#8B5CF6', rotate: '15deg', shape: 'diamond' as const },
  { x: 40, y: 10, color: '#22C55E', rotate: '-20deg', shape: 'diamond' as const },
  { x: 168, y: 16, color: '#22C55E', rotate: '10deg', shape: 'diamond' as const },
  { x: 178, y: 44, color: '#F59E0B', rotate: '-10deg', shape: 'rect' as const },
  { x: 26, y: 58, color: '#F59E0B', rotate: '20deg', shape: 'rect' as const },
  { x: 152, y: 62, color: '#6D28D9', rotate: '-15deg', shape: 'diamond' as const },
];

export function SuccessBadge() {
  return (
    <View style={styles.wrap}>
      {CONFETTI.map((c, i) => (
        <View
          key={i}
          style={[
            styles.confetti,
            c.shape === 'rect' && styles.confettiRect,
            { left: c.x, top: c.y, backgroundColor: c.color, transform: [{ rotate: c.rotate }] },
          ]}
        />
      ))}

      <View style={styles.glow} />

      <LinearGradient
        colors={['#A78BFA', '#7C3AED', '#4C1D95']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.circle}
      >
        <Ionicons name="checkmark" size={30} color="#fff" />
      </LinearGradient>

      <Svg width={140} height={26} viewBox="0 0 140 26" style={styles.podium}>
        <Circle cx={70} cy={8} r={64} fill="#3B2170" opacity={0.9} />
        <Circle cx={70} cy={5} r={54} fill="#4C2A94" opacity={0.9} />
        <Circle cx={70} cy={2} r={44} fill="#5B32AD" opacity={0.9} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 200,
    height: 120,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    top: 4,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    opacity: 0.25,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: colors.primary,
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  podium: { marginTop: -4 },
  confetti: { position: 'absolute', width: 7, height: 7, borderRadius: 2 },
  confettiRect: { width: 4, height: 10, borderRadius: 2 },
});