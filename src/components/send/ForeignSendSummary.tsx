import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

type Props = {
  symbol: string;
  amount: number;
  fee: number;
  onReview: () => void;
};

export function ForeignSendSummary({ symbol, amount, fee, onReview }: Props) {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(14),
      styles: StyleSheet.create({
        card: { backgroundColor: colors.surface, borderRadius: s(14), padding: s(12) },
        row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: s(4) },
        label: { color: colors.textSecondary, fontSize: f(10.5) },
        value: { color: colors.textPrimary, fontSize: f(11), fontWeight: "600" },
        valueSuccess: { color: colors.success, fontSize: f(11), fontWeight: "700" },
        cta: {
          backgroundColor: colors.primary, borderRadius: s(13), paddingVertical: s(13), marginTop: s(12),
          flexDirection: "row", justifyContent: "center", alignItems: "center", gap: s(6),
        },
        ctaText: { color: "#fff", fontSize: f(13), fontWeight: "700" },
      }),
    };
  }, [layoutScale]);

  const recipientReceives = Math.max(amount - fee, 0);
  const fmt = (n: number) => `${symbol}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Transfer Fee</Text>
          <Text style={styles.value}>{fmt(fee)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>You will send</Text>
          <Text style={styles.value}>{fmt(amount)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Recipient will receive</Text>
          <Text style={styles.valueSuccess}>{fmt(recipientReceives)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cta} onPress={onReview} disabled={amount <= 0}>
        <Text style={styles.ctaText}>Review Transfer</Text>
        <Ionicons name="chevron-forward" size={iconSize} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}