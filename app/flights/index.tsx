// app/flights/index.tsx — Flights home: search widget, promo, destinations, deals, recent searches
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bell,
  User,
  Plane,
  BedDouble,
  Car,
  Grid3x3,
  ArrowLeftRight,
  Calendar,
  Users,
  Search,
  Tag,
  ShieldCheck,
  Headphones,
  Gift,
  ChevronRight,
} from "lucide-react-native";
import FlightsTabBar from "../../src/components/flights/FlightsTabBar";
import DestinationCard from "../../src/components/flights/DestinationCard";
import TopDealCard from "../../src/components/flights/TopDealCard";
import RecentSearchRow from "../../src/components/flights/RecentSearchRow";
import {
  FLIGHT_IMAGES,
  POPULAR_DESTINATIONS,
  TOP_DEALS,
  RECENT_SEARCHES,
  TRIP_ROUTE,
} from "../../src/config/flightMockData";
import { colors } from "../../src/theme/colors";

type TripType = "return" | "oneWay" | "multiCity";
type ModeTab = "flights" | "hotels" | "cars" | "more";

const MODE_TABS: { key: ModeTab; label: string; icon: React.ComponentType<any> }[] = [
  { key: "flights", label: "Flights", icon: Plane },
  { key: "hotels", label: "Hotels", icon: BedDouble },
  { key: "cars", label: "Cars", icon: Car },
  { key: "more", label: "More", icon: Grid3x3 },
];

