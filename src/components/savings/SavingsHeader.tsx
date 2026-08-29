import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";

export function SavingsHeader() {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.iconBtn}
        hitSlop={8}
      >
        <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Savings</Text>
      <TouchableOpacity style={styles.goalsBtn}>
        <Feather name="target" size={13} color={colors.primaryLight} />
        <Text style={styles.goalsText}>Goals</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "700",
  },
  goalsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1.2,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  goalsText: { color: colors.primaryLight, fontSize: 11.5, fontWeight: "600" },
});
