import { useMemo, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

const quickAmounts = [1000, 5000, 10000];

type Props = {
  amount: string;
  onChangeAmount: (val: string) => void;
  note: string;
  onChangeNote: (val: string) => void;
};

export function AmountInput({ amount, onChangeAmount, note, onChangeNote }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();
  const [otherActive, setOtherActive] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(12),
      styles: StyleSheet.create({
        card: {
          backgroundColor: themeColors.surface,
          borderRadius: s(14),
          padding: s(10),
          marginTop: s(-4),
        },
        topRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: s(3),
        },
        label: { color: themeColors.textSecondary, fontSize: f(10.5) },
        currencyPill: {
          flexDirection: "row",
          alignItems: "center",
          gap: s(3),
          backgroundColor: themeColors.primaryTint,
          paddingHorizontal: s(8),
          paddingVertical: s(4),
          borderRadius: s(10),
        },
        currencyText: { color: themeColors.textPrimary, fontSize: f(9), fontWeight: "700" },
        amountRow: {
          flexDirection: "row",
          alignItems: "center",
          gap: s(5),
          marginBottom: s(9),
        },
        symbol: { color: themeColors.textPrimary, fontSize: f(18), fontWeight: "700" },
        input: {
          flex: 1,
          color: themeColors.textPrimary,
          fontSize: f(18),
          fontWeight: "700",
          padding: 0,
        },
        chipsRow: { flexDirection: "row", gap: s(6) },
        chip: {
          flex: 1,
          backgroundColor: themeColors.primaryTint,
          paddingVertical: s(6),
          borderRadius: s(8),
          alignItems: "center",
        },
        chipActive: { backgroundColor: themeColors.primary },
        chipText: { color: themeColors.primaryLight, fontSize: f(9.5), fontWeight: "600" },
        chipTextActive: { color: "#fff" },
        noteRow: {
          flexDirection: "row",
          alignItems: "center",
          gap: s(8),
          backgroundColor: themeColors.surface,
          borderRadius: s(12),
          paddingHorizontal: s(11),
          paddingVertical: s(10),
          marginTop: s(4),
        },
        noteInput: { flex: 1, color: themeColors.textPrimary, fontSize: f(11) },
        noteCount: { color: themeColors.textSecondary, fontSize: f(9) },
      }),
    };
  }, [layoutScale, themeColors]);

  // Strip a trailing decimal portion first so an initial value like
  // "25000.00" doesn't get flattened into "2500000" by digit-stripping.
  const rawDigits = amount.split(".")[0].replace(/[^0-9]/g, "");
  const displayAmount = rawDigits ? Number(rawDigits).toLocaleString("en-US") : "";

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    onChangeAmount(cleaned);
  };

  const addQuick = (val: number) => {
    const current = Number(rawDigits || 0);
    onChangeAmount(String(current + val));
    setOtherActive(false);
  };

  const handleOtherAmount = () => {
    setOtherActive(true);
    onChangeAmount("");
    inputRef.current?.focus();
  };

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.label}>You send</Text>
          <TouchableOpacity style={styles.currencyPill}>
            <Text style={styles.currencyText}>NGN</Text>
            <Ionicons name="chevron-down" size={iconSize} color={themeColors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.symbol}>₦</Text>
          <TextInput
            ref={inputRef}
            value={displayAmount}
            onChangeText={(text) => {
              handleChange(text);
              setOtherActive(false);
            }}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor={themeColors.textSecondary}
            style={styles.input}
          />
        </View>

        <View style={styles.chipsRow}>
          {quickAmounts.map((qa) => (
            <TouchableOpacity key={qa} style={styles.chip} onPress={() => addQuick(qa)}>
              <Text style={styles.chipText}>+ ₦{qa.toLocaleString()}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.chip, otherActive && styles.chipActive]}
            onPress={handleOtherAmount}
          >
            <Text style={[styles.chipText, otherActive && styles.chipTextActive]}>Other Amount</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.noteRow}>
        <Feather name="message-square" size={iconSize} color={themeColors.textSecondary} />
        <TextInput
          value={note}
          onChangeText={(t) => onChangeNote(t.slice(0, 50))}
          placeholder="Add a note (optional)"
          placeholderTextColor={themeColors.textSecondary}
          style={styles.noteInput}
        />
        <Text style={styles.noteCount}>{note.length}/50</Text>
      </View>
    </View>
  );
}