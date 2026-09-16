// src/components/statements/FiltersRow.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function FiltersRow() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      <TouchableOpacity style={[styles.pill, { borderColor: themeColors.border }]}>
        <Ionicons name="calendar-outline" size={13} color={themeColors.textPrimary} />
        <Text style={[styles.pillText, { color: themeColors.textPrimary }]}>This Year</Text>
        <Feather name="chevron-down" size={12} color={themeColors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.pill, { borderColor: themeColors.border }]}>
        <Ionicons name="person-outline" size={13} color={themeColors.textPrimary} />
        <Text style={[styles.pillText, { color: themeColors.textPrimary }]}>All Accounts</Text>
        <Feather name="chevron-down" size={12} color={themeColors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.filterBtn, { borderColor: themeColors.border }]}>
        <Feather name="sliders" size={13} color={themeColors.textPrimary} />
        <Text style={[styles.pillText, { color: themeColors.textPrimary }]}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    marginLeft: 'auto',
  },
  pillText: { fontSize: 11.5, fontWeight: '600' },
});