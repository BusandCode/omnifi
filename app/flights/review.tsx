// app/flights/review.tsx — final booking review + payment method + confirm
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ChevronLeft,
    ChevronRight,
    CreditCard,
    Plane,
    ShieldCheck,
    Tag,
    Wallet,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AirlineLogo from "../../src/components/flights/AirlineLogo";
import { getFlightDetails, TRIP_ROUTE } from "../../src/config/flightMockData";
import { colors } from "../../src/theme/colors";

type PaymentMethod = "card" | "wallet";

export default function ReviewScreen() {
  const router = useRouter();
  const { flightKey } = useLocalSearchParams<{ flightKey?: string }>();
  const flight = getFlightDetails(flightKey);
  const airline = flight.airlineDetails;
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [agreed, setAgreed] = useState(false);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable
          style={styles.iconBtn}
          onPress={() => router.back()}
          hitSlop={10}
        >
          <ChevronLeft color={colors.textPrimary} size={20} />
        </Pressable>
        <Text style={styles.title}>Review & pay</Text>
        <View style={styles.iconBtn} />
      </View>

      <View style={styles.progressRow}>
        <ProgressStep label="Flight" done />
        <ProgressLine />
        <ProgressStep label="Passenger" done />
        <ProgressLine />
        <ProgressStep label="Review" active />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.legHeaderRow}>
            <AirlineLogo code={flight.airline} size={34} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.airlineName}>{airline.name}</Text>
              <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
            </View>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/flights/details",
                  params: { flightKey },
                })
              }
            >
              <Text style={styles.editLabel}>Edit</Text>
            </Pressable>
          </View>

          <View style={styles.miniRouteRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.miniTime}>{flight.outbound.departTime}</Text>
              <Text style={styles.miniCode}>{flight.outbound.from}</Text>
            </View>
            <Plane color={colors.primary} size={14} />
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text style={styles.miniTime}>{flight.outbound.arriveTime}</Text>
              <Text style={styles.miniCode}>{flight.outbound.to}</Text>
            </View>
          </View>
          <Text style={styles.miniDate}>
            {flight.outbound.date} • {flight.cabin}
          </Text>

          <View style={styles.divider} />

          <View style={styles.miniRouteRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.miniTime}>{flight.return.departTime}</Text>
              <Text style={styles.miniCode}>{flight.return.from}</Text>
            </View>
            <Plane
              color={colors.primary}
              size={14}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text style={styles.miniTime}>{flight.return.arriveTime}</Text>
              <Text style={styles.miniCode}>{flight.return.to}</Text>
            </View>
          </View>
          <Text style={styles.miniDate}>{flight.return.date} • Return</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Passenger</Text>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/flights/passenger",
                  params: { flightKey },
                })
              }
            >
              <Text style={styles.editLabel}>Edit</Text>
            </Pressable>
          </View>
          <Text style={styles.passengerName}>
            {TRIP_ROUTE.passengers} • Economy
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment method</Text>

          <Pressable
            style={[
              styles.paymentOption,
              payment === "card" && styles.paymentOptionActive,
            ]}
            onPress={() => setPayment("card")}
          >
            <CreditCard
              color={payment === "card" ? colors.primary : colors.textSecondary}
              size={18}
            />
            <Text
              style={[
                styles.paymentLabel,
                payment === "card" && styles.paymentLabelActive,
              ]}
            >
              Debit / Credit card
            </Text>
            <View
              style={[styles.radio, payment === "card" && styles.radioActive]}
            >
              {payment === "card" && <View style={styles.radioDot} />}
            </View>
          </Pressable>

          <Pressable
            style={[
              styles.paymentOption,
              payment === "wallet" && styles.paymentOptionActive,
            ]}
            onPress={() => setPayment("wallet")}
          >
            <Wallet
              color={
                payment === "wallet" ? colors.primary : colors.textSecondary
              }
              size={18}
            />
            <Text
              style={[
                styles.paymentLabel,
                payment === "wallet" && styles.paymentLabelActive,
              ]}
            >
              Wallet balance
            </Text>
            <View
              style={[styles.radio, payment === "wallet" && styles.radioActive]}
            >
              {payment === "wallet" && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fare breakdown</Text>
          <FareRow
            label="Flight fare"
            value={flight.fareBreakdown.flightFare}
          />
          <FareRow
            label="Taxes & fees"
            value={flight.fareBreakdown.taxesAndFees}
          />
          <View style={styles.divider} />
          <FareRow label="Total" value={flight.fareBreakdown.total} bold />
        </View>

        <View style={styles.promoRow}>
          <Tag color={colors.primary} size={15} />
          <Text style={styles.promoText}>Add a promo code</Text>
          <ChevronRight color={colors.textSecondary} size={14} />
        </View>

        <Pressable style={styles.agreeRow} onPress={() => setAgreed((v) => !v)}>
          <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
            {agreed && <View style={styles.checkboxDot} />}
          </View>
          <Text style={styles.agreeLabel}>
            I agree to the fare rules, terms of service and privacy policy
          </Text>
        </Pressable>

        <View style={styles.noticeRow}>
          <ShieldCheck color={colors.primary} size={16} />
          <Text style={styles.noticeText}>
            Your payment is encrypted and protected with bank-level security.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerTotal}>{flight.fareBreakdown.total}</Text>
        </View>
        <Pressable disabled={!agreed}>
          <LinearGradient
            colors={[colors.primary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.payBtn, !agreed && styles.payBtnDisabled]}
          >
            <Text style={styles.payLabel}>Confirm & pay</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function FareRow({
  label,
  value,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <View style={styles.fareRow}>
      <Text style={[styles.fareLabel, bold && styles.fareLabelBold]}>
        {label}
      </Text>
      <Text
        style={[
          styles.fareValue,
          bold && styles.fareValueBold,
          highlight && styles.fareValueHighlight,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

function ProgressStep({
  label,
  active,
  done,
}: {
  label: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <View style={styles.progressStep}>
      <View
        style={[
          styles.progressDot,
          active && styles.progressDotActive,
          done && styles.progressDotDone,
        ]}
      />
      <Text
        style={[styles.progressLabel, active && styles.progressLabelActive]}
      >
        {label}
      </Text>
    </View>
  );
}

function ProgressLine() {
  return <View style={styles.progressLine} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: colors.textPrimary, fontSize: 15.5, fontWeight: "700" },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  progressStep: { alignItems: "center", width: 56 },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
    marginBottom: 4,
  },
  progressDotActive: { backgroundColor: colors.primary },
  progressDotDone: { backgroundColor: colors.primary },
  progressLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: "600",
  },
  progressLabelActive: { color: colors.primary },
  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 14,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, paddingTop: 6, paddingBottom: 20 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginTop: 14,
  },
  legHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  airlineName: { color: colors.textPrimary, fontSize: 12.5, fontWeight: "700" },
  flightNumber: { color: colors.textSecondary, fontSize: 9.5, marginTop: 1 },
  editLabel: { color: colors.primary, fontSize: 10.5, fontWeight: "700" },
  miniRouteRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  miniTime: { color: colors.textPrimary, fontSize: 14, fontWeight: "800" },
  miniCode: { color: colors.textSecondary, fontSize: 9.5, marginTop: 1 },
  miniDate: { color: colors.textSecondary, fontSize: 9, marginTop: 4 },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 12.5,
    fontWeight: "700",
    marginBottom: 10,
  },
  passengerName: { color: colors.textSecondary, fontSize: 11 },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 8,
  },
  paymentOptionActive: { borderColor: colors.primary },
  paymentLabel: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 11.5,
    fontWeight: "600",
  },
  paymentLabelActive: { color: colors.textPrimary },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: { borderColor: colors.primary },
  radioDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: colors.primary,
  },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  fareLabel: { color: colors.textSecondary, fontSize: 11 },
  fareLabelBold: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 12.5,
  },
  fareValue: { color: colors.textPrimary, fontSize: 11, fontWeight: "600" },
  fareValueBold: { color: colors.primary, fontWeight: "800", fontSize: 15 },
  fareValueHighlight: { color: "#22C55E" },
  promoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginTop: 14,
  },
  promoText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 11.5,
    fontWeight: "600",
  },
  agreeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 14,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  checkboxActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkboxDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: "#fff",
  },
  agreeLabel: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 10.5,
    lineHeight: 14,
  },
  noticeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 14,
    backgroundColor: "rgba(139, 92, 246, 0.10)",
    borderRadius: 12,
    padding: 10,
  },
  noticeText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 9.5,
    lineHeight: 13,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerLabel: { color: colors.textSecondary, fontSize: 10 },
  footerTotal: { color: colors.primary, fontSize: 18, fontWeight: "800" },
  payBtn: {
    height: 46,
    borderRadius: 13,
    paddingHorizontal: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  payBtnDisabled: { opacity: 0.4 },
  payLabel: { color: "#fff", fontSize: 13, fontWeight: "700" },
});
