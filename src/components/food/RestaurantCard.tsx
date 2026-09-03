// src/components/food/RestaurantCard.tsx — "Nearby Partners" card with overlapping logo badge,
// or a vertical list row (used on the results screen).
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Star, Clock } from "lucide-react-native";
import { foodColors } from "../../theme/foodTheme";

type Restaurant = {
  key: string;
  name: string;
  image: string;
  logo?: string;
  cuisine?: string;
  rating?: number;
  deliveryTime?: string;
  deliveryFee?: string;
};

export default function RestaurantCard({
  restaurant,
  variant = "horizontal",
  onPress,
}: {
  restaurant: Restaurant;
  variant?: "horizontal" | "vertical";
  onPress?: () => void;
}) {
  if (variant === "vertical") {
    return (
      <Pressable style={styles.vWrap} onPress={onPress}>
        <Image source={{ uri: restaurant.image }} style={styles.vImage} />
        <View style={styles.vInfo}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
          {restaurant.cuisine ? (
            <Text style={styles.cuisine} numberOfLines={1}>
              {restaurant.cuisine}
            </Text>
          ) : null}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Star color={foodColors.red} size={11} fill={foodColors.red} />
              <Text style={styles.metaText}>{restaurant.rating ?? "4.5"}</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock color={foodColors.textSecondary} size={11} />
              <Text style={styles.metaText}>{restaurant.deliveryTime ?? "20 min"}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.hWrap} onPress={onPress}>
      <View style={styles.hImageWrap}>
        <Image source={{ uri: restaurant.image }} style={styles.hImage} />
        {restaurant.logo ? (
          <View style={styles.logoBadge}>
            <Image source={{ uri: restaurant.logo }} style={styles.logoImage} />
          </View>
        ) : null}
      </View>
      <View style={styles.hInfo}>
        <Text style={styles.name} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <View style={styles.metaRow}>
          <Star color={foodColors.red} size={11} fill={foodColors.red} />
          <Text style={styles.metaText}>
            {restaurant.rating ?? "4.5"} • {restaurant.deliveryTime ?? "20 min"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hWrap: { width: 170, marginRight: 14 },
  hImageWrap: { width: 170, height: 110, borderRadius: 16, overflow: "visible" },
  hImage: { width: "100%", height: "100%", borderRadius: 16, backgroundColor: foodColors.border },
  logoBadge: {
    position: "absolute",
    bottom: -10,
    left: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: foodColors.red,
    borderWidth: 2,
    borderColor: foodColors.background,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: { width: "100%", height: "100%" },
  hInfo: { marginTop: 14, paddingHorizontal: 2 },

  vWrap: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: foodColors.surface,
    borderWidth: 1,
    borderColor: foodColors.border,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  vImage: { width: 84, height: 84, borderRadius: 10, backgroundColor: foodColors.border },
  vInfo: { flex: 1, justifyContent: "center" },
  cuisine: { color: foodColors.textSecondary, fontSize: 10.5, marginTop: 2 },

  name: { color: foodColors.textPrimary, fontSize: 12.5, fontWeight: "700" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  metaText: { color: foodColors.textSecondary, fontSize: 10.5, fontWeight: "600" },
});
