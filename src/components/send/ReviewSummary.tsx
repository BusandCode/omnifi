import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  amount: number;
  fee: number;
  onSubmit: () => void;
  loading: boolean;
};

export function ReviewSummary({ amount, fee, onSubmit, loading }: Props) {
  const { colors: themeColors } = useTheme();

  const total = amount + fee;
  const fmt = (n: number) =>
    `₦${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <View style={styles.wrap}>
      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Review details
        </Text>

        <View style={styles.row}>
          <Text style={[styles.label, { color: themeColors.textSecondary }]}>
            You are sending
          </Text>
          <Text style={[styles.value, { color: themeColors.textPrimary }]}>
            {fmt(amount)}
          </Text>
        </View>

        <View style={styles.row}>
          <View style={styles.feeLabelRow}>
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>
              Transfer fee
            </Text>
            <Feather name="info" size={11} color={themeColors.textSecondary} />
          </View>
          <Text style={[styles.feeValue, { color: themeColors.success }]}>
            {fmt(fee)}
          </Text>
        </View>

        <View style={[styles.divider, { borderColor: themeColors.border }]} />

        <View style={styles.row}>
          <Text style={[styles.totalLabel, { color: themeColors.textPrimary }]}>
            Total
          </Text>
          <Text style={[styles.totalValue, { color: themeColors.textPrimary }]}>
            {fmt(total)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.cta, { backgroundColor: themeColors.primary }]}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.ctaText}>Continue</Text>
        )}
      </TouchableOpacity>

      <View style={styles.secureRow}>
        <Feather name="lock" size={11} color={themeColors.textSecondary} />
        <Text style={[styles.secureText, { color: themeColors.textSecondary }]}>
          All transactions are secured with bank-level encryption
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 14 },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  feeLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  label: { fontSize: 12 },
  value: { fontSize: 12.5, fontWeight: "600" },
  feeValue: { fontSize: 12.5, fontWeight: "600" },
  divider: {
    height: 1,
    borderStyle: "dashed",
    borderWidth: 0.7,
    marginVertical: 8,
  },
  totalLabel: { fontSize: 13, fontWeight: "700" },
  totalValue: { fontSize: 15, fontWeight: "700" },
  cta: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  secureRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  secureText: { fontSize: 10.5 },
});