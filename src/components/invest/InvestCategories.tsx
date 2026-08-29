import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

type Category =
  | {
      iconSet: "feather";
      icon: keyof typeof Feather.glyphMap;
      title: string;
      sub: string;
    }
  | {
      iconSet: "mci";
      icon: keyof typeof MaterialCommunityIcons.glyphMap;
      title: string;
      sub: string;
    };

const categories: Category[] = [
  { iconSet: "feather", icon: "bar-chart-2", title: "Mutual Funds", sub: "Diversified growth" },
  { iconSet: "feather", icon: "trending-up", title: "Stocks", sub: "Invest in top companies" },
  { iconSet: "feather", icon: "globe", title: "US Stocks", sub: "Access global markets" },
  { iconSet: "mci", icon: "shield-check-outline", title: "Fixed Income", sub: "Low risk, steady returns" },
  { iconSet: "mci", icon: "gold", title: "Gold", sub: "Hedge and store value" },
];

export function InvestCategories() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(19),
      styles: StyleSheet.create({
        wrapper: {},
        row: { flexDirection: "row", alignItems: "stretch", gap: s(6) },
        card: {
          flex: 1,
          minHeight: s(84),
          backgroundColor: colors.surface,
          borderRadius: s(14),
          paddingVertical: s(8),
          paddingHorizontal: s(4),
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: s(6),
          marginBottom: s(6),
        },
        icon: { marginBottom: s(7) },
        title: {
          color: colors.textPrimary,
          fontSize: f(10),
          fontWeight: "500",
          textAlign: "center",
          marginBottom: s(4),
        },
        sub: {
          color: colors.textSecondary,
          fontSize: f(9),
          lineHeight: f(12),
          textAlign: "center",
        },
      }),
    };
  }, [layoutScale]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        {categories.map((c) => (
          <TouchableOpacity key={c.title} style={styles.card} activeOpacity={0.7}>
            {c.iconSet === "feather" ? (
              <Feather name={c.icon} size={iconSize} color={colors.primaryLight} style={styles.icon} />
            ) : (
              <MaterialCommunityIcons name={c.icon} size={iconSize + 1} color={colors.primaryLight} style={styles.icon} />
            )}
            <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
              {c.title}
            </Text>
            <Text style={styles.sub} numberOfLines={2}>
              {c.sub}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}