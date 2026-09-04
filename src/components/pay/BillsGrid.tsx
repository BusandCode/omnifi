import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontScale, moderateScale } from "../../theme/scale";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { useTheme } from "../../theme/ThemeContext";

type Bill =
  | { family: "feather"; icon: keyof typeof Feather.glyphMap; label: string }
  | {
      family: "mci";
      icon: keyof typeof MaterialCommunityIcons.glyphMap;
      label: string;
    };

const bills: Bill[] = [
  { family: "feather", icon: "smartphone", label: "Airtime" },
  { family: "feather", icon: "wifi", label: "Data" },
  { family: "feather", icon: "zap", label: "Electricity" },
  { family: "feather", icon: "tv", label: "TV" },
  { family: "mci", icon: "soccer", label: "Betting" },
];

export function BillsGrid() {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(20),
      styles: StyleSheet.create({
        wrapper: { marginBottom: s(2) },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: s(14),
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: f(11.5),
          fontWeight: "500",
        },
        viewAll: {
          color: themeColors.primaryLight,
          fontSize: f(12),
          fontWeight: "600",
        },
        row: { flexDirection: "row", justifyContent: "space-between" },
        item: { alignItems: "center", gap: s(8) },
        iconBox: {
          width: s(52),
          height: s(52),
          borderRadius: s(16),
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderColor: themeColors.primaryTint,
          justifyContent: "center",
          alignItems: "center",
        },
        label: { color: themeColors.textPrimary, fontSize: f(11) },
        card: {
          backgroundColor: themeColors.surface,
          borderRadius: s(16),
          padding: s(12),
          marginBottom: s(14),
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Pay bills & top up</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {bills.map((b) => (
            <TouchableOpacity
              key={b.label}
              style={styles.item}
              onPress={() => {
                if (b.label === "Airtime") router.push("/airtime");
                if (b.label === "Data") router.push("/data");
                if (b.label === "Betting") router.push("/betting");
              }}
            >
              <View style={styles.iconBox}>
                {b.family === "feather" ? (
                  <Feather
                    name={b.icon}
                    size={iconSize}
                    color={themeColors.primaryLight}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={b.icon}
                    size={iconSize}
                    color={themeColors.primaryLight}
                  />
                )}
              </View>
              <Text style={styles.label}>{b.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
