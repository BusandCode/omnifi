import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CurrencyCode } from "../../constants/currencies";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

type QuickAction =
  | {
      iconSet: "feather";
      icon: keyof typeof Feather.glyphMap;
      label: string;
      dot?: boolean;
    }
  | {
      iconSet: "mi";
      icon: keyof typeof MaterialIcons.glyphMap;
      label: string;
      dot?: boolean;
    }
  | {
      iconSet: "mci";
      icon: keyof typeof MaterialCommunityIcons.glyphMap;
      label: string;
      dot?: boolean;
    };

const items: QuickAction[] = [
  { iconSet: "feather", icon: "smartphone", label: "Airtime" },
  { iconSet: "feather", icon: "file-text", label: "Bills" },
  { iconSet: "mci", icon: "fingerprint", label: "AI Pay" },
  { iconSet: "mi", icon: "monetization-on", label: "Trade" },
  { iconSet: "feather", icon: "grid", label: "More", dot: true },
];

// Actions that currently only work in NGN. Extend this list as more
// currency-gated flows get wired up.
const NGN_ONLY_LABELS = new Set(["Airtime"]);

type QuickActionsProps = {
  currency: CurrencyCode;
};

export function QuickActions({ currency }: QuickActionsProps) {
  const { colors: themeColors } = useTheme();

  const handlePress = (label: string) => {
    if (NGN_ONLY_LABELS.has(label) && currency !== "NGN") {
      Alert.alert(
        "Switch to NGN",
        "This feature is only available for NGN accounts. Please switch to NGN to continue.",
      );
      return;
    }

    if (label === "Bills") router.push("/bills");
    if (label === "Trade") router.push("/trade");
    if (label === "Airtime") router.push("/airtime");
    if (label === "AI Pay") router.push("/ai-pay");
    if (label === "More") router.push("/more");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColors.textSecondary }]}>
        Quick Actions
      </Text>

      <View style={styles.row}>
        {items.map((it) => (
          <TouchableOpacity
            key={it.label}
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => handlePress(it.label)}
          >
            <View
              style={[styles.iconBox, { backgroundColor: themeColors.surface }]}
            >
              {it.iconSet === "feather" && (
                <Feather
                  name={it.icon}
                  size={20}
                  color={themeColors.primaryLight}
                />
              )}
              {it.iconSet === "mi" && (
                <MaterialIcons
                  name={it.icon}
                  size={20}
                  color={themeColors.primaryLight}
                />
              )}
              {it.iconSet === "mci" && (
                <MaterialCommunityIcons
                  name={it.icon}
                  size={20}
                  color={themeColors.primaryLight}
                />
              )}
              {it.dot && (
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: themeColors.primaryLight },
                  ]}
                />
              )}
              <Text
                style={[styles.label, { color: themeColors.textPrimary }]}
                numberOfLines={1}
              >
                {it.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
    gap: 4,
  },
  item: {
    flex: 1,
  },
  iconBox: {
    width: "94%",
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryLight,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 10,
    textAlign: "center",
  },
});
