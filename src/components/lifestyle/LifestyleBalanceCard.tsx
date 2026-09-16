import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Line, Rect } from "react-native-svg";
import { useTheme } from "../../theme/ThemeContext";

const balance = "245,780.50";

function MiniCard({ isLight }: { isLight: boolean }) {
  return (
    <View style={styles.cardWrap}>
      <LinearGradient
        colors={isLight ? ["#B9A3EE", "#8F6FE0"] : ["#6A3FD9", "#3A1C7A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.cardShape, styles.cardBack]}
      />
      <View
        style={[
          styles.cardShape,
          styles.cardFront,
          isLight
            ? { backgroundColor: "#FFFFFF", borderColor: "rgba(46,20,90,0.1)" }
            : { backgroundColor: "#141118", borderColor: "rgba(255,255,255,0.08)" },
        ]}
      >
        <Svg
          width={22}
          height={16}
          viewBox="0 0 22 16"
          style={{ position: "absolute", left: 10, top: 30 }}
        >
          <Rect x={0} y={0} width={22} height={16} rx={3} fill="#D9D9D9" />
          <Line x1={7} y1={0} x2={7} y2={16} stroke="#B0B0B0" strokeWidth={0.6} />
          <Line x1={15} y1={0} x2={15} y2={16} stroke="#B0B0B0" strokeWidth={0.6} />
        </Svg>
        <Text style={[styles.visaText, { color: isLight ? "#2E145A" : "#fff" }]}>
          VISA
        </Text>
      </View>
    </View>
  );
}

export function LifestyleBalanceCard() {
  const { mode, colors: themeColors } = useTheme();
  const [visible, setVisible] = useState(true);
  const isLight = mode === "light";

  const gradientColors = isLight
    ? (["#FFFFFF", "#F7F3FD", "#EFE7FB"] as const)
    : (["#1A0B33", "#3A1878", "#0A0612"] as const);

  const streakColors = isLight
    ? (["transparent", "rgba(124,79,224,0.12)", "transparent"] as const)
    : (["transparent", "rgba(167,139,250,0.35)", "transparent"] as const);

  const fg = isLight
    ? {
        label: "rgba(46,20,90,0.55)",
        text: "#2E145A",
        sub: "rgba(46,20,90,0.5)",
        eye: "rgba(46,20,90,0.55)",
        viewCard: "#2E145A",
      }
    : {
        label: "rgba(255,255,255,0.55)",
        text: "#fff",
        sub: "rgba(255,255,255,0.5)",
        eye: "rgba(255,255,255,0.7)",
        viewCard: "#fff",
      };

  const styles2 = useMemo(
    () =>
      StyleSheet.create({
        topUpBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: isLight ? themeColors.primary : "#fff",
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 14,
        },
        topUpText: { color: isLight ? "#fff" : "#000", fontSize: 11, fontWeight: "700" },
      }),
    [isLight, themeColors]
  );

  return (
    <View style={styles.outerWrap}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 0.9 }}
        style={StyleSheet.absoluteFill}
      />
      {/* diagonal light streak */}
      <LinearGradient
        colors={streakColors}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={[styles.label, { color: fg.label }]}>LIFESTYLE BALANCE</Text>
          <View style={styles.amountRow}>
            <Text style={[styles.currency, { color: fg.text }]}>NGN</Text>
            <Text style={[styles.amount, { color: fg.text }]}>
              {visible ? balance : "••••••"}
            </Text>
            <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
              <Ionicons
                name={visible ? "eye-outline" : "eye-off-outline"}
                size={15}
                color={fg.eye}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.sub, { color: fg.sub }]}>Available to spend</Text>
        </View>

        <MiniCard isLight={isLight} />
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles2.topUpBtn}>
          <Feather name="plus" size={13} color={isLight ? "#fff" : "#000"} />
          <Text style={styles2.topUpText}>Top up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewCardRow}>
          <Text style={[styles.viewCardText, { color: fg.viewCard }]}>View card</Text>
          <Feather name="chevron-right" size={13} color={fg.viewCard} />
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
  currency: { fontSize: 11, fontWeight: "600" },
  amount: { fontSize: 16, fontWeight: "700" },
  sub: { fontSize: 10 },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewCardRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  viewCardText: { fontSize: 11, fontWeight: "600" },
  cardWrap: { width: 100, height: 72, position: "relative" },
  cardShape: { position: "absolute", width: 84, height: 52, borderRadius: 10 },
  cardBack: {
    top: 0,
    right: 0,
    transform: [{ rotate: "10deg" }],
  },
  cardFront: {
    top: 16,
    right: 14,
    transform: [{ rotate: "-6deg" }],
    borderWidth: 0.5,
  },
  visaText: {
    position: "absolute",
    top: 8,
    right: 10,
    fontSize: 12,
    fontWeight: "800",
    fontStyle: "italic",
  },
});