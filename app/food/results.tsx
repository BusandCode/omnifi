// app/food/results.tsx — restaurant search results list
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, ChevronDown, Search, SlidersHorizontal } from "lucide-react-native";
import FoodTabBar from "../../src/components/food/FoodTabBar";
import RestaurantCard from "../../src/components/food/RestaurantCard";
import { NEARBY_RESTAURANTS } from "../../src/config/foodMockData";
import { colors } from "../../src/theme/colors";

const FILTERS = ["Sort: Recommended", "Rating", "Delivery time", "Price"];

export default function FoodResultsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={10}>
          <ChevronLeft color={colors.primary} size={20} />
          <Text style={styles.backLabel}>Food</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchBar}>
          <Search color={colors.textSecondary} size={16} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants or dishes"
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <Pressable
                key={filter}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterLabel, isActive && styles.filterLabelActive]}>
                  {filter}
                </Text>
                <ChevronDown color={isActive ? colors.primary : colors.textSecondary} size={12} />
              </Pressable>
            );
          })}
          <Pressable style={styles.filterIconBtn}>
            <SlidersHorizontal color={colors.textSecondary} size={14} />
          </Pressable>
        </ScrollView>

        <View style={styles.resultsHeaderRow}>
          <Text style={styles.resultsTitle}>Restaurants near you</Text>
          <Text style={styles.resultsCount}>{NEARBY_RESTAURANTS.length} found</Text>
        </View>

        {NEARBY_RESTAURANTS.map((restaurant) => (
          <RestaurantCard
            key={restaurant.key}
            restaurant={restaurant}
            variant="vertical"
            onPress={() =>
              router.push({
                pathname: "/food/details",
                params: { restaurantKey: restaurant.key },
              })
            }
          />
        ))}
      </ScrollView>

      <FoodTabBar active="search" onChange={(tab) => tab === "home" && router.push({ pathname: "/food" })} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 4 },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start" },
  backLabel: { color: colors.primary, fontSize: 16, fontWeight: "700" },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, paddingTop: 8, paddingBottom: 20 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 12,
  },
  searchInput: { flex: 1, color: colors.textPrimary, fontSize: 12.5 },
  filterScroll: { marginBottom: 14 },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  filterChipActive: { borderColor: colors.primary },
  filterLabel: { color: colors.textSecondary, fontSize: 10.5, fontWeight: "600" },
  filterLabelActive: { color: colors.primary },
  filterIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  resultsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  resultsTitle: { color: colors.textPrimary, fontSize: 13.5, fontWeight: "700" },
  resultsCount: { color: colors.textSecondary, fontSize: 10 },
});
