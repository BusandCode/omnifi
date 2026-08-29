import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function InfoBanner() {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="shield-checkmark" size={16} color={colors.primaryLight} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Keep your information up to date</Text>
        <Text style={styles.sub}>This helps us keep your account secure and ensures smooth transactions.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface, borderRadius: 16, padding: 14,
  },
  iconBox: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  sub: { color: colors.textSecondary, fontSize: 10.5, marginTop: 3, lineHeight: 14 },
});