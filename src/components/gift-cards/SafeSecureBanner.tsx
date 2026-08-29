import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function SafeSecureBanner() {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="shield-checkmark" size={14} color={colors.primaryLight} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Safe. Secure. Instant.</Text>
        <Text style={styles.sub}>All transactions are 100% secure and your gift cards are delivered instantly.</Text>
      </View>
      <Feather name="chevron-right" size={14} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(167,139,250,0.1)', borderRadius: 12, padding: 9,
    borderWidth: 1, borderColor: 'rgba(167,139,250,0.25)',
    marginTop:-1
  },
  iconBox: {
    width: 27, height: 27, borderRadius: 14, backgroundColor: 'rgba(167,139,250,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '600' },
  sub: { color: colors.textSecondary, fontSize: 9.5, marginTop: 2, lineHeight: 13 },
});