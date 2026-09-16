import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function SpendingAnalyticsHeader() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: themeColors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { flex: 1, color: themeColors.textPrimary, fontSize: 16.5, fontWeight: '700', textAlign: 'center' },
}),
    [themeColors]
  );

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Spending Analytics</Text>
      <TouchableOpacity style={styles.iconBtn}>
        <Feather name="calendar" size={17} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

