// src/components/gift-cards/GiftSearchBar.tsx
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function GiftSearchBar() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      <View style={[styles.searchBox, { backgroundColor: themeColors.surface }]}>
        <Feather name="search" size={14} color={themeColors.textSecondary} />
        <TextInput
          placeholder="Search for a brand or category"
          placeholderTextColor={themeColors.textSecondary}
          style={[styles.input, { color: themeColors.textPrimary }]}
        />
      </View>
      <TouchableOpacity style={[styles.filterBtn, { borderColor: themeColors.primary }]}>
        <Feather name="sliders" size={13} color={themeColors.primaryLight} />
        <Text style={[styles.filterText, { color: themeColors.primaryLight }]}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10,
  },
  input: { flex: 1, fontSize: 12 },
  filterBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1.2, borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10,
  },
  filterText: { fontSize: 11.5, fontWeight: '600' },
});