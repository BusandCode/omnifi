import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  amount: number;
  fee: number;
  onSubmit: () => void;
  loading: boolean;
};

export function ReviewSummary({ amount, fee, onSubmit, loading }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize, gap } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(10),
      gap: s(12),
      styles: StyleSheet.create({
        card: {
          backgroundColor: themeColors.surface,
          borderRadius: s(14),
          padding: s(12),
          marginTop: s(-10),
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: f(12),
          fontWeight: "700",
          marginBottom: s(10),
        },
        row: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: s(4),
        },
        feeLabelRow: {
          flexDirection: "row",
          alignItems: "center",
          gap: s(4),
        },
        label: { color: themeColors.textSecondary, fontSize: f(10.5) },
        value: { color: themeColors.textPrimary, fontSize: f(11), fontWeight: "600" },
        feeValue: { color: themeColors.success, fontSize: f(11), fontWeight: "600" },
        divider: {
          height: 1,
          borderStyle: "dashed",
          borderWidth: 0.7,
          borderColor: themeColors.border,
          marginVertical: s(6),
        },
        totalLabel: { color: themeColors.textPrimary, fontSize: f(12), fontWeight: "700" },
        totalValue: { color: themeColors.textPrimary, fontSize: f(13), fontWeight: "700" },
        cta: {
          backgroundColor: themeColors.primary,
          borderRadius: s(13),
          paddingVertical: s(13),
          alignItems: "center",
        },
        ctaText: { color: "#fff", fontSize: f(13), fontWeight: "700" },
        secureRow: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: s(5),
        },
        secureText: { color: themeColors.textSecondary, fontSize: f(9.5) },
      }),
    };
  }, [layoutScale, themeColors]);

  const total = amount + fee;
  const fmt = (n: number) => `₦${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <View style={{ gap }}>
      <View style={styles.card}>
        <Text style={styles.title}>Review details</Text>

        <View style={styles.row}>
          <Text style={styles.label}>You are sending</Text>
          <Text style={styles.value}>{fmt(amount)}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.feeLabelRow}>
            <Text style={styles.label}>Transfer fee</Text>
            <Feather name="info" size={iconSize} color={themeColors.textSecondary} />
          </View>
          <Text style={styles.feeValue}>{fmt(fee)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{fmt(total)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cta} onPress={onSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.ctaText}>Continue</Text>
        )}
      </TouchableOpacity>

      <View style={styles.secureRow}>
        <Feather name="lock" size={iconSize} color={themeColors.textSecondary} />
        <Text style={styles.secureText}>All transactions are secured with bank-level encryption</Text>
      </View>
    </View>
  );
}