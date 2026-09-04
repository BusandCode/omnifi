import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function InfoBanner() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <View style={[styles.iconBox, { backgroundColor: themeColors.primaryTint }]}>
        <Ionicons name="shield-checkmark" size={16} color={themeColors.primaryLight} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Keep your information up to date
        </Text>
        <Text style={[styles.sub, { color: themeColors.textSecondary }]}>
          This helps us keep your account secure and ensures smooth transactions.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 16, padding: 14,
  },
  iconBox: {
    width: 34, height: 34, borderRadius: 17,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 12.5, fontWeight: '700' },
  sub: { fontSize: 10.5, marginTop: 3, lineHeight: 14 },
});