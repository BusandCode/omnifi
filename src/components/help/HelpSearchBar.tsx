import { useMemo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function HelpSearchBar() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: themeColors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: themeColors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    color: themeColors.textPrimary,
    fontSize: 13.5,
  },
}),
    [themeColors]
  );

  return (
    <View style={styles.wrapper}>
      <Ionicons name="search" size={18} color={themeColors.textSecondary} />
      <TextInput
        placeholder="Search for help topics..."
        placeholderTextColor={themeColors.textSecondary}
        style={styles.input}
      />
    </View>
  );
}

