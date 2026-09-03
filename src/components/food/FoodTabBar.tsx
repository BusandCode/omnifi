// src/components/food/FoodTabBar.tsx — bottom tab bar, restyled to the cream/red food theme
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Home, Search, ShoppingBag, User } from "lucide-react-native";
import { foodColors } from "../../theme/foodTheme";

type TabKey = "home" | "search" | "orders" | "profile";

const TABS: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "search", label: "Search", icon: Search },
  { key: "orders", label: "Orders", icon: ShoppingBag },
  { key: "profile", label: "Profile", icon: User },
];

export default function FoodTabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const Icon = tab.icon;
        return (
          <Pressable key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
            <Icon color={isActive ? foodColors.red : foodColors.textSecondary} size={20} />
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: foodColors.border,
    backgroundColor: foodColors.surface,
    paddingTop: 8,
    paddingBottom: 6,
  },
  tab: { flex: 1, alignItems: "center", gap: 3 },
  label: { color: foodColors.textSecondary, fontSize: 10, fontWeight: "600" },
  labelActive: { color: foodColors.red },
});
