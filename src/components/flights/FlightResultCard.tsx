// FlightResultCard.tsx — single flight row in the search results list
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AIRLINES, FlightResult } from "../../config/flightMockData";
import { colors } from "../../theme/colors";
import AirlineLogo from "./AirlineLogo";

interface Props {
  flight: FlightResult;
  fromCity: string;
  toCity: string;
  onSelect?: () => void;
}

export default function FlightResultCard({
  flight,
  fromCity,
  toCity,
  onSelect,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <AirlineLogo code={flight.airline} size={34} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.airlineName}>
            {AIRLINES[flight.airline].name}
          </Text>
          <Text style={styles.route}>
            {fromCity} ({flight.from}) → {toCity} ({flight.to})
          </Text>
        </View>
        {flight.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{flight.badge}</Text>
          </View>
        )}
      </View>

      <View style={styles.timeRow}>
        <View>
          <Text style={styles.time}>{flight.departTime}</Text>
          <Text style={styles.code}>{flight.from}</Text>
        </View>

        <View style={styles.durationCol}>
          <Text style={styles.duration}>{flight.duration}</Text>
          <View style={styles.durationLine} />
          <Text style={styles.stops}>{flight.stops}</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.time}>
            {flight.arriveTime}
            {flight.arriveNextDay && <Text style={styles.nextDay}> +1</Text>}
          </Text>
          <Text style={styles.code}>{flight.to}</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <View>
          <Text style={styles.price}>{flight.price}</Text>
          <Text style={styles.priceLabel}>per passenger</Text>
        </View>
        <Pressable
          style={[styles.selectBtn, flight.badge && styles.selectBtnFilled]}
          onPress={onSelect}
        >
          <Text
            style={[
              styles.selectLabel,
              flight.badge && styles.selectLabelFilled,
            ]}
          >
            Select flight →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  airlineName: {
    color: colors.textPrimary,
    fontSize: 12.5,
    fontWeight: "700",
  },
  route: {
    color: colors.textSecondary,
    fontSize: 9.5,
    marginTop: 1,
  },
  badge: {
    backgroundColor: "rgba(139, 92, 246, 0.14)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 8.5,
    fontWeight: "700",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  time: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  nextDay: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "700",
  },
  code: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  durationCol: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  duration: {
    color: colors.textSecondary,
    fontSize: 9.5,
    marginBottom: 4,
  },
  durationLine: {
    width: "100%",
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 4,
  },
  stops: {
    color: colors.primary,
    fontSize: 9.5,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  price: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  priceLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    marginTop: 1,
  },
  selectBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectBtnFilled: {
    backgroundColor: colors.primary,
  },
  selectLabel: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
  },
  selectLabelFilled: {
    color: "#fff",
  },
});
