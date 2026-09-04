import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function SecurityFooter() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <View style={[styles.iconBox, { backgroundColor: themeColors.primaryTint }]}>
        <Ionicons name="shield-checkmark" size={16} color={themeColors.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Your money is secure</Text>
        <Text style={[styles.sub, { color: themeColors.textSecondary }]}>
          All transactions are protected with bank-level security.
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
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 12, fontWeight: '600' },
  sub: { fontSize: 10.5, marginTop: 2 },
  textContainer: { flex: 1 },
});