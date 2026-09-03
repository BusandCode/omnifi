import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

type TabId = "crypto" | "giftcards";
type Props = { active: TabId; onChange: (id: TabId) => void };

export function TradeTabs({ active, onChange }: Props) {
  const { colors: themeColors } = useTheme();
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(13),
      styles: StyleSheet.create({
        row: { flexDirection: "row", gap: s(8) },
        tab: {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: s(6),
          paddingVertical: s(10),
          borderRadius: s(12),
          backgroundColor: themeColors.surface,
        },
        tabInactiveBg: { backgroundColor: themeColors.surfaceAlt },
        tabActive: { backgroundColor: themeColors.primary },
        text: {
          color: themeColors.textSecondary,
          fontSize: f(12),
          fontWeight: "700",
        },
        textActive: { color: "#fff" },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.tab, active === "crypto" && styles.tabActive]}
        onPress={() => onChange("crypto")}
      >
        <Feather
          name="disc"
          size={iconSize}
          color={active === "crypto" ? "#fff" : themeColors.textSecondary}
        />
        <Text style={[styles.text, active === "crypto" && styles.textActive]}>
          Crypto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, styles.tabInactiveBg]}
        onPress={() => router.push("/gift-cards")}
      >
        <Feather
          name="credit-card"
          size={iconSize}
          color={themeColors.textSecondary}
        />
        <Text style={styles.text}>Gift Cards</Text>
      </TouchableOpacity>
    </View>
  );
}
