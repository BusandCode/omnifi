import { Feather } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";

type Offer = {
  brand: string;
  brandColor?: string;
  discount: string;
  title: string;
  sub: string;
};

const offers: Offer[] = [
  {
    brand: "Bolt",
    brandColor: "#34D186",
    discount: "15% OFF",
    title: "Bolt rides",
    sub: "15% off your next 3 rides",
  },
  {
    brand: "JUMIA",
    brandColor: "#F68B1E",
    discount: "10% OFF",
    title: "Jumia",
    sub: "10% off orders above NGN 20,000",
  },
  {
    brand: "FilmOne",
    discount: "20% OFF",
    title: "FilmOne",
    sub: "20% off movie tickets",
  },
  {
    brand: "Nike",
    discount: "15% OFF",
    title: "Nike Store",
    sub: "15% off on all items",
  },
];

export function ExclusiveOffers() {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Exclusive offers
        </Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: themeColors.primaryLight }]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {offers.map((o) => (
          <View
            key={o.title}
            style={[styles.card, { backgroundColor: themeColors.surface }]}
          >
            <Text
              style={[
                styles.brand,
                { color: o.brandColor ?? themeColors.textPrimary },
              ]}
            >
              {o.brand}
            </Text>
            <View
              style={[
                styles.discountTag,
                { backgroundColor: themeColors.primaryTint },
              ]}
            >
              <Text
                style={[
                  styles.discountText,
                  { color: themeColors.primaryLight },
                ]}
              >
                {o.discount}
              </Text>
            </View>
            <Text
              style={[styles.offerTitle, { color: themeColors.textPrimary }]}
              numberOfLines={1}
            >
              {o.title}
            </Text>
            <Text
              style={[styles.offerSub, { color: themeColors.textSecondary }]}
              numberOfLines={2}
            >
              {o.sub}
            </Text>
            <TouchableOpacity style={styles.viewOfferRow}>
              <Text
                style={[
                  styles.viewOfferText,
                  { color: themeColors.primaryLight },
                ]}
              >
                View offer
              </Text>
              <Feather
                name="chevron-right"
                size={10}
                color={themeColors.primaryLight}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { fontSize: 11.5, fontWeight: "600" },
  viewAll: { fontSize: 11, fontWeight: "600" },
  row: {
    gap: 3,
    flexDirection: "row",
    paddingBottom: 12,
    justifyContent: "space-between",
    flex: 1,
  },
  card: {
    width: 89,
    borderRadius: 14,
    padding: 10,
  },
  brand: { fontSize: 10, fontWeight: "800", marginBottom: 5 },
  discountTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 4,
  },
  discountText: { fontSize: 8, fontWeight: "700" },
  offerTitle: {
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 6,
  },
  offerSub: {
    fontSize: 8.5,
    lineHeight: 10,
    marginBottom: 5,
  },
  viewOfferRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  viewOfferText: {
    fontSize: 10,
    fontWeight: "600",
  },
});