export default function FlightsHomeScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<ModeTab>("flights");
  const [tripType, setTripType] = useState<TripType>("return");

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.greetingSmall}>Good morning,</Text>
            <Text style={styles.greetingName}>Suleiman</Text>
          </View>
          <View style={styles.topIcons}>
            <Pressable style={styles.iconBtn}>
              <Bell color={colors.textPrimary} size={18} />
              <View style={styles.bellDot} />
            </Pressable>
            <Pressable style={styles.iconBtn}>
              <User color={colors.textPrimary} size={18} />
            </Pressable>
          </View>
        </View>

        <View style={styles.heroWrap}>
          <Image source={{ uri: FLIGHT_IMAGES.planeHero }} style={styles.heroImage} />
        </View>

        <View style={styles.bookingCard}>
          <View style={styles.modeRow}>
            {MODE_TABS.map((tab) => {
              const isActive = tab.key === mode;
              const Icon = tab.icon;
              return (
                <Pressable
                  key={tab.key}
                  style={[styles.modeTab, isActive && styles.modeTabActive]}
                  onPress={() => setMode(tab.key)}
                >
                  <Icon color={isActive ? "#fff" : colors.textSecondary} size={16} />
                  <Text style={[styles.modeLabel, isActive && styles.modeLabelActive]}>
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.tripToggle}>
            {(
              [
                { key: "return", label: "Return" },
                { key: "oneWay", label: "One-way" },
                { key: "multiCity", label: "Multi-city" },
              ] as { key: TripType; label: string }[]
            ).map((opt) => (
              <Pressable
                key={opt.key}
                style={[styles.tripOption, tripType === opt.key && styles.tripOptionActive]}
                onPress={() => setTripType(opt.key)}
              >
                <Text
                  style={[
                    styles.tripOptionLabel,
                    tripType === opt.key && styles.tripOptionLabelActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.routeRow}>
            <View style={styles.routeField}>
              <Text style={styles.fieldLabel}>From</Text>
              <Text style={styles.fieldValue}>LOS</Text>
              <Text style={styles.fieldSub}>{TRIP_ROUTE.fromCity}</Text>
            </View>
            <View style={styles.swapBtn}>
              <ArrowLeftRight color={colors.primary} size={16} />
            </View>
            <View style={styles.routeField}>
              <Text style={styles.fieldLabel}>To</Text>
              <Text style={styles.fieldValue}>DXB</Text>
              <Text style={styles.fieldSub}>{TRIP_ROUTE.toCity}</Text>
            </View>
          </View>

          <View style={styles.dateRow}>
            <Pressable style={styles.dateField}>
              <Text style={styles.fieldLabel}>Depart</Text>
              <View style={styles.dateValueRow}>
                <Text style={styles.dateValue}>{TRIP_ROUTE.departDate}</Text>
                <Calendar color={colors.textSecondary} size={14} />
              </View>
            </Pressable>
            {tripType === "return" && (
              <Pressable style={styles.dateField}>
                <Text style={styles.fieldLabel}>Return</Text>
                <View style={styles.dateValueRow}>
                  <Text style={styles.dateValue}>{TRIP_ROUTE.returnDate}</Text>
                  <Calendar color={colors.textSecondary} size={14} />
                </View>
              </Pressable>
            )}
          </View>

          <Pressable style={styles.passengerField}>
            <Users color={colors.textSecondary} size={14} />
            <Text style={styles.passengerText}>{TRIP_ROUTE.passengers}</Text>
          </Pressable>

          <Pressable style={styles.searchBtn} onPress={() => router.push("/flights/results")}>
            <Search color="#fff" size={15} />
            <Text style={styles.searchLabel}>Search flights</Text>
          </Pressable>
        </View>

        <View style={styles.promoBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitle}>Fly more, save more</Text>
            <Text style={styles.promoSubtitle}>Unlock exclusive deals and member-only fares.</Text>
            <Pressable style={styles.promoBtn}>
              <Text style={styles.promoBtnLabel}>Explore offers</Text>
            </Pressable>
          </View>
          <Image source={{ uri: FLIGHT_IMAGES.planeWindowSunset }} style={styles.promoImage} />
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Popular destinations</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
          {POPULAR_DESTINATIONS.map((d) => (
            <DestinationCard key={d.key} destination={d} />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Why choose Stra Travel?</Text>
        <View style={styles.whyRow}>
          <WhyCard icon={Tag} title="Best prices" description="We compare thousands of options to get you the best deal." />
          <WhyCard icon={ShieldCheck} title="Secure booking" description="Your data and payments are protected with bank-level security." />
          <WhyCard icon={Headphones} title="24/7 support" description="Our travel experts are always here to help you, anytime." />
        </View>

        <View style={styles.adventureBanner}>
          <Image source={{ uri: FLIGHT_IMAGES.planeWindowSunset }} style={styles.adventureImage} />
          <View style={styles.adventureOverlay} />
          <View style={styles.adventureText}>
            <Text style={styles.adventureTitle}>Your next adventure{"\n"}starts here</Text>
            <Text style={styles.adventureSubtitle}>
              Discover new destinations and create unforgettable memories.
            </Text>
            <Pressable style={styles.adventureBtn}>
              <Text style={styles.adventureBtnLabel}>Explore destinations</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Top deals for you</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
          {TOP_DEALS.map((deal) => (
            <TopDealCard key={deal.key} deal={deal} />
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent searches</Text>
          <Text style={styles.seeAll}>Clear all</Text>
        </View>
        {RECENT_SEARCHES.map((search) => (
          <RecentSearchRow key={search.key} search={search} />
        ))}

        <View style={styles.referCard}>
          <View style={styles.referIconBubble}>
            <Gift color="#fff" size={18} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.referTitle}>Refer & earn rewards</Text>
            <Text style={styles.referSubtitle}>
              Invite friends and earn exciting rewards on every successful booking.
            </Text>
          </View>
          <Pressable style={styles.referBtn}>
            <Text style={styles.referBtnLabel}>Invite friends</Text>
          </Pressable>
        </View>
      </ScrollView>

      <FlightsTabBar active="home" />
    </SafeAreaView>
  );
}

function WhyCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.whyCard}>
      <View style={styles.whyIconBubble}>
        <Icon color={colors.primary} size={16} />
      </View>
      <Text style={styles.whyTitle}>{title}</Text>
      <Text style={styles.whyDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 20 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  greetingSmall: { color: colors.textSecondary, fontSize: 12 },
  greetingName: { color: colors.textPrimary, fontSize: 20, fontWeight: "800", marginTop: 2 },
  topIcons: { flexDirection: "row", gap: 8 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  bellDot: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  heroWrap: {
    height: 110,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 14,
    backgroundColor: colors.surface,
  },
  heroImage: { width: "100%", height: "100%" },
  bookingCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 14,
  },
  modeRow: { flexDirection: "row", gap: 6, marginBottom: 12 },
  modeTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  modeTabActive: { backgroundColor: colors.primary },
  modeLabel: { fontSize: 10, color: colors.textSecondary, fontWeight: "600" },
  modeLabelActive: { color: "#fff" },
  tripToggle: { flexDirection: "row", gap: 14, marginBottom: 12 },
  tripOption: { paddingVertical: 4 },
  tripOptionActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  tripOptionLabel: { color: colors.textSecondary, fontSize: 11.5, fontWeight: "600" },
  tripOptionLabelActive: { color: colors.primary },
  routeRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  routeField: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 10,
  },
  fieldLabel: { color: colors.textSecondary, fontSize: 9.5, marginBottom: 3 },
  fieldValue: { color: colors.textPrimary, fontSize: 16, fontWeight: "800" },
  fieldSub: { color: colors.textSecondary, fontSize: 9.5, marginTop: 1 },
  swapBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(139, 92, 246, 0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  dateRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  dateField: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 10,
  },
  dateValueRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dateValue: { color: colors.textPrimary, fontSize: 12.5, fontWeight: "700" },
  passengerField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  passengerText: { color: colors.textPrimary, fontSize: 12, fontWeight: "600" },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 46,
    borderRadius: 13,
    backgroundColor: colors.primary,
  },
  searchLabel: { color: "#fff", fontSize: 13, fontWeight: "700" },
  promoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.35)",
    padding: 14,
    marginBottom: 18,
  },
  promoTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: "800", marginBottom: 4 },
  promoSubtitle: { color: colors.textSecondary, fontSize: 10.5, marginBottom: 10, lineHeight: 14 },
  promoBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  promoBtnLabel: { color: colors.primary, fontSize: 11, fontWeight: "700" },
  promoImage: { width: 70, height: 70, borderRadius: 12, marginLeft: 10 },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { color: colors.textPrimary, fontSize: 13.5, fontWeight: "700", marginBottom: 10 },
  seeAll: { color: colors.primary, fontSize: 11.5, fontWeight: "600" },
  hScroll: { marginBottom: 18 },
  whyRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  whyCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
  },
  whyIconBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(139, 92, 246, 0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  whyTitle: { color: colors.textPrimary, fontSize: 11, fontWeight: "700", marginBottom: 4 },
  whyDescription: { color: colors.textSecondary, fontSize: 9, lineHeight: 12 },
  adventureBanner: {
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    backgroundColor: colors.surface,
  },
  adventureImage: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
  adventureOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(10, 8, 18, 0.55)" },
  adventureText: { flex: 1, justifyContent: "center", padding: 16 },
  adventureTitle: { color: "#fff", fontSize: 17, fontWeight: "800", lineHeight: 22, marginBottom: 6 },
  adventureSubtitle: { color: "#E7E1F5", fontSize: 10.5, marginBottom: 12, lineHeight: 14, maxWidth: "80%" },
  adventureBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },
  adventureBtnLabel: { color: "#fff", fontSize: 11.5, fontWeight: "700" },
  referCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginTop: 4,
  },
  referIconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  referTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: "700", marginBottom: 2 },
  referSubtitle: { color: colors.textSecondary, fontSize: 9, lineHeight: 12 },
  referBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 8,
  },
  referBtnLabel: { color: colors.primary, fontSize: 10, fontWeight: "700" },
});
