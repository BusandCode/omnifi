import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  symbol: string;
  amount: number;
  fee: number;
  onReview: () => void;
};

export function ForeignSendSummary({ symbol, amount, fee, onReview }: Props) {
  const { colors: themeColors } = useTheme();

  const recipientReceives = Math.max(amount - fee, 0);
  const fmt = (n: number) =>
    `${symbol}${n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <View style={styles.wrap}>
      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: themeColors.textSecondary }]}>
            Transfer Fee
          </Text>
          <Text style={[styles.value, { color: themeColors.textPrimary }]}>{fmt(fee)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: themeColors.textSecondary }]}>
            You will send
          </Text>
          <Text style={[styles.value, { color: themeColors.textPrimary }]}>
            {fmt(amount)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: themeColors.textSecondary }]}>
            Recipient will receive
          </Text>
          <Text style={[styles.valueSuccess, { color: themeColors.success }]}>
            {fmt(recipientReceives)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.cta, { backgroundColor: themeColors.primary }]}
        onPress={onReview}
        disabled={amount <= 0}
      >
        <Text style={styles.ctaText}>Review Transfer</Text>
        <Ionicons name="chevron-forward" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 14 },
  card: { borderRadius: 16, padding: 14 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
  label: { fontSize: 12 },
  value: { fontSize: 12.5, fontWeight: "600" },
  valueSuccess: { fontSize: 12.5, fontWeight: "700" },
  cta: {
    borderRadius: 14,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  ctaText: { color: "#fff", fontSize: 14, fontWeight: "700" },
});