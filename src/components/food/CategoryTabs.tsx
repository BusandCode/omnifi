// src/components/food/CategoryTabs.tsx
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { foodColors } from '../../constants/foodColors';
import { FoodCategory, categories } from '../../constants/foodData';

export function CategoryTabs({
  active,
  onSelect,
}: {
  active: FoodCategory;
  onSelect: (c: FoodCategory) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {categories.map((c) => {
        const isActive = c === active;
        return (
          <TouchableOpacity
            key={c}
            onPress={() => onSelect(c)}
            style={[styles.pill, isActive ? styles.pillActive : styles.pillInactive]}
          >
            <Text style={[styles.pillText, isActive ? styles.pillTextActive : styles.pillTextInactive]}>
              {c}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingRight: 20 },
  pill: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, borderWidth: 1 },
  pillActive: { backgroundColor: foodColors.primaryDark, borderColor: foodColors.primaryDark },
  pillInactive: { backgroundColor: foodColors.surface, borderColor: foodColors.border },
  pillText: { fontSize: 12.5, fontWeight: '600' },
  pillTextActive: { color: '#fff' },
  pillTextInactive: { color: foodColors.textSecondary },
});