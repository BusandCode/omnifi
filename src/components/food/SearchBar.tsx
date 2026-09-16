// src/components/food/SearchBar.tsx
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { foodColors } from '../../constants/foodColors';

export function SearchBar({
  value,
  onChangeText,
}: {
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  return (
    <View style={styles.wrapper}>
      <Feather name="search" size={16} color={foodColors.textMuted} />
      <TextInput
        style={styles.input}
        placeholder="Search meals, restaurants, bukas..."
        placeholderTextColor={foodColors.textMuted}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: foodColors.surface, borderRadius: 14, paddingHorizontal: 14, height: 46,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  input: { flex: 1, fontSize: 13, color: foodColors.textPrimary },
});