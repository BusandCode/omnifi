import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function HistoryHeader() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 1.2, borderColor: themeColors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: themeColors.textPrimary, fontSize: 17, fontWeight: '700' },
}),
    [themeColors]
  );

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Transaction History</Text>
      <TouchableOpacity style={styles.iconBtn} hitSlop={8}>
        <Feather name="filter" size={16} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

