import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { fontScale, moderateScale } from "../../theme/scale";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { useTheme } from "../../theme/ThemeContext";

function ProgressRing({
  progress,
  size,
  children,
}: {
  progress: number;
  size: number;
  children: React.ReactNode;
}) {
  const { colors: themeColors } = useTheme();
  const strokeWidth = size * 0.06;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(167,139,250,0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={themeColors.primaryLight}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {children}
      </View>
    </View>
  );
}

export function InsightsCard() {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, ringSize, iconSize, pieIconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      ringSize: s(42),
      iconSize: s(15),
      pieIconSize: s(19),
      styles: StyleSheet.create({
        card: {
          backgroundColor: themeColors.surface,
          borderRadius: s(16),
          padding: s(12),
          marginTop: -7,
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: s(14),
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: f(12),
          fontWeight: "500",
        },
        viewAll: {
          color: themeColors.primaryLight,
          fontSize: f(12),
          fontWeight: "500",
          marginRight: s(13),
        },
        row: { flexDirection: "row", alignItems: "center" },
        col: {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: s(10),
        },
        divider: {
          width: 1,
          height: s(40),
          backgroundColor: themeColors.border,
          marginHorizontal: s(12),
        },
        pieBox: {
          width: s(42),
          height: s(42),
          borderRadius: s(21),
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
          borderColor: themeColors.primaryTint,
        },
        textBlock: { flex: 1 },
        label: {
          color: themeColors.textSecondary,
          fontSize: f(10.5),
          marginBottom: s(2),
        },
        value: { fontSize: f(12), fontWeight: "700", marginBottom: s(1) },
        sub: { color: themeColors.textSecondary, fontSize: f(9.5) },
      }),
    };
  }, [layoutScale, themeColors]);

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
              <Feather
                name="dollar-sign"
                size={iconSize}
                color={themeColors.primaryLight}
              />
            </ProgressRing>
            <View style={styles.textBlock}>
              <Text style={styles.label}>You&apos;ve earned</Text>
              <Text style={[styles.value, { color: themeColors.success }]}>
                NGN 245,220.50
              </Text>
              <Text style={styles.sub}>7.02% all time return</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.col}>
            <View style={styles.pieBox}>
              <Feather
                name="pie-chart"
                size={pieIconSize}
                color={themeColors.primaryLight}
              />
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.label}>Your risk profile</Text>
              <Text style={[styles.value, { color: themeColors.primaryLight }]}>
                Moderate
              </Text>
              <Text style={styles.sub}>Balanced approach</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
