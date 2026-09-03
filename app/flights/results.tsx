// app/flights/results.tsx — search results list
import { useRouter } from "expo-router";
import {
    ChevronDown,
    ChevronLeft,
    SlidersHorizontal,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FlightResultCard from "../../src/components/flights/FlightResultCard";
import FlightsTabBar from "../../src/components/flights/FlightsTabBar";
import { SEARCH_RESULTS, TRIP_ROUTE } from "../../src/config/flightMockData";
import { colors } from "../../src/theme/colors";

const FILTERS = ["Sort: Recommended", "Stops", "Price", "Times"];

export default function FlightResultsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={10}
        >
          <ChevronLeft color={colors.primary} size={20} />
          <Text style={styles.backLabel}>Flights</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.route}>
          {TRIP_ROUTE.from} → {TRIP_ROUTE.to}
        </Text>
        <Text style={styles.routeMeta}>
          {TRIP_ROUTE.departDate} – {TRIP_ROUTE.returnDate} •{" "}
          {TRIP_ROUTE.passengers}
        </Text>

        <View style={styles.summaryCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>Return flight</Text>
            <Text style={styles.summarySubtitle}>
              Economy • {TRIP_ROUTE.passengers}
            </Text>
          </View>
          <Pressable style={styles.changeBtn} onPress={() => router.back()}>
            <Text style={styles.changeLabel}>Change search</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <Pressable
                key={filter}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterLabel,
                    isActive && styles.filterLabelActive,
                  ]}
                >
                  {filter}
                </Text>
                <ChevronDown
                  color={isActive ? colors.primary : colors.textSecondary}
                  size={12}
                />
              </Pressable>
            );
          })}
          <Pressable style={styles.filterIconBtn}>
            <SlidersHorizontal color={colors.textSecondary} size={14} />
          </Pressable>
        </ScrollView>

        <View style={styles.resultsHeaderRow}>
          <Text style={styles.resultsTitle}>Available flights</Text>
          <Text style={styles.resultsCount}>
            {SEARCH_RESULTS.length} flights found
          </Text>
        </View>

        {SEARCH_RESULTS.map((flight) => (
          <FlightResultCard
            key={flight.key}
            flight={flight}
            fromCity={TRIP_ROUTE.fromCity}
            toCity={TRIP_ROUTE.toCity}
            onSelect={() =>
              router.push({
                pathname: "/flights/details",
                params: { flightKey: flight.key },
              })
            }
          />
        ))}
      </ScrollView>

      <FlightsTabBar
        active="home"
        onChange={() => router.push("/flights" as any)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 4 },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
  },
  backLabel: { color: colors.primary, fontSize: 16, fontWeight: "700" },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, paddingTop: 8, paddingBottom: 20 },
  route: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  routeMeta: {
    color: colors.textSecondary,
    fontSize: 10.5,
    textAlign: "center",
    marginTop: 3,
    marginBottom: 12,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontSize: 12.5,
    fontWeight: "700",
  },
  summarySubtitle: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  changeBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  changeLabel: { color: colors.primary, fontSize: 10.5, fontWeight: "700" },
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
  filterLabel: {
    color: colors.textSecondary,
    fontSize: 10.5,
    fontWeight: "600",
  },
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
  resultsTitle: {
    color: colors.textPrimary,
    fontSize: 13.5,
    fontWeight: "700",
  },
  resultsCount: { color: colors.textSecondary, fontSize: 10 },
});
