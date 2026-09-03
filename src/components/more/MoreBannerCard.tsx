// MoreBannerCard.tsx — "Everything you need, all in one place" promo banner
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Wallet, ChevronRight } from "lucide-react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

interface Props {
  onPress?: () => void;
}

export default function MoreBannerCard({ onPress }: Props) {
  const { colors: themeColors } = useTheme();
  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: themeColors.primaryTint,
          borderColor: themeColors.primaryTint,
        },
      ]}
      onPress={onPress}
    >
      <View
        style={[styles.iconBubble, { backgroundColor: themeColors.surface }]}
      >
        <Wallet color={themeColors.primary} size={22} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Everything you need, all in one place
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          Fast, secure and reliable payments
        </Text>
      </View>
      <View style={styles.chevronBubble}>
        <ChevronRight color={themeColors.primary} size={16} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.35)",
    padding: 14,
    marginTop: 4,
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 10.5,
  },
  chevronBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
