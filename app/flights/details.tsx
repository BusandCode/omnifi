// app/flights/details.tsx — flight details for the selected outbound + return legs
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Armchair,
    Bell,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Plane,
    Share2,
    ShieldCheck,
    Wifi,
} from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AirlineLogo from "../../src/components/flights/AirlineLogo";
import { getFlightDetails, TRIP_ROUTE } from "../../src/config/flightMockData";
import { colors } from "../../src/theme/colors";

const BENEFIT_ICONS = [Armchair, Briefcase, Bell, Wifi];

export default function FlightDetailsScreen() {
  const router = useRouter();
  const { flightKey } = useLocalSearchParams<{ flightKey?: string }>();
  const flight = getFlightDetails(flightKey);
  const airline = flight.airlineDetails;

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
        <Text style={styles.title}>Flight details</Text>
        <Pressable style={styles.iconBtn} hitSlop={10}>
          <Share2 color={colors.textPrimary} size={17} />
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
          {flight.outbound.date} • Return • {flight.cabin}
        </Text>

        <View style={styles.card}>
          <View style={styles.legHeaderRow}>
            <AirlineLogo code={flight.airline} size={38} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <View style={styles.legHeaderTop}>
                <Text style={styles.airlineName}>{airline.name}</Text>
                {flight.badge && (
                  <View style={styles.bestBadge}>
                    <Text style={styles.bestBadgeText}>{flight.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.flightNumber}>
                {flight.flightNumber} • {flight.aircraft}
              </Text>
            </View>
            <Pressable style={styles.fareRulesBtn}>
              <Text style={styles.fareRulesLabel}>View fare rules</Text>
            </Pressable>
          </View>

          <View style={styles.timeRow}>
            <View>
              <Text style={styles.time}>{flight.outbound.departTime}</Text>
              <Text style={styles.code}>{flight.outbound.from}</Text>
            </View>
            <View style={styles.durationCol}>
              <Text style={styles.duration}>{flight.outbound.duration}</Text>
              <View style={styles.durationLineRow}>
                <View style={styles.durationDot} />
                <View style={styles.durationLine} />
                <Plane color={colors.primary} size={13} />
              </View>
              <Text style={styles.stops}>{flight.outbound.stops}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.time}>
                {flight.outbound.arriveTime}
                {flight.outbound.arriveNextDay && (
                  <Text style={styles.nextDay}> +1</Text>
                )}
              </Text>
              <Text style={styles.code}>{flight.outbound.to}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <InfoItem icon={Plane} label="Aircraft" value={flight.aircraft} />
            <InfoItem icon={Armchair} label="Cabin" value={flight.cabin} />
            <InfoItem
              icon={Briefcase}
              label="Baggage"
              value={`${flight.checkedBaggage}\n${flight.cabinBaggage}`}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.benefitsTitle}>Your flight benefits</Text>
          <View style={styles.benefitsRow}>
            {flight.benefits.map((benefit, idx) => {
              const Icon = BENEFIT_ICONS[idx % BENEFIT_ICONS.length];
              return (
                <View key={benefit} style={styles.benefitItem}>
                  <View style={styles.benefitIconBubble}>
                    <Icon color={colors.primary} size={16} />
                  </View>
                  <Text style={styles.benefitLabel}>{benefit}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.returnHeaderRow}>
            <View style={styles.returnBadge}>
              <Text style={styles.returnBadgeText}>Return flight</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.route}>
                {TRIP_ROUTE.to} → {TRIP_ROUTE.from}
              </Text>
              <Text style={styles.routeMeta}>
                {flight.return.flightNumber} • {flight.return.date}
              </Text>
            </View>
            <AirlineLogo code={flight.airline} size={30} />
          </View>

          <View style={styles.timeRow}>
            <View>
              <Text style={styles.time}>{flight.return.departTime}</Text>
              <Text style={styles.code}>{flight.return.from}</Text>
            </View>
            <View style={styles.durationCol}>
              <Text style={styles.duration}>{flight.return.duration}</Text>
              <View style={styles.durationLineRow}>
                <View style={styles.durationDot} />
                <View style={styles.durationLine} />
                <Plane color={colors.primary} size={13} />
              </View>
              <Text style={styles.stops}>{flight.return.stops}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.time}>{flight.return.arriveTime}</Text>
              <Text style={styles.code}>{flight.return.to}</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.cancellationRow}>
          <ShieldCheck color={colors.primary} size={18} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.cancellationTitle}>
              Free cancellation within 24 hours of booking
            </Text>
            <Text style={styles.cancellationSubtitle}>
              You can cancel for free within 24 hours of booking this flight.
            </Text>
          </View>
          <ChevronRight color={colors.textSecondary} size={16} />
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total for 1 passenger</Text>
          <Text style={styles.footerTotal}>{flight.fareBreakdown.total}</Text>
          <Text style={styles.footerNote}>Includes taxes and fees</Text>
        </View>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/flights/passenger",
              params: { flightKey },
            })
          }
        >
          <LinearGradient
            colors={[colors.primary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueBtn}
          >
            <Text style={styles.continueLabel}>Continue</Text>
            <ChevronRight color="#fff" size={15} />
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoItem}>
      <Icon color={colors.textSecondary} size={15} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
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
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, paddingTop: 4, paddingBottom: 20 },
  route: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
  routeMeta: {
    color: colors.textSecondary,
    fontSize: 10.5,
    textAlign: "center",
    marginTop: 3,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginTop: 14,
  },
  legHeaderRow: { flexDirection: "row", alignItems: "flex-start" },
  legHeaderTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  airlineName: { color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  bestBadge: {
    backgroundColor: "rgba(139, 92, 246, 0.14)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  bestBadgeText: { color: colors.primary, fontSize: 8.5, fontWeight: "700" },
  flightNumber: { color: colors.textSecondary, fontSize: 9.5, marginTop: 2 },
  fareRulesBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  fareRulesLabel: { color: colors.primary, fontSize: 9, fontWeight: "700" },
  timeRow: { flexDirection: "row", alignItems: "center", marginTop: 14 },
  time: { color: colors.textPrimary, fontSize: 19, fontWeight: "800" },
  nextDay: { color: colors.primary, fontSize: 11, fontWeight: "700" },
  code: { color: colors.textSecondary, fontSize: 10.5, marginTop: 2 },
  durationCol: { flex: 1, alignItems: "center", paddingHorizontal: 10 },
  duration: { color: colors.textSecondary, fontSize: 9.5, marginBottom: 4 },
  durationLineRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 4,
  },
  durationDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.primary,
  },
  durationLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  stops: { color: colors.primary, fontSize: 9.5, fontWeight: "600" },
  infoRow: {
    flexDirection: "row",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  infoItem: { flex: 1, alignItems: "center" },
  infoLabel: { color: colors.textSecondary, fontSize: 9, marginTop: 5 },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
    textAlign: "center",
  },
  benefitsTitle: {
    color: colors.textPrimary,
    fontSize: 12.5,
    fontWeight: "700",
    marginBottom: 12,
  },
  benefitsRow: { flexDirection: "row", justifyContent: "space-between" },
  benefitItem: { alignItems: "center", flex: 1 },
  benefitIconBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(139, 92, 246, 0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  benefitLabel: {
    color: colors.textSecondary,
    fontSize: 8.5,
    textAlign: "center",
    lineHeight: 11,
  },
  returnHeaderRow: { flexDirection: "row", alignItems: "center" },
  returnBadge: {
    backgroundColor: "rgba(139, 92, 246, 0.14)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 8,
  },
  returnBadgeText: { color: colors.primary, fontSize: 8, fontWeight: "700" },
  cancellationRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginTop: 14,
  },
  cancellationTitle: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "700",
  },
  cancellationSubtitle: {
    color: colors.textSecondary,
    fontSize: 9.5,
    marginTop: 2,
    lineHeight: 12,
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
  footerNote: { color: colors.textSecondary, fontSize: 9 },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 46,
    borderRadius: 13,
    paddingHorizontal: 22,
  },
  continueLabel: { color: "#fff", fontSize: 13, fontWeight: "700" },
});
