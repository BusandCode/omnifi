import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

export function ReferEarnCard() {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>
        Continue exploring
      </Text>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: themeColors.surface }]}
        activeOpacity={0.7}
        onPress={() => router.push("/refer-earn")}
      >
        <View
          style={[styles.iconBox, { backgroundColor: themeColors.primaryTint }]}
        >
          <Feather name="gift" size={18} color={themeColors.primaryLight} />
        </View>

        <View style={styles.textBlock}>
          <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>
            Refer & earn
          </Text>
          <Text style={[styles.sub, { color: themeColors.textSecondary }]}>
            Invite friends and earn rewards
          </Text>
        </View>

        <Feather
          name="chevron-right"
          size={18}
          color={themeColors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: -8,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(167,139,250,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  textBlock: {
    flex: 1,
  },

  cardTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },

  sub: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
});
