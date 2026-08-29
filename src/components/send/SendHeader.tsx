import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

type Props = {
  subtitle?: string;
  showDot?: boolean;
  rightIcon?: "history" | "help";
};

export function SendHeader({ subtitle = "Send instantly to anyone", showDot = false, rightIcon = "history" }: Props) {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(20),
      styles: StyleSheet.create({
        topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
        left: { flexDirection: "row", alignItems: "center", gap: s(12) },
        backBtn: {
          width: s(36), height: s(36), borderRadius: s(18), backgroundColor: colors.surface,
          justifyContent: "center", alignItems: "center",
        },
        title: { color: colors.textPrimary, fontSize: f(17), fontWeight: "700" },
        rightBtn: { flexDirection: "row", alignItems: "center", gap: s(5) },
        rightText: { color: colors.primaryLight, fontSize: f(11), fontWeight: "600" },
        rightCircle: {
          width: s(30), height: s(30), borderRadius: s(15),
          borderWidth: 1.5, borderColor: colors.primary,
          justifyContent: "center", alignItems: "center",
        },
        subtitleRow: { flexDirection: "row", alignItems: "center", gap: s(5), marginTop: s(6), marginLeft: s(48) },
        dot: { width: s(6), height: s(6), borderRadius: s(3), backgroundColor: colors.success },
        subtitle: { color: colors.textSecondary, fontSize: f(10) },
      }),
    };
  }, [layoutScale]);

  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={iconSize} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Send Money</Text>
        </View>

        {rightIcon === "history" ? (
          <TouchableOpacity style={styles.rightBtn}>
            <Feather name="clock" size={iconSize - 6} color={colors.primaryLight} />
            <Text style={styles.rightText}>History</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.rightCircle}>
            <Feather name="help-circle" size={iconSize - 6} color={colors.primaryLight} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.subtitleRow}>
        {showDot && <View style={styles.dot} />}
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}