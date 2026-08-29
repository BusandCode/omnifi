import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, {
    Circle,
    Defs,
    LinearGradient,
    Path,
    Stop,
} from "react-native-svg";
import { fontScale, moderateScale, verticalScale } from "../../theme/scale";
import { colors } from "../../theme/colors";

const ranges = ["1D", "1W", "1M", "3M", "1Y", "ALL"] as const;

const linePath =
  "M0,55 C20,60 35,70 50,68 C70,65 85,45 100,50 C120,55 135,75 150,72 C170,68 185,35 200,38 C220,42 235,20 250,15 C265,10 280,5 300,2";
const areaPath = `${linePath} L300,100 L0,100 Z`;

export function PortfolioChart() {
  const [range, setRange] = useState<(typeof ranges)[number]>("ALL");
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Total portfolio value</Text>
          <TouchableOpacity
            onPress={() => setVisible((v) => !v)}
            hitSlop={8}
            style={styles.eyeButton}
          >
            <Ionicons
              name={visible ? "eye-outline" : "eye-off-outline"}
              size={moderateScale(14)}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.currencyPill}>
          <Text style={styles.flag}>🇳🇬</Text>
          <Text style={styles.currencyText}>NGN</Text>
          <Ionicons name="chevron-down" size={moderateScale(12)} color={colors.textPrimary} />
        </View>
      </View>

      <Text style={styles.amount}>
        {visible ? "NGN 3,745,220.50" : "NGN ••••••••"}
      </Text>

      <View style={styles.changeRow}>
        <Text style={styles.change}>
          {visible ? "▲ NGN 245,220.50 (7.02%)" : "••••••••"}
        </Text>
      </View>
      <Text style={styles.period}>All time</Text>

      <View style={styles.chartWrap}>
        <Svg
          width="100%"
          height={verticalScale(54)}
          viewBox="0 0 300 100"
          preserveAspectRatio="none"
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={colors.primary} stopOpacity={0.35} />
              <Stop offset="1" stopColor={colors.primary} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Path d={areaPath} fill="url(#grad)" stroke="none" />
          <Path
            d={linePath}
            fill="none"
            stroke={colors.primaryLight}
            strokeWidth={2}
          />
          <Circle cx={300} cy={2} r={4} fill="#fff" />
        </Svg>
      </View>

      <View style={styles.rangeRow}>
        {ranges.map((r) => (
          <TouchableOpacity
            key={r}
            onPress={() => setRange(r)}
            style={[styles.rangeBtn, r === range && styles.rangeBtnActive]}
          >
            <Text
              style={[styles.rangeText, r === range && styles.rangeTextActive]}
            >
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1A1225",
    borderRadius: moderateScale(20),
    padding: moderateScale(12),
    borderWidth: 1,
    borderColor: "rgba(167,139,250,0.15)",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(6),
  },
  labelRow: { flexDirection: "row", alignItems: "center", gap: moderateScale(6) },
  label: { color: colors.textSecondary, fontSize: fontScale(13) },
  currencyPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(6),
    backgroundColor: "rgba(167,139,250,0.10)",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(20),
  },
  flag: { fontSize: fontScale(13) },
  currencyText: { color: colors.textPrimary, fontSize: fontScale(10), fontWeight: "500" },
  amount: {
    color: colors.textPrimary,
    fontSize: fontScale(15),
    fontWeight: "500",
    marginBottom: moderateScale(6),
  },
  changeRow: { flexDirection: "row" },
  change: { color: colors.success, fontSize: fontScale(10), fontWeight: "500" },
  period: {
    color: colors.textSecondary,
    fontSize: fontScale(10),
    marginTop: moderateScale(2),
    marginBottom: moderateScale(6),
  },
  chartWrap: { marginBottom: moderateScale(4) },
  eyeButton: { padding: moderateScale(4) },
  rangeRow: { flexDirection: "row", justifyContent: "space-between" },
  rangeBtn: { paddingHorizontal: moderateScale(12), paddingVertical: moderateScale(4), borderRadius: moderateScale(14) },
  rangeBtnActive: { backgroundColor: colors.primary },
  rangeText: { color: colors.textSecondary, fontSize: fontScale(11), fontWeight: "500" },
  rangeTextActive: { color: "#fff" },
});