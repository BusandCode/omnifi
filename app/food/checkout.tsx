// app/food/checkout.tsx — order review, delivery address, payment method, place order
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, MapPin, CreditCard, Wallet, ChevronRight, Check } from "lucide-react-native";
import { DELIVERY_ADDRESS } from "../../src/config/foodMockData";
import { colors } from "../../src/theme/colors";

const PAYMENT_METHODS = [
  { key: "card", label: "Debit Card •••• 4821", icon: CreditCard },
  { key: "wallet", label: "Wallet Balance", icon: Wallet },
];

const DELIVERY_FEE = 800;
const SERVICE_FEE = 200;

function formatPrice(n: number) {
  return `₦${n.toLocaleString()}`;
}

export default function FoodCheckoutScreen() {
  const router = useRouter();
  const { total, count } = useLocalSearchParams<{ total?: string; count?: string }>();
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0].key);
  const [placing, setPlacing] = useState(false);

  const subtotal = Number(total ?? 0);
  const itemCount = Number(count ?? 0);
  const grandTotal = subtotal + DELIVERY_FEE + SERVICE_FEE;

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      router.push("/food");
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={10}>
          <ChevronLeft color={colors.primary} size={20} />
          <Text style={styles.backLabel}>Checkout</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Delivery address</Text>
        <Pressable style={styles.card}>
          <View style={styles.iconBubble}>
            <MapPin color={colors.primary} size={16} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{DELIVERY_ADDRESS.label}</Text>
            <Text style={styles.cardSubtitle} numberOfLines={2}>
              {DELIVERY_ADDRESS.address}
            </Text>
          </View>
          <ChevronRight color={colors.textSecondary} size={16} />
        </Pressable>

        <Text style={styles.sectionLabel}>Payment method</Text>
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          const isSelected = method.key === selectedPayment;
          return (
            <Pressable
              key={method.key}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => setSelectedPayment(method.key)}
            >
              <View style={styles.iconBubble}>
                <Icon color={colors.primary} size={16} />
              </View>
              <Text style={[styles.cardTitle, { flex: 1 }]}>{method.label}</Text>
              {isSelected && (
                <View style={styles.checkDot}>
                  <Check color="#fff" size={12} />
                </View>
              )}
            </Pressable>
          );
        })}

        <Text style={styles.sectionLabel}>Order summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})
            </Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery fee</Text>
            <Text style={styles.summaryValue}>{formatPrice(DELIVERY_FEE)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service fee</Text>
            <Text style={styles.summaryValue}>{formatPrice(SERVICE_FEE)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(grandTotal)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.placeBtn} onPress={handlePlaceOrder} disabled={placing}>
          <Text style={styles.placeBtnLabel}>
            {placing ? "Placing order..." : `Place order • ${formatPrice(grandTotal)}`}
          </Text>
        </Pressable>
      </View>
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
  sectionLabel: { color: colors.textPrimary, fontSize: 12.5, fontWeight: "700", marginBottom: 8, marginTop: 14 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    padding: 12,
    marginBottom: 8,
  },
  cardSelected: { borderColor: colors.primary },
  iconBubble: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(91, 33, 182, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { color: colors.textPrimary, fontSize: 12.5, fontWeight: "700" },
  cardSubtitle: { color: colors.textSecondary, fontSize: 10.5, marginTop: 2 },
  checkDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    padding: 14,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  summaryLabel: { color: colors.textSecondary, fontSize: 11.5 },
  summaryValue: { color: colors.textPrimary, fontSize: 11.5, fontWeight: "600" },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 6 },
  totalLabel: { color: colors.textPrimary, fontSize: 13, fontWeight: "800" },
  totalValue: { color: colors.textPrimary, fontSize: 13, fontWeight: "800" },
  footer: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  placeBtn: {
    backgroundColor: colors.primary,
    borderRadius: 13,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  placeBtnLabel: { color: "#fff", fontSize: 13.5, fontWeight: "700" },
});
