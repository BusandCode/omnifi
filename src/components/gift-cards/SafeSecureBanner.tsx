// src/components/gift-cards/SafeSecureBanner.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function SafeSecureBanner() {
  const { colors: themeColors } = useTheme();

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: themeColors.primaryTint, borderColor: themeColors.primary }]}>
      <View style={[styles.iconBox, { backgroundColor: themeColors.primaryTint }]}>
        <Ionicons name="shield-checkmark" size={14} color={themeColors.primaryLight} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Safe. Secure. Instant.</Text>
        <Text style={[styles.sub, { color: themeColors.textSecondary }]}>
          All transactions are 100% secure and your gift cards are delivered instantly.
        </Text>
      </View>
      <Feather name="chevron-right" size={14} color={themeColors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 12, padding: 9, borderWidth: 1, marginTop: -1,
  },
  iconBox: {
    width: 27, height: 27, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 11.5, fontWeight: '600' },
  sub: { fontSize: 9.5, marginTop: 2, lineHeight: 13 },
});