import { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useBalances } from "../../store/BalanceContext";

export function WalletBalanceCard() {
  const { colors: themeColors } = useTheme();
  const layoutScale = useLayoutScale();
  const [visible, setVisible] = useState(true);
  const { balances } = useBalances();

  const balance = balances.NGN.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(12),
      styles: StyleSheet.create({
        wrapper: {
          flexDirection: "row",
          borderRadius: s(16),
          padding: s(12),
          overflow: "hidden",
          alignItems: "center",
        },
        left: { flex: 1 },
        labelRow: {
          flexDirection: "row",
          alignItems: "center",
          gap: s(5),
          marginBottom: s(6),
        },
        label: { color: themeColors.textSecondary, fontSize: f(11) },
        amountRow: {
          flexDirection: "row",
          alignItems: "center",
          gap: s(3),
          marginBottom: s(3),
        },
        currency: {
          color: themeColors.textPrimary,
          fontSize: f(15),
          fontWeight: "700",
        },
        amount: {
          color: themeColors.textPrimary,
          fontSize: f(16),
          fontWeight: "700",
        },
        sub: {
          color: themeColors.textSecondary,
          fontSize: f(9.5),
          marginBottom: s(8),
        },
        changeRow: { flexDirection: "row", alignItems: "center", gap: s(5) },
        changePill: {
          backgroundColor: "rgba(52,199,89,0.15)",
          paddingHorizontal: s(6),
          paddingVertical: s(2),
          borderRadius: s(5),
        },
        changeText: {
          color: themeColors.success,
          fontSize: f(9.5),
          fontWeight: "700",
        },
        changeSub: { color: themeColors.textSecondary, fontSize: f(9.5) },
        illustration: { width: s(60), height: s(54), position: "relative" },
        coin: {
          position: "absolute",
          width: s(40),
          height: s(40),
          borderRadius: s(20),
          justifyContent: "center",
          alignItems: "center",
        },
        btcCoin: { backgroundColor: "#7C4FE0", top: 0, left: s(4) },
        usdtCoin: {
          backgroundColor: "#1BA97F",
          top: s(22),
          left: s(26),
          width: s(28),
          height: s(28),
          borderRadius: s(14),
        },
        coinSymbol: {
          color: themeColors.textPrimary,
          fontSize: f(15),
          fontWeight: "800",
        },
        coinSymbolSmall: {
          color: themeColors.textPrimary,
          fontSize: f(12),
          fontWeight: "800",
        },
        chevron: { marginLeft: s(2) },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <TouchableOpacity style={styles.wrapper} activeOpacity={0.9}>
      <LinearGradient
        colors={["#2A1858", "#160D33", "#0A0616"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.left}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Wallet Balance</Text>
          <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
            <Ionicons
              name={visible ? "eye-outline" : "eye-off-outline"}
              size={iconSize}
              color="rgba(255,255,255,0.6)"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.currency}>₦</Text>
          <Text style={styles.amount}>{visible ? balance : "••••••••••"}</Text>
        </View>

        <Text style={styles.sub}>Available Balance</Text>

        <View style={styles.changeRow}>
          <View style={styles.changePill}>
            <Text style={styles.changeText}>+3.45%</Text>
          </View>
          <Text style={styles.changeSub}>from last 7 days</Text>
        </View>
      </View>

      <View style={styles.illustration}>
        <View style={[styles.coin, styles.btcCoin]}>
          <Text style={styles.coinSymbol}>₿</Text>
        </View>
        <View style={[styles.coin, styles.usdtCoin]}>
          <Text style={styles.coinSymbolSmall}>₮</Text>
        </View>
      </View>

      <Feather
        name="chevron-right"
        size={iconSize + 2}
        color={themeColors.textSecondary}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}
