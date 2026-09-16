import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { useBalances } from "../../store/BalanceContext";

const ICON_SIZE = 12;

// This card used to always render a fixed dark-purple gradient, which looked
// like a heavy dark block dropped onto an otherwise white/light screen in
// light mode. The gradient (and its foreground colors) now switch with the
// theme: a light purple-to-white tint in light mode, the deep purple
// treatment in dark mode — so it blends with the surrounding UI either way.
export function WalletBalanceCard() {
  const { mode } = useTheme();
  const [visible, setVisible] = useState(true);
  const { balances } = useBalances();
  const isLight = mode === "light";

  const balance = balances.NGN.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const gradientColors = isLight
    ? (["#FFFFFF", "#F7F3FD", "#EFE7FB"] as const)
    : (["#2A1858", "#160D33", "#0A0616"] as const);

  const fg = isLight
    ? {
        label: "rgba(46,20,90,0.6)",
        text: "#2E145A",
        sub: "rgba(46,20,90,0.55)",
        changeSub: "rgba(46,20,90,0.55)",
        eye: "rgba(46,20,90,0.55)",
        chevron: "rgba(46,20,90,0.5)",
      }
    : {
        label: "rgba(255,255,255,0.65)",
        text: "#fff",
        sub: "rgba(255,255,255,0.55)",
        changeSub: "rgba(255,255,255,0.55)",
        eye: "rgba(255,255,255,0.6)",
        chevron: "rgba(255,255,255,0.55)",
      };

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: "row",
      borderRadius: 16,
      padding: 12,
      overflow: "hidden",
      alignItems: "center",
    },
    left: { flex: 1 },
    labelRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginBottom: 6,
    },
    label: { fontSize: 11 },
    amountRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      marginBottom: 3,
    },
    currency: {
      fontSize: 15,
      fontWeight: "700",
    },
    amount: {
      fontSize: 16,
      fontWeight: "700",
    },
    sub: {
      fontSize: 9.5,
      marginBottom: 8,
    },
    changeRow: { flexDirection: "row", alignItems: "center", gap: 5 },
    changePill: {
      backgroundColor: "rgba(52,199,89,0.15)",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 5,
    },
    changeText: {
      color: "#219653",
      fontSize: 9.5,
      fontWeight: "700",
    },
    changeSub: { fontSize: 9.5 },
    illustration: { width: 120, height: 100 },
    chevron: { marginLeft: 2 },
  });

  return (
    <TouchableOpacity style={styles.wrapper} activeOpacity={0.9}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.left}>
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: fg.label }]}>
            Wallet Balance
          </Text>
          <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
            <Ionicons
              name={visible ? "eye-outline" : "eye-off-outline"}
              size={ICON_SIZE}
              color={fg.eye}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.amountRow}>
          <Text style={[styles.currency, { color: fg.text }]}>₦</Text>
          <Text style={[styles.amount, { color: fg.text }]}>
            {visible ? balance : "••••••••••"}
          </Text>
        </View>

        <Text style={[styles.sub, { color: fg.sub }]}>Available Balance</Text>

        <View style={styles.changeRow}>
          <View style={styles.changePill}>
            <Text style={styles.changeText}>+3.45%</Text>
          </View>
          <Text style={[styles.changeSub, { color: fg.changeSub }]}>
            from last 7 days
          </Text>
        </View>
      </View>

      <Image
        source={require("../../../assets/trade.png")}
        style={styles.illustration}
        resizeMode="contain"
      />

      <Feather
        name="chevron-right"
        size={ICON_SIZE + 2}
        color={fg.chevron}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}