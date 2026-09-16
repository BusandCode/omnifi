import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const ICON_SIZE = 15;

export function SecurePaymentsFooter() {
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          flexDirection: 'row', alignItems: 'center', gap: 12,
          backgroundColor: themeColors.surface, borderRadius: 14, padding: 14,
        },
        iconBox: {
          width: 32, height: 32, borderRadius: 16,
          backgroundColor: themeColors.primaryTint,
          justifyContent: 'center', alignItems: 'center',
        },
        title: { color: themeColors.textPrimary, fontSize: 12, fontWeight: '600' },
        sub: { color: themeColors.textSecondary, fontSize: 10, marginTop: 2 },
        textContainer: { flex: 1 },
      }),
    [themeColors]
  );

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="shield" size={ICON_SIZE} color={themeColors.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Secure payments</Text>
        <Text style={styles.sub}>Your payments are protected with bank-level security.</Text>
      </View>
      <Feather name="chevron-right" size={ICON_SIZE + 1} color={themeColors.textSecondary} />
    </TouchableOpacity>
  );
}