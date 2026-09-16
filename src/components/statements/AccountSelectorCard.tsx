// src/components/statements/AccountSelectorCard.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function AccountSelectorCard() {
  const { colors: themeColors } = useTheme();

  return (
    <TouchableOpacity style={[styles.wrapper, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
      <View style={[styles.iconCircle, { backgroundColor: themeColors.primary }]}>
        <Ionicons name="wallet" size={20} color="#fff" />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.label, { color: themeColors.textSecondary }]}>Select Account</Text>
        <View style={styles.accountRow}>
          <Text style={[styles.accountName, { color: themeColors.textPrimary }]}>OmniFi Pay – NGN</Text>
          <Feather name="chevron-down" size={14} color={themeColors.primaryLight} />
        </View>
        <View style={styles.balanceRow}>
          <Text style={styles.flag}>🇳🇬</Text>
          <Text style={[styles.balance, { color: themeColors.textSecondary }]}>₦3,245,678.50</Text>
        </View>
      </View>

      <View style={styles.illustration}>
        <Feather name="file-text" size={30} color="rgba(167,139,250,0.5)" />
        <View style={[styles.downloadBadge, { backgroundColor: themeColors.primary, borderColor: themeColors.surface }]}>
          <Feather name="download" size={11} color="#fff" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: { flex: 1 },
  label: { fontSize: 11 },
  accountRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  accountName: { fontSize: 14.5, fontWeight: '700' },
  balanceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  flag: { fontSize: 12 },
  balance: { fontSize: 12 },
  illustration: {
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
});