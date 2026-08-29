import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function SecureBanner() {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2A1858', '#160D33', '#0A0616']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Your money is safe with us</Text>
        <Text style={styles.sub}>All transfers are secured with bank-level encryption.</Text>
      </View>
      <View style={styles.lockWrap}>
        <Ionicons name="shield" size={32} color="rgba(167,139,250,0.9)" />
        <Ionicons name="lock-closed" size={13} color="#fff" style={styles.lockIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 10, overflow: 'hidden',
  },
  title: { color: '#fff', fontSize: 11, fontWeight: '700', marginBottom: 2 },
  sub: { color: 'rgba(255,255,255,0.55)', fontSize: 9.5, lineHeight: 13 },
  lockWrap: { width: 44, justifyContent: 'center', alignItems: 'center' },
  lockIcon: { position: 'absolute' },
});