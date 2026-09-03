import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { fontScale, moderateScale } from "../../theme/scale";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { useTheme } from "../../theme/ThemeContext";

type Payment = {
  name: string;
  sub: string;
  amount: string;
  time: string;
  negative: boolean;
  icon: keyof typeof Feather.glyphMap;
  bg: string;
};

const payments: Payment[] = [
  {
    name: "Andrew O.",
    sub: "GTBank • 1234567890",
    amount: "- NGN 25,000.00",
    time: "Today, 9:30 AM",
    negative: true,
    icon: "arrow-up-right",
    bg: colors.primary,
  },
  {
    name: "PHCN Prepaid",
    sub: "Electricity • 1102 3494 0853",
    amount: "- NGN 12,500.00",
    time: "Yesterday, 7:15 PM",
    negative: true,
    icon: "file-text",
    bg: "rgba(167,139,250,0.2)",
  },
  {
    name: "Aisha M.",
    sub: "Access Bank • 08123456789",
    amount: "- NGN 50,000.00",
    time: "May 18, 1:42 PM",
    negative: true,
    icon: "arrow-up-right",
    bg: colors.primary,
  },
  {
    name: "Oluwaseun O.",
    sub: "Opay • 09012345678",
    amount: "+ NGN 15,000.00",
    time: "May 17, 8:20 PM",
    negative: false,
    icon: "arrow-down-left",
    bg: colors.success,
  },
];

export function RecentPayments() {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(14),
      styles: StyleSheet.create({
        card: {
          backgroundColor: themeColors.surface,
          borderRadius: s(16),
          padding: s(10),
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: s(6),
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: f(13),
          fontWeight: "500",
        },
        viewAll: {
          color: themeColors.primaryLight,
          fontSize: f(12),
          fontWeight: "600",
        },
        row: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: s(6),
        },
        left: {
          flexDirection: "row",
          alignItems: "center",
          gap: s(11),
        },
        iconCircle: {
          width: s(38),
          height: s(38),
          borderRadius: s(19),
          justifyContent: "center",
          alignItems: "center",
        },
        name: {
          color: themeColors.textPrimary,
          fontSize: f(10),
          fontWeight: "600",
        },
        sub: {
          color: themeColors.textSecondary,
          fontSize: f(9),
          marginTop: s(1),
        },
        amount: {
          fontSize: f(10),
          fontWeight: "600",
        },
        time: {
          color: themeColors.textSecondary,
          fontSize: f(8.5),
          marginTop: s(1),
        },
        rightColumn: {
          alignItems: "flex-end",
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent payments</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      {payments.map((p) => (
        <View key={p.name + p.time} style={styles.row}>
          <View style={styles.left}>
            <View style={[styles.iconCircle, { backgroundColor: p.bg }]}>
              <Feather
                name={p.icon}
                size={iconSize}
                color={
                  p.icon === "file-text" ? themeColors.primaryLight : "#fff"
                }
              />
            </View>
            <View>
              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.sub}>{p.sub}</Text>
            </View>
          </View>
          <View style={styles.rightColumn}>
            <Text
              style={[
                styles.amount,
                {
                  color: p.negative
                    ? themeColors.textPrimary
                    : themeColors.success,
                },
              ]}
            >
              {p.amount}
            </Text>
            <Text style={styles.time}>{p.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
