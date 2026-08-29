import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../../theme/colors";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

function ProgressRing({
  progress,
  size,
  children,
}: {
  progress: number;
  size: number;
  children: React.ReactNode;
}) {
  const strokeWidth = size * 0.06;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(167,139,250,0.2)" strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primaryLight}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>{children}</View>
    </View>
  );
}

export function InsightsCard() {
  const layoutScale = useLayoutScale();

  const { styles, ringSize, iconSize, pieIconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      ringSize: s(42),
      iconSize: s(15),
      pieIconSize: s(19),
      styles: StyleSheet.create({
        card: { backgroundColor: colors.surface, borderRadius: s(16), padding: s(12), marginTop: -7 },
        header: { flexDirection: "row", justifyContent: "space-between", marginBottom: s(14) },
        title: { color: colors.textPrimary, fontSize: f(12), fontWeight: "500" },
        viewAll: { color: colors.primaryLight, fontSize: f(12), fontWeight: "500", marginRight: s(13) },
        row: { flexDirection: "row", alignItems: "center" },
        col: { flex: 1, flexDirection: "row", alignItems: "center", gap: s(10) },
        divider: { width: 1, height: s(40), backgroundColor: "#2C2C2E", marginHorizontal: s(12) },
        pieBox: {
          width: s(42),
          height: s(42),
          borderRadius: s(21),
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
          borderColor: "rgba(167,139,250,0.3)",
        },
        textBlock: { flex: 1 },
        label: { color: colors.textSecondary, fontSize: f(10.5), marginBottom: s(2) },
        value: { fontSize: f(12), fontWeight: "700", marginBottom: s(1) },
        sub: { color: colors.textSecondary, fontSize: f(9.5) },
      }),
    };
  }, [layoutScale]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Investment insights</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.col}>
            <ProgressRing progress={0.7} size={ringSize}>
              <Feather name="dollar-sign" size={iconSize} color={colors.primaryLight} />
            </ProgressRing>
            <View style={styles.textBlock}>
              <Text style={styles.label}>You've earned</Text>
              <Text style={[styles.value, { color: colors.success }]}>NGN 245,220.50</Text>
              <Text style={styles.sub}>7.02% all time return</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.col}>
            <View style={styles.pieBox}>
              <Feather name="pie-chart" size={pieIconSize} color={colors.primaryLight} />
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.label}>Your risk profile</Text>
              <Text style={[styles.value, { color: colors.primaryLight }]}>Moderate</Text>
              <Text style={styles.sub}>Balanced approach</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}