import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Line, Rect } from "react-native-svg";

const balance = "245,780.50";

function MiniCard() {
  return (
    <View style={styles.cardWrap}>
      <LinearGradient
        colors={["#6A3FD9", "#3A1C7A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.cardShape, styles.cardBack]}
      />
      <View style={[styles.cardShape, styles.cardFront]}>
        <Svg
          width={22}
          height={16}
          viewBox="0 0 22 16"
          style={{ position: "absolute", left: 10, top: 30 }}
        >
          <Rect x={0} y={0} width={22} height={16} rx={3} fill="#D9D9D9" />
          <Line
            x1={7}
            y1={0}
            x2={7}
            y2={16}
            stroke="#B0B0B0"
            strokeWidth={0.6}
          />
          <Line
            x1={15}
            y1={0}
            x2={15}
            y2={16}
            stroke="#B0B0B0"
            strokeWidth={0.6}
          />
        </Svg>
        <Text style={styles.visaText}>VISA</Text>
      </View>
    </View>
  );
}

export function LifestyleBalanceCard() {
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.outerWrap}>
      <LinearGradient
        colors={["#1A0B33", "#3A1878", "#0A0612"]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 0.9 }}
        style={StyleSheet.absoluteFill}
      />
      {/* diagonal light streak */}
      <LinearGradient
        colors={["transparent", "rgba(167,139,250,0.35)", "transparent"]}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={styles.label}>LIFESTYLE BALANCE</Text>
          <View style={styles.amountRow}>
            <Text style={styles.currency}>NGN</Text>
            <Text style={styles.amount}>{visible ? balance : "••••••"}</Text>
            <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
              <Ionicons
                name={visible ? "eye-outline" : "eye-off-outline"}
                size={15}
                color="rgba(255,255,255,0.7)"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.sub}>Available to spend</Text>
        </View>

        <MiniCard />
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.topUpBtn}>
          <Feather name="plus" size={13} color="#000" />
          <Text style={styles.topUpText}>Top up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewCardRow}>
          <Text style={styles.viewCardText}>View card</Text>
          <Feather name="chevron-right" size={13} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrap: {
    borderRadius: 24,
    padding: 14,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  left: { flex: 1 },
  label: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 9.5,
    fontWeight: "600",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 5,
  },
  currency: { color: "#fff", fontSize: 11, fontWeight: "600" },
  amount: { color: "#fff", fontSize: 16, fontWeight: "700" },
  sub: { color: "rgba(255,255,255,0.5)", fontSize: 10 },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topUpBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  topUpText: { color: "#000", fontSize: 11, fontWeight: "700" },
  viewCardRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  viewCardText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  cardWrap: { width: 100, height: 72, position: "relative" },
  cardShape: { position: "absolute", width: 84, height: 52, borderRadius: 10 },
  cardBack: {
    top: 0,
    right: 0,
    transform: [{ rotate: "10deg" }],
  },
  cardFront: {
    backgroundColor: "#141118",
    top: 16,
    right: 14,
    transform: [{ rotate: "-6deg" }],
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.08)",
  },
  visaText: {
    position: "absolute",
    top: 8,
    right: 10,
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    fontStyle: "italic",
  },
});
