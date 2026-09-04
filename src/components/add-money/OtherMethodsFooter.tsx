import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function OtherMethodsFooter() {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <TouchableOpacity style={[styles.secureRow, { backgroundColor: themeColors.surface }]}>
        <View style={[styles.iconBox, { backgroundColor: themeColors.primaryTint }]}>
          <Ionicons name="shield-checkmark" size={16} color={themeColors.primaryLight} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.secureTitle, { color: themeColors.textPrimary }]}>Your money is safe with us</Text>
          <Text style={[styles.secureSub, { color: themeColors.textSecondary }]}>
            All transactions are secured with bank-level encryption.
          </Text>
        </View>
        <Feather name="chevron-right" size={16} color={themeColors.textSecondary} />
      </TouchableOpacity>

      <Text style={[styles.terms, { color: themeColors.textSecondary }]}>
        <Feather name="lock" size={10} color={themeColors.textSecondary} />
        {'  '}By proceeding, you agree to our{' '}
        <Text style={[styles.link, { color: themeColors.primaryLight }]}>Terms & Conditions</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  secureRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 16, padding: 14,
  },
  iconBox: {
    width: 34, height: 34, borderRadius: 17,
    justifyContent: 'center', alignItems: 'center',
  },
  secureTitle: { fontSize: 12, fontWeight: '600' },
  secureSub: { fontSize: 10.5, marginTop: 2 },
  terms: { fontSize: 10.5, textAlign: 'center', lineHeight: 15, marginTop: 4 },
  link: { fontWeight: '600' },
  textContainer: { flex: 1 },
});