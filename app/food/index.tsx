// app/food/index.tsx — Food home, styled to match the E-Chop reference (cream/navy/red)
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, ShoppingCart, Search, ChevronDown, ChevronRight, Star, Clock, Minus, Plus } from "lucide-react-native";
import FoodTabBar from "../../src/components/food/FoodTabBar";
import CategoryCard from "../../src/components/food/CategoryCard";
import RestaurantCard from "../../src/components/food/RestaurantCard";
import {
  FOOD_IMAGES,
  FOOD_CATEGORIES,
  NEARBY_RESTAURANTS,
  DELIVERY_ADDRESS,
} from "../../src/config/foodMockData";
import { foodColors, foodFonts } from "../../src/theme/foodTheme";

const FEATURED_ITEM = {
  restaurantName: "MAMA TITI'S",
  badge: "🔥 POPULAR",
  name: "Party Jollof Rice",
  desc: "Smoky firewood jollof with fried plantain and coleslaw",
  price: 4000,
  rating: 4.9,
  time: "20 min",
  image: FOOD_IMAGES.heroBanner,
};

function formatPrice(n: number) {
  return `₦${n.toLocaleString()}`;
}

export default function FoodHomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(FOOD_CATEGORIES[0]?.key ?? "all");
  const [qty, setQty] = useState(1);

  const cartCount = qty;
  const cartTotal = FEATURED_ITEM.price * qty;

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.deliveringLabel}>DELIVERING TO</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationValue} numberOfLines={1}>
                {DELIVERY_ADDRESS.label}
              </Text>
              <ChevronDown color={foodColors.textPrimary} size={16} />
            </View>
          </View>
          <View style={styles.topIcons}>
            <Pressable style={styles.iconBtn}>
              <Bell color={foodColors.textPrimary} size={18} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </Pressable>
            <Pressable style={styles.iconBtn}>
              <ShoppingCart color={foodColors.textPrimary} size={18} />
              {cartCount > 0 && (
                <View style={[styles.badge, styles.badgeRed]}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.searchBar} onPress={() => router.push("/food/results")}>
          <Search color={foodColors.textSecondary} size={16} />
          <Text style={styles.searchPlaceholder}>Search meals, restaurants, bukas...</Text>
        </Pressable>

        <View style={styles.heroWrap}>
          <Image source={{ uri: FOOD_IMAGES.heroBanner }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>
              Feed Your{"\n"}
              <Text style={styles.heroTitleAccent}>Cravings.</Text>
            </Text>
            <Text style={styles.heroSubtitle}>Hot meals • Fast delivery</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>CATEGORIES</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
          {FOOD_CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.key}
              category={cat}
              active={cat.key === activeCategory}
              onPress={() => setActiveCategory(cat.key)}
            />
          ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>NEARBY PARTNERS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScrollWide}>
          {NEARBY_RESTAURANTS.map((restaurant) => (
            <RestaurantCard
              key={restaurant.key}
              restaurant={restaurant}
              variant="horizontal"
              onPress={() =>
                router.push({ pathname: "/food/details", params: { restaurantKey: restaurant.key } })
              }
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.menuTitle}>Today's Menu</Text>
            <Text style={styles.menuSubtitle}>Fresh, hot and ready to order</Text>
          </View>
          <Pressable style={styles.seeAllRow}>
            <Text style={styles.seeAll}>See All</Text>
            <ChevronRight color={foodColors.red} size={14} />
          </Pressable>
        </View>

        <View style={styles.featuredCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.featuredRestaurant}>{FEATURED_ITEM.restaurantName}</Text>
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>{FEATURED_ITEM.badge}</Text>
            </View>
            <Text style={styles.featuredName}>{FEATURED_ITEM.name}</Text>
            <Text style={styles.featuredDesc} numberOfLines={2}>
              {FEATURED_ITEM.desc}
            </Text>
            <Text style={styles.featuredPrice}>{formatPrice(FEATURED_ITEM.price)}</Text>
            <View style={styles.metaRow}>
              <Star color={foodColors.red} size={12} fill={foodColors.red} />
              <Text style={styles.metaText}>{FEATURED_ITEM.rating}</Text>
              <Clock color={foodColors.textSecondary} size={12} style={{ marginLeft: 8 }} />
              <Text style={styles.metaText}>{FEATURED_ITEM.time}</Text>
            </View>
          </View>

          <View style={styles.featuredImageWrap}>
            <Image source={{ uri: FEATURED_ITEM.image }} style={styles.featuredImage} />
            <Pressable style={styles.addFab} onPress={() => setQty((q) => q + 1)}>
              <Plus color="#fff" size={16} />
            </Pressable>
          </View>
        </View>

        <View style={styles.qtyRow}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => setQty((q) => Math.max(1, q - 1))}
          >
            <Minus color={foodColors.textPrimary} size={14} />
          </Pressable>
          <Text style={styles.qtyValue}>{qty}</Text>
          <Pressable style={styles.qtyBtn} onPress={() => setQty((q) => q + 1)}>
            <Plus color={foodColors.textPrimary} size={14} />
          </Pressable>
        </View>
      </ScrollView>

      {cartCount > 0 && (
        <Pressable
          style={styles.orderBar}
          onPress={() =>
            router.push({
              pathname: "/food/checkout",
              params: { total: String(cartTotal), count: String(cartCount) },
            })
          }
        >
          <View style={styles.orderBarCount}>
            <Text style={styles.orderBarCountText}>{cartCount}</Text>
          </View>
          <Text style={styles.orderBarLabel}>View Order</Text>
          <Text style={styles.orderBarTotal}>{formatPrice(cartTotal)}</Text>
          <ChevronRight color="#fff" size={16} />
        </Pressable>
      )}

      <FoodTabBar active="home" onChange={(tab) => tab === "search" && router.push("/food/results")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: foodColors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 24 },

  topRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 16 },
  deliveringLabel: { color: foodColors.textSecondary, fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  locationValue: { color: foodColors.textPrimary, fontSize: 16, fontWeight: "700", maxWidth: 220 },
  topIcons: { flexDirection: "row", gap: 10 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: foodColors.surface,
    borderWidth: 1,
    borderColor: foodColors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: foodColors.navy,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeRed: { backgroundColor: foodColors.red },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "700" },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: foodColors.surface,
    borderWidth: 1,
    borderColor: foodColors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 16,
  },
  searchPlaceholder: { color: foodColors.textSecondary, fontSize: 12.5 },

  heroWrap: {
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 22,
    backgroundColor: foodColors.navy,
  },
  heroImage: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(11, 25, 88, 0.65)" },
  heroText: { flex: 1, justifyContent: "center", padding: 18 },
  heroTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 30,
    fontFamily: foodFonts.serif,
  },
  heroTitleAccent: { color: foodColors.red, fontStyle: "italic" },
  heroSubtitle: { color: "#E7E1D8", fontSize: 12, marginTop: 10, fontWeight: "500" },

  sectionLabel: {
    color: foodColors.textSecondary,
    fontSize: 10.5,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: foodColors.border,
    paddingTop: 14,
  },
  hScroll: { marginBottom: 20 },
  hScrollWide: { marginBottom: 22 },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
    borderTopWidth: 1,
    borderTopColor: foodColors.border,
    paddingTop: 16,
  },
  menuTitle: { color: foodColors.textPrimary, fontSize: 20, fontWeight: "700", fontFamily: foodFonts.serif },
  menuSubtitle: { color: foodColors.textSecondary, fontSize: 11, marginTop: 2 },
  seeAllRow: { flexDirection: "row", alignItems: "center", gap: 2, marginTop: 4 },
  seeAll: { color: foodColors.red, fontSize: 12, fontWeight: "700" },

  featuredCard: {
    flexDirection: "row",
    backgroundColor: foodColors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: foodColors.border,
    padding: 14,
    gap: 12,
  },
  featuredRestaurant: { color: foodColors.red, fontSize: 10, fontWeight: "800", letterSpacing: 0.3 },
  popularBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(228,48,45,0.1)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
    marginBottom: 6,
  },
  popularBadgeText: { color: foodColors.red, fontSize: 9, fontWeight: "700" },
  featuredName: { color: foodColors.textPrimary, fontSize: 15, fontWeight: "700", fontFamily: foodFonts.serif },
  featuredDesc: { color: foodColors.textSecondary, fontSize: 10.5, marginTop: 4, lineHeight: 14 },
  featuredPrice: { color: foodColors.textPrimary, fontSize: 14, fontWeight: "800", marginTop: 8 },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 6, gap: 3 },
  metaText: { color: foodColors.textSecondary, fontSize: 10.5, fontWeight: "600" },

  featuredImageWrap: { width: 100, height: 100 },
  featuredImage: { width: "100%", height: "100%", borderRadius: 12, backgroundColor: foodColors.border },
  addFab: {
    position: "absolute",
    bottom: -10,
    right: -6,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: foodColors.red,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: foodColors.background,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    alignSelf: "flex-end",
    marginTop: 14,
    borderWidth: 1,
    borderColor: foodColors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  qtyBtn: { width: 20, height: 20, alignItems: "center", justifyContent: "center" },
  qtyValue: { color: foodColors.textPrimary, fontSize: 13, fontWeight: "700" },

  orderBar: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 78,
    height: 52,
    borderRadius: 26,
    backgroundColor: foodColors.black,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    gap: 10,
  },
  orderBarCount: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  orderBarCountText: { color: foodColors.black, fontSize: 13, fontWeight: "800" },
  orderBarLabel: { color: "#fff", fontSize: 13, fontWeight: "700", flex: 1 },
  orderBarTotal: { color: "#fff", fontSize: 13, fontWeight: "800" },
});
