import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

export function InvestHeader() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Invest
        </Text>
        <View style={styles.iconsRow}>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: themeColors.surface }]}
          >
            <Feather name="search" size={18} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: themeColors.surface }]}
          >
            <Feather name="bell" size={18} color={themeColors.textPrimary} />
            <View
              style={[
                styles.dot,
                { backgroundColor: themeColors.primaryLight },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
        Grow your money. Secure your future.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // wrapper: { marginBottom: 20 },
  // wrapper: { marginBottom: 14 },
  wrapper: {},
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: "500" },
  subtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 4 },
  iconsRow: { flexDirection: "row", gap: 10 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    position: "absolute",
    top: 6,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryLight,
  },
});
