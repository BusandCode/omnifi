import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

const ICON_SIZE = 20;

export function AIPayHeader() {
  const { colors: themeColors } = useTheme();
  const [visible, setVisible] = useState(true);
  const balance = 798518301.2;
  const display = visible
    ? `₦ ${balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`
    : "₦ ••••••••";

  const styles = StyleSheet.create({
    wrap: {
      paddingHorizontal: 16,
      paddingBottom: 10,
      backgroundColor: themeColors.background,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.border,
    },
    row: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      position: "relative",
    },
    backBtn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: themeColors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    center: {
      position: "absolute",
      left: 0,
      right: 0,
      alignItems: "center",
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    title: {
      color: themeColors.textPrimary,
      fontSize: 12,
      fontWeight: "600",
      fontFamily: "Urbanist_700Bold",
    },
    subtitle: {
      color: themeColors.textSecondary,
      fontSize: 10.5,
      marginTop: 2,
    },
    historyBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingTop: 7,
    },
    historyText: {
      color: themeColors.primaryLight,
      fontSize: 11.5,
      fontWeight: "600",
    },
    balancePill: {
      alignItems: "center",
      marginTop: 12,
    },
    balanceLabelRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
    },
    balanceLabel: {
      color: themeColors.textSecondary,
      fontSize: 10.5,
    },
    balanceValue: {
      color: themeColors.textPrimary,
      fontSize: 13,
      fontWeight: "800",
      marginTop: 3,
    },
  });

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={ICON_SIZE} color={themeColors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.center}>
          <View style={styles.titleRow}>
            <MaterialCommunityIcons
              name="creation"
              size={ICON_SIZE - 4}
              color={themeColors.primaryLight}
            />
            <Text style={styles.title}>AI Pay</Text>
          </View>
          <Text style={styles.subtitle}>Text or voice to pay</Text>
        </View>

        <TouchableOpacity style={styles.historyBtn} hitSlop={8}>
          <Feather name="clock" size={ICON_SIZE - 7} color={themeColors.primaryLight} />
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
            size={ICON_SIZE - 9}
            color={themeColors.textSecondary}
          />
        </View>
        <Text style={styles.balanceValue}>{display}</Text>
      </TouchableOpacity>
    </View>
  );
}