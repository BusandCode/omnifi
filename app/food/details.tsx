// app/food/details.tsx — restaurant details: header, info, menu, sticky cart bar
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Star, Clock, Plus, Minus, ShoppingBag } from "lucide-react-native";
import { NEARBY_RESTAURANTS } from "../../src/config/foodMockData";
import { colors } from "../../src/theme/colors";

const MENU_CATEGORIES = ["Popular", "Mains", "Sides", "Drinks"];
const MENU_ITEMS = [
  { key: "m1", category: "Popular", name: "Signature Burger", desc: "Beef patty, cheddar, house sauce", price: 4500, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300" },
  { key: "m2", category: "Popular", name: "Loaded Fries", desc: "Cheese, bacon bits, jalapeño", price: 2500, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300" },
  { key: "m3", category: "Mains", name: "Grilled Chicken Bowl", desc: "Rice, grilled chicken, veggies", price: 4000, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300" },
  { key: "m4", category: "Mains", name: "Jollof Special", desc: "Smoky jollof, chicken, plantain", price: 3800, image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=300" },
  { key: "m5", category: "Sides", name: "Onion Rings", desc: "Crispy battered onion rings", price: 1800, image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300" },
  { key: "m6", category: "Drinks", name: "Chapman", desc: "Classic Nigerian mocktail", price: 1500, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300" },
];

function formatPrice(n: number) {
  return `₦${n.toLocaleString()}`;
}

export default function FoodDetailsScreen() {
  const router = useRouter();
  const { restaurantKey } = useLocalSearchParams<{ restaurantKey?: string }>();
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);
  const [cart, setCart] = useState<Record<string, number>>({});

  const restaurant = useMemo(
    () => NEARBY_RESTAURANTS.find((r) => r.key === restaurantKey) ?? NEARBY_RESTAURANTS[0],
    [restaurantKey]
  );

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [key, qty]) => {
    const item = MENU_ITEMS.find((m) => m.key === key);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const updateQty = (key: string, delta: number) => {
    setCart((prev) => {
      const next = { ...prev };
      const current = next[key] ?? 0;
      const updated = Math.max(0, current + delta);
      if (updated === 0) {
        delete next[key];
      } else {
        next[key] = updated;
      }
      return next;
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, cartCount > 0 && { paddingBottom: 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroWrap}>
          <Image source={{ uri: restaurant.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={10}>
            <ChevronLeft color="#fff" size={20} />
          </Pressable>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          {restaurant.cuisine ? <Text style={styles.cuisine}>{restaurant.cuisine}</Text> : null}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Star color={colors.primary} size={13} fill={colors.primary} />
              <Text style={styles.metaText}>{restaurant.rating ?? "4.5"}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock color={colors.textSecondary} size={13} />
              <Text style={styles.metaText}>{restaurant.deliveryTime ?? "20-30 min"}</Text>
            </View>
            {restaurant.deliveryFee ? (
              <Text style={styles.metaText}>{restaurant.deliveryFee} delivery</Text>
            ) : null}
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {MENU_CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <Pressable
                key={cat}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {filteredItems.map((item) => {
          const qty = cart[item.key] ?? 0;
          return (
            <View key={item.key} style={styles.menuRow}>
              <Image source={{ uri: item.image }} style={styles.menuImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuDesc} numberOfLines={2}>
                  {item.desc}
                </Text>
                <View style={styles.menuBottomRow}>
                  <Text style={styles.menuPrice}>{formatPrice(item.price)}</Text>
                  {qty === 0 ? (
                    <Pressable style={styles.addBtn} onPress={() => updateQty(item.key, 1)}>
                      <Plus color="#fff" size={14} />
                    </Pressable>
                  ) : (
                    <View style={styles.qtyRow}>
                      <Pressable style={styles.qtyBtn} onPress={() => updateQty(item.key, -1)}>
                        <Minus color={colors.primary} size={13} />
                      </Pressable>
                      <Text style={styles.qtyValue}>{qty}</Text>
                      <Pressable style={styles.qtyBtn} onPress={() => updateQty(item.key, 1)}>
                        <Plus color={colors.primary} size={13} />
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {cartCount > 0 && (
        <Pressable
          style={styles.cartBar}
          onPress={() =>
            router.push({
              pathname: "/food/checkout",
              params: { restaurantKey: restaurant.key, total: String(cartTotal), count: String(cartCount) },
            })
          }
        >
          <View style={styles.cartBarLeft}>
            <ShoppingBag color="#fff" size={16} />
            <Text style={styles.cartBarCount}>{cartCount} item{cartCount > 1 ? "s" : ""}</Text>
          </View>
          <Text style={styles.cartBarTotal}>{formatPrice(cartTotal)}</Text>
          <Text style={styles.cartBarCta}>View cart</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  heroWrap: { height: 200, backgroundColor: colors.surface },
  heroImage: { ...StyleSheet.absoluteFillObject, width: undefined, height: undefined },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(10, 8, 18, 0.25)" },
  backBtn: {
    position: "absolute",
    top: 12,
    left: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(10, 8, 18, 0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  infoCard: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6 },
  restaurantName: { color: colors.textPrimary, fontSize: 19, fontWeight: "800" },
  cuisine: { color: colors.textSecondary, fontSize: 12, marginTop: 3 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 8 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { color: colors.textSecondary, fontSize: 11.5, fontWeight: "600" },
  categoryScroll: { paddingLeft: 16, marginTop: 10, marginBottom: 6 },
  categoryChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryLabel: { color: colors.textSecondary, fontSize: 11.5, fontWeight: "600" },
  categoryLabelActive: { color: "#fff" },
  menuRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuImage: { width: 72, height: 72, borderRadius: 12, backgroundColor: colors.surface },
  menuName: { color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  menuDesc: { color: colors.textSecondary, fontSize: 10.5, marginTop: 3, lineHeight: 14 },
  menuBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  menuPrice: { color: colors.textPrimary, fontSize: 12.5, fontWeight: "700" },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  qtyBtn: { width: 20, height: 20, alignItems: "center", justifyContent: "center" },
  qtyValue: { color: colors.textPrimary, fontSize: 12, fontWeight: "700", minWidth: 14, textAlign: "center" },
  cartBar: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 16,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    justifyContent: "space-between",
  },
  cartBarLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  cartBarCount: { color: "#fff", fontSize: 12, fontWeight: "700" },
  cartBarTotal: { color: "#fff", fontSize: 12.5, fontWeight: "800" },
  cartBarCta: { color: "#fff", fontSize: 12, fontWeight: "700" },
});
