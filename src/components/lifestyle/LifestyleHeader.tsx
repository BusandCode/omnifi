import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

export function LifestyleHeader() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      <View>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Lifestyle
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          Explore, shop and enjoy exclusive offers
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.iconBtn, { backgroundColor: themeColors.surface }]}
      >
        <Feather name="search" size={15} color={themeColors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: "700" },
  subtitle: { color: colors.textSecondary, fontSize: 9.5, marginTop: 2 },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
});
