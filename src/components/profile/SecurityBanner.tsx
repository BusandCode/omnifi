import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function SecurityBanner() {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2A1858', '#160D33', '#0A0616']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.left}>
        <Text style={styles.label}>Security check</Text>
        <Text style={styles.title}>Your account is secure</Text>
        <Text style={styles.sub}>Last security check was 2 days ago.</Text>

        <TouchableOpacity style={styles.reviewRow}>
          <Text style={styles.reviewText}>Review security</Text>
          <Feather name="chevron-right" size={13} color={colors.primaryLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.shieldWrap}>
        <Ionicons name="shield" size={70} color="rgba(167,139,250,0.9)" />
        <Feather name="check" size={26} color="#fff" style={styles.checkIcon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', borderRadius: 20, padding: 18, overflow: 'hidden' },
  left: { flex: 1 },
  label: { color: colors.primaryLight, fontSize: 11, fontWeight: '600', marginBottom: 8 },
  title: { color: '#fff', fontSize: 15, fontWeight: '700', marginBottom: 4 },
  sub: { color: 'rgba(255,255,255,0.55)', fontSize: 10, marginBottom: 14 },
  reviewRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reviewText: { color: colors.primaryLight, fontSize: 12, fontWeight: '600' },
  shieldWrap: { justifyContent: 'center', alignItems: 'center', width: 80 },
  checkIcon: { position: 'absolute' },
});
