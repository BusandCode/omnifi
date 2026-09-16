import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  onBack: () => void;
  canGoBack: boolean;
};

export function SetBudgetHeader({ onBack, canGoBack }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: themeColors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  closeBtn: { borderWidth: 1.2, borderColor: themeColors.primary, backgroundColor: 'transparent' },
  title: { flex: 1, color: themeColors.textPrimary, fontSize: 15, fontWeight: '700', textAlign: 'center' },
}),
    [themeColors]
  );

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onBack} style={styles.iconBtn} hitSlop={8} disabled={!canGoBack}>
        <Ionicons name="chevron-back" size={18} color={canGoBack ? themeColors.textPrimary : themeColors.textSecondary} />
      </TouchableOpacity>
      <Text style={styles.title}>Set Budget</Text>
      <TouchableOpacity onPress={() => router.back()} style={[styles.iconBtn, styles.closeBtn]} hitSlop={8}>
        <Ionicons name="close" size={16} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

