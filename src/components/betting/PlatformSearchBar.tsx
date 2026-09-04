// src/components/betting/PlatformSearchBar.tsx
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Props = { value: string; onChangeText: (v: string) => void };

export function PlatformSearchBar({ value, onChangeText }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.wrapper, { backgroundColor: themeColors.surface }]}>
      <Feather name="search" size={15} color={themeColors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search betting platform"
        placeholderTextColor={themeColors.textSecondary}
        style={[styles.input, { color: themeColors.textPrimary }]}
      />
      <TouchableOpacity
        style={[styles.gridBtn, { backgroundColor: themeColors.primaryTint }]}
        hitSlop={8}
      >
        <Feather name="grid" size={15} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: { flex: 1, fontSize: 13 },
  gridBtn: {
    width: 28, height: 28, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
});