import { useMemo } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";
import { ForeignAccountBrief } from "../../constants/foreignSendData";

type AmountProps = {
  account: ForeignAccountBrief;
  amount: string;
  onChangeAmount: (val: string) => void;
};

export function ForeignAmountCard({ account, amount, onChangeAmount }: AmountProps) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(12),
      styles: StyleSheet.create({
        card: { backgroundColor: themeColors.surface, borderRadius: s(14), padding: s(12) },
        topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
        currencyPill: {
          flexDirection: "row", alignItems: "center", gap: s(3),
          backgroundColor: themeColors.primaryTint,
          paddingHorizontal: s(8), paddingVertical: s(4), borderRadius: s(10),
        },
        currencyText: { color: themeColors.textPrimary, fontSize: f(9), fontWeight: "700" },
        maxBtn: {
          borderWidth: 1, borderColor: themeColors.primary, borderRadius: s(8),
          paddingHorizontal: s(9), paddingVertical: s(4),
        },
        maxText: { color: themeColors.primaryLight, fontSize: f(9.5), fontWeight: "700" },
        amountRow: { flexDirection: "row", alignItems: "center", gap: s(5), marginVertical: s(10) },
        symbol: { color: themeColors.textPrimary, fontSize: f(24), fontWeight: "700" },
        input: { flex: 1, color: themeColors.textPrimary, fontSize: f(24), fontWeight: "700", padding: 0 },
        footerRow: { flexDirection: "row", justifyContent: "space-between" },
        footerLabel: { color: themeColors.textSecondary, fontSize: f(9) },
        footerValue: { color: themeColors.textPrimary, fontSize: f(9), fontWeight: "600" },
      }),
    };
  }, [layoutScale, themeColors]);

  const rawDigits = amount.split(".")[0].replace(/[^0-9]/g, "");
  const displayAmount = rawDigits ? Number(rawDigits).toLocaleString("en-US") : "";

  const handleChange = (text: string) => onChangeAmount(text.replace(/[^0-9]/g, ""));

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.currencyPill}>
          <Text style={styles.currencyText}>{account.code}</Text>
          <Ionicons name="chevron-down" size={iconSize} color={themeColors.textPrimary} />
        </View>
        <TouchableOpacity style={styles.maxBtn} onPress={() => onChangeAmount(String(Math.trunc(account.balance)))}>
          <Text style={styles.maxText}>Max</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.symbol}>{account.symbol}</Text>
        <TextInput
          value={displayAmount}
          onChangeText={handleChange}
          keyboardType="number-pad"
          placeholder="0.00"
          placeholderTextColor={themeColors.textSecondary}
          style={styles.input}
        />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerLabel}>
          Available Balance: {account.symbol}{account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
        <Text style={styles.footerValue}>
          You will send {account.symbol}{Number(rawDigits || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </View>
  );
}

type NoteProps = { note: string; onChangeNote: (val: string) => void };

export function ForeignNoteCard({ note, onChangeNote }: NoteProps) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(12),
      styles: StyleSheet.create({
        row: {
          flexDirection: "row", alignItems: "center", gap: s(8),
          backgroundColor: themeColors.surface, borderRadius: s(12),
          paddingHorizontal: s(11), paddingVertical: s(10),
        },
        input: { flex: 1, color: themeColors.textPrimary, fontSize: f(11) },
        count: { color: themeColors.textSecondary, fontSize: f(9) },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.row}>
      <Feather name="message-square" size={iconSize} color={themeColors.textSecondary} />
      <TextInput
        value={note}
        onChangeText={(t) => onChangeNote(t.slice(0, 50))}
        placeholder="What's this for?"
        placeholderTextColor={themeColors.textSecondary}
        style={styles.input}
      />
      <Text style={styles.count}>{note.length}/50</Text>
    </View>
  );
}