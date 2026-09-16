import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  subtitle?: string;
  showDot?: boolean;
  rightIcon?: "history" | "help";
};

export function SendHeader({
  subtitle = "Send instantly to anyone",
  showDot = false,
  rightIcon = "history",
}: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backBtn, { backgroundColor: themeColors.surface }]}
            hitSlop={8}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={themeColors.textPrimary}
            />
          </TouchableOpacity>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>
            Send Money
          </Text>
        </View>

        {rightIcon === "history" ? (
          <TouchableOpacity style={styles.rightBtn}>
            <Feather name="clock" size={14} color={themeColors.primaryLight} />
            <Text style={[styles.rightText, { color: themeColors.primaryLight }]}>
              History
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.rightCircle, { borderColor: themeColors.primary }]}
          >
            <Feather
              name="help-circle"
              size={14}
              color={themeColors.primaryLight}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.subtitleRow}>
        {showDot && (
          <View style={[styles.dot, { backgroundColor: themeColors.success }]} />
        )}
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: { flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
  },
  rightBtn: { flexDirection: "row", alignItems: "center", gap: 5 },
  rightText: {
    fontSize: 12,
    fontWeight: "600",
  },
  rightCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    marginLeft: 48,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  subtitle: { fontSize: 11 },
});