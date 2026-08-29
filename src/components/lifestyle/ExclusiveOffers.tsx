import { Feather } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors } from "../../theme/colors";

type Offer = {
  brand: string;
  brandColor: string;
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
    brandColor: "#fff",
    discount: "20% OFF",
    title: "FilmOne",
    sub: "20% off movie tickets",
  },
  {
    brand: "Nike",
    brandColor: "#fff",
    discount: "15% OFF",
    title: "Nike Store",
    sub: "15% off on all items",
  },
];

export function ExclusiveOffers() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Exclusive offers</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {offers.map((o) => (
          <View key={o.title} style={styles.card}>
            <Text style={[styles.brand, { color: o.brandColor }]}>
              {o.brand}
            </Text>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>{o.discount}</Text>
            </View>
            <Text style={styles.offerTitle} numberOfLines={1}>
              {o.title}
            </Text>
            <Text style={styles.offerSub} numberOfLines={2}>
              {o.sub}
            </Text>
            <TouchableOpacity style={styles.viewOfferRow}>
              <Text style={styles.viewOfferText}>View offer</Text>
              <Feather
                name="chevron-right"
                size={10}
                color={colors.primaryLight}
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
    // marginTop:12/,
    // marginTop: ,
  },
  title: { color: colors.textPrimary, fontSize: 11.5, fontWeight: "600" },
  viewAll: { color: colors.primaryLight, fontSize: 11, fontWeight: "600" },
  row: { gap: 3, flexDirection: "row", paddingBottom: 12, justifyContent: "space-between", flex: 1 },
  card: {
    width: 89,
    backgroundColor: colors.surface,
    borderRadius: 14,
    // flex
    padding: 10,
  },
  brand: { fontSize: 10, fontWeight: "800", marginBottom: 5 },
  discountTag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(167,139,250,0.15)",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 4,
  },
  discountText: { color: colors.primaryLight, fontSize: 8, fontWeight: "700" },
  offerTitle: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 6,
  },
  offerSub: {
    color: colors.textSecondary,
    fontSize: 8.5,
    lineHeight: 10,
    marginBottom: 5,
  },
  viewOfferRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  viewOfferText: {
    color: colors.primaryLight,
    fontSize: 10,
    fontWeight: "600",
  },
});
