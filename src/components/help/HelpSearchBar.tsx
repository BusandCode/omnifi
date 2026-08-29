import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function HelpSearchBar() {
  return (
    <View style={styles.wrapper}>
      <Ionicons name="search" size={18} color={colors.textSecondary} />
      <TextInput
        placeholder="Search for help topics..."
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13.5,
  },
});