import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";
import { FOREIGN_SEND_METHODS, ForeignCurrency, SendMethodId } from "../../constants/foreignSendData";

type Props = {
  currency: ForeignCurrency;
  selected: SendMethodId;
  onSelect: (id: SendMethodId) => void;
};

export function SendMethodIcons({ currency, selected, onSelect }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(17),
      styles: StyleSheet.create({
        row: { flexDirection: "row", justifyContent: "space-between" },
        item: { alignItems: "center", gap: s(6), width: s(56) },
        iconBox: {
          width: s(44), height: s(44), borderRadius: s(22),
          backgroundColor: themeColors.surface,
          justifyContent: "center", alignItems: "center",
          borderWidth: 1.5, borderColor: "transparent",
        },
        iconBoxActive: { borderColor: themeColors.primary },
        label: { color: themeColors.textPrimary, fontSize: f(8.5), fontWeight: "600", textAlign: "center" },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.row}>
      {FOREIGN_SEND_METHODS.map((m) => {
        const active = m.id === selected;
        const Icon = m.icon.lib === "Ionicons" ? Ionicons : Feather;
        return (
          <TouchableOpacity key={m.id} style={styles.item} onPress={() => onSelect(m.id)}>
            <View style={[styles.iconBox, active && styles.iconBoxActive]}>
              <Icon
                name={m.icon.name as any}
                size={iconSize}
                color={active ? themeColors.primaryLight : themeColors.textSecondary}
              />
            </View>
            <Text style={styles.label} numberOfLines={2}>{m.label(currency)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}