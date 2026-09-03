import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

type Action = { icon: keyof typeof Feather.glyphMap; label: string };

const actions: Action[] = [
  { icon: "user", label: "Personal" },
  { icon: "shield", label: "Security" },
  { icon: "file-text", label: "Statements" },
  { icon: "credit-card", label: "Limits" },
  { icon: "settings", label: "Preferences" },
];

export function QuickActionsGrid() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      {actions.map((a) => (
        <TouchableOpacity key={a.label} style={styles.item}>
          <View
            style={[
              styles.iconBox,
              { backgroundColor: themeColors.primaryTint },
            ]}
          >
            <Feather name={a.icon} size={16} color={themeColors.primaryLight} />
          </View>
          <Text
            style={[styles.label, { color: themeColors.textPrimary }]}
            numberOfLines={1}
          >
            {a.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderRadius: 13,
    padding: 10,
  },
  item: { alignItems: "center", gap: 6, flex: 1 },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(167,139,250,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  label: { color: colors.textPrimary, fontSize: 8.5, textAlign: "center" },
});
