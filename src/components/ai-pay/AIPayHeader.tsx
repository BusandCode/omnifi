import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

export function AIPayHeader() {
  const layoutScale = useLayoutScale();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(true);
  const balance = 798518301.2;
  const display = visible
    ? `₦ ${balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
    : "₦ ••••••••";

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(20),
      styles: StyleSheet.create({
        wrap: {
          paddingHorizontal: s(16),
          paddingBottom: s(10),
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: "#1C1C1E",
        },
        row: {
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative",
        },
        backBtn: {
          width: s(34),
          height: s(34),
          borderRadius: s(17),
          backgroundColor: colors.surface,
          justifyContent: "center",
          alignItems: "center",
        },
        center: { 
          position: "absolute", 
          left: 0, 
          right: 0, 
          alignItems: "center" 
        },
        titleRow: { 
          flexDirection: "row", 
          alignItems: "center", 
          gap: s(6) 
        },
        title: {
          color: colors.textPrimary,
          fontSize: f(12),
          fontWeight: "600",
          fontFamily: "Urbanist_700Bold",
        },
        subtitle: { 
          color: colors.textSecondary, 
          fontSize: f(10.5), 
          marginTop: s(2) 
        },
        historyBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: s(4),
          paddingTop: s(7),
        },
        historyText: {
          color: colors.primaryLight,
          fontSize: f(11.5),
          fontWeight: "600",
        },
        balancePill: { 
          alignItems: "center", 
          marginTop: s(12) 
        },
        balanceLabelRow: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: s(5),
        },
        balanceLabel: { 
          color: colors.textSecondary, 
          fontSize: f(10.5) 
        },
        balanceValue: {
          color: colors.textPrimary,
          fontSize: f(13),
          fontWeight: "800",
          marginTop: s(3),
        },
      }),
    };
  }, [layoutScale]);

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={iconSize} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.center}>
          <View style={styles.titleRow}>
            <MaterialCommunityIcons
              name="creation"
              size={iconSize - 4}
              color={colors.primaryLight}
            />
            <Text style={styles.title}>AI Pay</Text>
          </View>
          <Text style={styles.subtitle}>Text or voice to pay</Text>
        </View>

        <TouchableOpacity style={styles.historyBtn} hitSlop={8}>
          <Feather name="clock" size={iconSize - 7} color={colors.primaryLight} />
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.balancePill}
        onPress={() => setVisible((v) => !v)}
        activeOpacity={0.8}
      >
        <View style={styles.balanceLabelRow}>
          <Text style={styles.balanceLabel}>Wallet Balance</Text>
          <Ionicons
            name={visible ? "eye-outline" : "eye-off-outline"}
            size={iconSize - 9}
            color={colors.textSecondary}
          />
        </View>
        <Text style={styles.balanceValue}>{display}</Text>
      </TouchableOpacity>
    </View>
  );
}