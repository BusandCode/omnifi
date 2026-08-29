import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function GiftSearchBar() {
  return (
    <View style={styles.row}>
      <View style={styles.searchBox}>
        <Feather name="search" size={14} color={colors.textSecondary} />
        <TextInput
          placeholder="Search for a brand or category"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.filterBtn}>
        <Feather name="sliders" size={13} color={colors.primaryLight} />
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surface, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10,
  },
  input: { flex: 1, color: colors.textPrimary, fontSize: 12 },
  filterBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1.2, borderColor: colors.primary, borderRadius: 12,
    paddingHorizontal: 12, paddingVertical: 10,
  },
  filterText: { color: colors.primaryLight, fontSize: 11.5, fontWeight: '600' },
});