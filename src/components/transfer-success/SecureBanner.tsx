// src/components/transfer-success/SecureBanner.tsx
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const GRADIENTS = {
  dark: ['#2A1858', '#160D33', '#0A0616'],
  light: ['#EFE9FC', '#E4D9F9', '#D9CCF5'],
};

export function SecureBanner() {
  const { mode } = useTheme();
  const isLight = mode === 'light';

  const textStrong = isLight ? '#2A1858' : '#fff';
  const textMuted = isLight ? 'rgba(42,24,88,0.6)' : 'rgba(255,255,255,0.55)';
  const shieldColor = isLight ? 'rgba(91,58,178,0.7)' : 'rgba(167,139,250,0.9)';
  const lockColor = isLight ? '#2A1858' : '#fff';

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={isLight ? GRADIENTS.light : GRADIENTS.dark}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: textStrong }]}>Your money is safe with us</Text>
        <Text style={[styles.sub, { color: textMuted }]}>All transfers are secured with bank-level encryption.</Text>
      </View>
      <View style={styles.lockWrap}>
        <Ionicons name="shield" size={32} color={shieldColor} />
        <Ionicons name="lock-closed" size={13} color={lockColor} style={styles.lockIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 10, overflow: 'hidden',
  },
  title: { fontSize: 11, fontWeight: '700', marginBottom: 2 },
  sub: { fontSize: 9.5, lineHeight: 13 },
  lockWrap: { width: 44, justifyContent: 'center', alignItems: 'center' },
  lockIcon: { position: 'absolute' },
});