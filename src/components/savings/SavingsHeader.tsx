import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

export function SavingsHeader() {
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        },
        iconBtn: {
          width: 36,
          height: 36,
          borderRadius: 18,
          borderWidth: 1.2,
          borderColor: themeColors.primary,
          justifyContent: "center",
          alignItems: "center",
        },
        title: {
          position: "absolute",
          left: 0,
          right: 0,
          textAlign: "center",
          color: themeColors.textPrimary,
          fontSize: 17,
          fontWeight: "700",
        },
        goalsBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          borderWidth: 1.2,
          borderColor: themeColors.primary,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 7,
        },
        goalsText: { color: themeColors.primaryLight, fontSize: 11.5, fontWeight: "600" },
      }),
    [themeColors]
  );

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.iconBtn}
        hitSlop={8}
      >
        <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Savings</Text>
      <TouchableOpacity style={styles.goalsBtn}>
        <Feather name="target" size={13} color={themeColors.primaryLight} />
        <Text style={styles.goalsText}>Goals</Text>
      </TouchableOpacity>
    </View>
  );
}