// src/components/food/CategoryCard.tsx — pill-style category filter chip
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { foodColors } from "../../theme/foodTheme";

type Category = { key: string; label: string };

export default function CategoryCard({
  category,
  active = false,
  onPress,
}: {
  category: Category;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={[styles.pill, active && styles.pillActive]}
      onPress={onPress}
    >
      <Text style={[styles.label, active && styles.labelActive]}>
        {category.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1,
    borderColor: foodColors.border,
    backgroundColor: foodColors.surface,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: foodColors.pillActiveBg,
    borderColor: foodColors.pillActiveBg,
  },
  label: { color: foodColors.textPrimary, fontSize: 12, fontWeight: "600" },
  labelActive: { color: foodColors.pillActiveText },
});
