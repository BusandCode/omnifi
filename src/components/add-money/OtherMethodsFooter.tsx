import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function OtherMethodsFooter() {
  return (
    <View>
      <TouchableOpacity style={styles.secureRow}>
        <View style={styles.iconBox}>
          <Ionicons name="shield-checkmark" size={16} color={colors.primaryLight} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.secureTitle}>Your money is safe with us</Text>
          <Text style={styles.secureSub}>All transactions are secured with bank-level encryption.</Text>
        </View>
        <Feather name="chevron-right" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <Text style={styles.terms}>
        <Feather name="lock" size={10} color={colors.textSecondary} />
        {'  '}By proceeding, you agree to our <Text style={styles.link}>Terms & Conditions</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  secureRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface, borderRadius: 16, padding: 14,
  },
  iconBox: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  secureTitle: { color: colors.textPrimary, fontSize: 12, fontWeight: '600' },
  secureSub: { color: colors.textSecondary, fontSize: 10.5, marginTop: 2 },
  terms: { color: colors.textSecondary, fontSize: 10.5, textAlign: 'center', lineHeight: 15, marginTop: 4 },
  link: { color: colors.primaryLight, fontWeight: '600' },
  textContainer: { flex: 1 },
});