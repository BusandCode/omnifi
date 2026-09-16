import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function SecureSmartBanner() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: themeColors.primaryTint,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: themeColors.primaryTint,
    marginHorizontal: 16,
  },
  iconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: themeColors.primaryTint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '700' },
  sub: { color: themeColors.textSecondary, fontSize: 9.5, marginTop: 2, lineHeight: 13 },
  textContainer: { flex: 1 },
}),
    [themeColors]
  );

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="shield-checkmark" size={13} color={themeColors.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Secure & Smart</Text>
        <Text style={styles.sub}>AI Pay is safe and secure. All payments are protected with bank-level encryption.</Text>
      </View>
    </View>
  );
}