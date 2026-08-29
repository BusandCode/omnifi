// src/components/swap/SwapFooter.tsx
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

type Badge =
  | { icon: keyof typeof Feather.glyphMap; lib: "feather"; title: string; sub: string }
  | { icon: keyof typeof MaterialIcons.glyphMap; lib: "material"; title: string; sub: string };

const badges: Badge[] = [
  { icon: "zap", lib: "feather", title: "Instant Swap", sub: "Complete in seconds" },
  { icon: "shield", lib: "feather", title: "Secure", sub: "Bank-level security" },
  { icon: "star", lib: "material", title: "Best Rates", sub: "Competitive rates" },
];

export function SwapFooter() {
  return (
    <View>
      <View style={styles.lockRow}>
        <Feather name="lock" size={9} color={colors.textSecondary} />
        <Text style={styles.lockText}>
          Your funds are secure with bank-level encryption
        </Text>
      </View>

      <View style={styles.card}>
        {badges.map((b) => (
          <View key={b.title} style={styles.col}>
            <View style={styles.iconBox}>
              {b.lib === "feather" ? (
                <Feather name={b.icon} size={12} color={colors.primaryLight} />
              ) : (
                <MaterialIcons name={b.icon} size={13} color={colors.primaryLight} />
              )}
            </View>
            <View style={styles.textBlock}>
              <Text style={styles.title}>{b.title}</Text>
              <Text style={styles.sub}>{b.sub}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lockRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    // marginBottom: 8,
    marginTop: 10,
  },
  lockText: { color: colors.textSecondary, fontSize: 9 },
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 16,
  },
  col: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 4,
  },
  iconBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(167,139,250,0.15)",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    shadowColor: "#A78BFA",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 6,
  },
  textBlock: { flex: 1 },
  title: {
    color: colors.textPrimary,
    fontSize: 9,
    fontWeight: "700",
    marginBottom: 1,
  },
  sub: {
    color: colors.textSecondary,
    fontSize: 7,
    lineHeight: 9,
  },
});