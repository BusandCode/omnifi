import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function FiltersRow() {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.pill}>
        <Ionicons name="calendar-outline" size={13} color={colors.textPrimary} />
        <Text style={styles.pillText}>This Year</Text>
        <Feather name="chevron-down" size={12} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.pill}>
        <Ionicons name="person-outline" size={13} color={colors.textPrimary} />
        <Text style={styles.pillText}>All Accounts</Text>
        <Feather name="chevron-down" size={12} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterBtn}>
        <Feather name="sliders" size={13} color={colors.textPrimary} />
        <Text style={styles.pillText}>Filter</Text>
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
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    marginLeft: 'auto',
  },
  pillText: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '600' },
});