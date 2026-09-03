import { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

type Action = {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  sub: string;
};

const actions: Action[] = [
  { id: "buy", icon: "arrow-down", title: "Buy", sub: "Get crypto" },
  { id: "sell", icon: "arrow-up", title: "Sell", sub: "Sell crypto" },
  { id: "send", icon: "send", title: "Send", sub: "Send crypto" },
  { id: "receive", icon: "download", title: "Receive", sub: "Receive crypto" },
];

type Props = { selected: string; onSelect: (id: string) => void };

function ActionsRow({ selected, onSelect }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(14),
      styles: StyleSheet.create({
        row: {
          flexDirection: "row",
          backgroundColor: themeColors.surface,
          borderRadius: s(14),
          padding: s(5),
        },
        item: {
          flex: 1,
          alignItems: "center",
          gap: s(5),
          paddingVertical: s(8),
          borderRadius: s(10),
        },
        itemActive: {
          backgroundColor: "#2A1858",
          borderWidth: 1,
          borderColor: colors.primary,
        },
        iconBox: {
          width: s(30),
          height: s(30),
          borderRadius: s(15),
          backgroundColor: themeColors.surfaceAlt,
          justifyContent: "center",
          alignItems: "center",
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: f(10.5),
          fontWeight: "700",
        },
        sub: {
          color: themeColors.textSecondary,
          fontSize: f(8.5),
          textAlign: "center",
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.row}>
      {actions.map((a) => {
        const active = a.id === selected;
        return (
          <TouchableOpacity
            key={a.id}
            style={[styles.item, active && styles.itemActive]}
            onPress={() => onSelect(a.id)}
          >
            <View style={styles.iconBox}>
              <Feather
                name={a.icon}
                size={iconSize}
                color={themeColors.textPrimary}
              />
            </View>
            <Text style={styles.title}>{a.title}</Text>
            <Text style={styles.sub}>{a.sub}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function CryptoTradeSection() {
  const [selected, setSelected] = useState("receive");
  const { colors: themeColors } = useTheme();

  const layoutScale = useLayoutScale();

  const { styles } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      styles: StyleSheet.create({
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: s(10),
        },
        sectionTitle: {
          color: themeColors.textPrimary,
          fontSize: f(13.5),
          fontWeight: "700",
        },
        sectionSub: {
          color: themeColors.textSecondary,
          fontSize: f(10),
          marginTop: s(2),
        },
        viewMarkets: { flexDirection: "row", alignItems: "center", gap: s(2) },
        viewMarketsText: {
          color: themeColors.primaryLight,
          fontSize: f(10.5),
          fontWeight: "600",
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.sectionTitle}>Crypto Trade</Text>
          <Text style={styles.sectionSub}>
            Buy, sell and trade crypto instantly
          </Text>
        </View>
        <TouchableOpacity style={styles.viewMarkets}>
          <Text style={styles.viewMarketsText}>View Markets</Text>
          <Feather
            name="chevron-right"
            size={12}
            color={themeColors.primaryLight}
          />
        </TouchableOpacity>
      </View>

      <ActionsRow selected={selected} onSelect={setSelected} />
    </View>
  );
}
