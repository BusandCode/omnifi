// SecureSmartBanner.tsx — drop marginBottom, its wrapper now owns bottom spacing
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function SecureSmartBanner() {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="shield-checkmark" size={13} color={colors.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Secure & Smart</Text>
        <Text style={styles.sub}>AI Pay is safe and secure. All payments are protected with bank-level encryption.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: 'rgba(167,139,250,0.08)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.2)',
    marginHorizontal: 16,
  },
  iconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 11, fontWeight: '700' },
  sub: { color: colors.textSecondary, fontSize: 9.5, marginTop: 2, lineHeight: 13 },
  textContainer: { flex: 1 },
});