import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { colors } from "../../theme/colors";

export function ReferEarnCard() {
  return (
    <View>
      <Text style={styles.title}>Continue exploring</Text>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => router.push("/refer-earn")}
      >
        <View style={styles.iconBox}>
          <Feather
            name="gift"
            size={18}
            color={colors.primaryLight}
          />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.cardTitle}>Refer & earn</Text>
          <Text style={styles.sub}>
            Invite friends and earn rewards
          </Text>
        </View>

        <Feather
          name="chevron-right"
          size={18}
          color={colors.textSecondary}
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
