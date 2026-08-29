import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

export function RecurringBanner() {
  const [dismissed, setDismissed] = useState(false);
  const layoutScale = useLayoutScale();

  const { styles, iconSize, closeSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(19),
      closeSize: s(16),
      styles: StyleSheet.create({
        card: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.surface,
          borderRadius: s(16),
          padding: s(8),
          gap: s(8),
        },
        iconBox: {
          width: s(32),
          height: s(32),
          borderRadius: s(18),
          backgroundColor: "rgba(167,139,250,0.15)",
          justifyContent: "center",
          alignItems: "center",
        },
        textBlock: { flex: 1 },
        title: { color: colors.textPrimary, fontSize: f(11.8), fontWeight: "500" },
        sub: { color: colors.textSecondary, fontSize: f(11.2), marginTop: s(2) },
        actions: { flexDirection: "row", alignItems: "center", gap: s(12) },
        ctaBtn: { backgroundColor: colors.primary, paddingHorizontal: s(12), paddingVertical: s(8), borderRadius: s(10) },
        ctaText: { color: "#fff", fontSize: f(11.2), fontWeight: "500" },
      }),
    };
  }, [layoutScale]);

  if (dismissed) return null;

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="calendar" size={iconSize} color={colors.primaryLight} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title}>Start a recurring investment</Text>
        <Text style={styles.sub}>Invest regularly and build wealth over time.</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.ctaBtn}>
          <Text style={styles.ctaText}>Set up now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDismissed(true)} hitSlop={8}>
          <Feather name="x" size={closeSize} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}