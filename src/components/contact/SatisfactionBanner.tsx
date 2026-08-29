import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function SatisfactionBanner() {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2A1858', '#160D33', '#0A0616']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.iconBox}>
        <Ionicons name="shield-checkmark-outline" size={18} color="#fff" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Your satisfaction is our priority.</Text>
        <Text style={styles.sub}>
          We're committed to providing you with the best support experience.
        </Text>
      </View>

      <View style={styles.illustration}>
        <Ionicons name="shield-checkmark" size={54} color="rgba(167,139,250,0.7)" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
    padding: 16,
    overflow: 'hidden',
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: { flex: 1 },
  title: { color: '#fff', fontSize: 13, fontWeight: '700', marginBottom: 3 },
  sub: { color: 'rgba(255,255,255,0.65)', fontSize: 10.5, lineHeight: 14 },
  illustration: {
    marginLeft: 4,
  },
});