import { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";
import { ForeignAccountBrief } from "../../constants/foreignSendData";

type Props = { account: ForeignAccountBrief };

export function SendAccountCard({ account }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(11),
      styles: StyleSheet.create({
        card: { backgroundColor: themeColors.surface, borderRadius: s(16), padding: s(14), overflow: "hidden" },
        topRow: { flexDirection: "row", alignItems: "center", gap: s(8) },
        flagCircle: {
          width: s(28), height: s(28), borderRadius: s(14),
          backgroundColor: themeColors.primaryTint,
          justifyContent: "center", alignItems: "center",
        },
        flagText: { fontSize: f(14) },
        nameCol: { flex: 1 },
        accountName: { color: themeColors.textPrimary, fontSize: f(12.5), fontWeight: "700" },
        activeRow: { flexDirection: "row", alignItems: "center", gap: s(4), marginTop: s(2) },
        activeDot: { width: s(6), height: s(6), borderRadius: s(3), backgroundColor: themeColors.success },
        activeText: { color: themeColors.success, fontSize: f(9.5), fontWeight: "600" },
        balance: { color: themeColors.textPrimary, fontSize: f(26), fontWeight: "700", marginTop: s(12) },
        balanceLabelRow: { flexDirection: "row", alignItems: "center", gap: s(4), marginTop: s(2) },
        balanceLabel: { color: themeColors.textSecondary, fontSize: f(10) },
        watermark: {
          position: "absolute", right: s(-4), top: s(10),
          fontSize: f(72), fontWeight: "700", color: themeColors.primaryTint,
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.card}>
      <Text style={styles.watermark}>{account.symbol}</Text>
      <View style={styles.topRow}>
        <View style={styles.flagCircle}>
          <Text style={styles.flagText}>{account.flagEmoji}</Text>
        </View>
        <View style={styles.nameCol}>
          <Text style={styles.accountName}>{account.code} Account</Text>
          <View style={styles.activeRow}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Active</Text>
          </View>
        </View>
      </View>

      <Text style={styles.balance}>
        {account.symbol}
        {account.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </Text>
      <View style={styles.balanceLabelRow}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Feather name="info" size={iconSize} color={themeColors.textSecondary} />
      </View>
    </View>
  );
}