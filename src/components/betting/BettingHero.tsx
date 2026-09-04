// src/components/betting/BettingHero.tsx
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function BettingHero() {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2A1858', '#1A0E42', '#0A0616']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.textCol}>
        <Text style={styles.title}>
          Bet. Fund. <Text style={{ color: colors.primaryLight }}>Win.</Text>
        </Text>
        <Text style={styles.sub}>Quickly fund your favourite{'\n'}betting accounts with ease.</Text>
      </View>

      <View style={styles.illustration}>
        <Ionicons name="football" size={84} color="rgba(167,139,250,0.5)" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    padding: 18,
    overflow: 'hidden',
    minHeight: 130,
    justifyContent: 'center',
  },
  textCol: { maxWidth: '65%' },
  title: { color: '#fff', fontSize: 19, fontWeight: '800', marginBottom: 8 },
  sub: { color: 'rgba(255,255,255,0.75)', fontSize: 12, lineHeight: 17 },
  illustration: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});