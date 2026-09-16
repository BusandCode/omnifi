import { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";

const quickAmounts = [1000, 5000, 10000];

type Props = {
  amount: string;
  onChangeAmount: (val: string) => void;
  note: string;
  onChangeNote: (val: string) => void;
};

export function AmountInput({ amount, onChangeAmount, note, onChangeNote }: Props) {
  const { colors: themeColors } = useTheme();
  const [otherActive, setOtherActive] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Strip a trailing decimal portion first so an initial value like
  // "25000.00" doesn't get flattened into "2500000" by digit-stripping.
  const rawDigits = amount.split(".")[0].replace(/[^0-9]/g, "");
  const displayAmount = rawDigits ? Number(rawDigits).toLocaleString("en-US") : "";

  const handleChange = (text: string) => {
    onChangeAmount(text.replace(/[^0-9]/g, ""));
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
    <View style={styles.wrap}>
      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <View style={styles.topRow}>
          <Text style={[styles.label, { color: themeColors.textSecondary }]}>
            You send
          </Text>
          <TouchableOpacity
            style={[styles.currencyPill, { backgroundColor: themeColors.primaryTint }]}
          >
            <Text style={[styles.currencyText, { color: themeColors.textPrimary }]}>
              NGN
            </Text>
            <Ionicons name="chevron-down" size={13} color={themeColors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.amountRow}>
          <Text style={[styles.symbol, { color: themeColors.textPrimary }]}>₦</Text>
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
            style={[styles.input, { color: themeColors.textPrimary }]}
          />
        </View>

        <View style={styles.chipsRow}>
          {quickAmounts.map((qa) => (
            <TouchableOpacity
              key={qa}
              style={[styles.chip, { backgroundColor: themeColors.primaryTint }]}
              onPress={() => addQuick(qa)}
            >
              <Text style={[styles.chipText, { color: themeColors.primaryLight }]}>
                + ₦{qa.toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[
              styles.chip,
              { backgroundColor: themeColors.primaryTint },
              otherActive && { backgroundColor: themeColors.primary },
            ]}
            onPress={handleOtherAmount}
          >
            <Text
              style={[
                styles.chipText,
                { color: themeColors.primaryLight },
                otherActive && styles.chipTextActive,
              ]}
            >
              Other Amount
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.noteRow, { backgroundColor: themeColors.surface }]}>
        <Feather name="message-square" size={14} color={themeColors.textSecondary} />
        <TextInput
          value={note}
          onChangeText={(t) => onChangeNote(t.slice(0, 50))}
          placeholder="Add a note (optional)"
          placeholderTextColor={themeColors.textSecondary}
          style={[styles.noteInput, { color: themeColors.textPrimary }]}
        />
        <Text style={[styles.noteCount, { color: themeColors.textSecondary }]}>
          {note.length}/50
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  card: {
    borderRadius: 16,
    padding: 14,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: { fontSize: 12 },
  currencyPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  currencyText: { fontSize: 11, fontWeight: "700" },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  symbol: { fontSize: 22, fontWeight: "700" },
  input: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    padding: 0,
  },
  chipsRow: { flexDirection: "row", gap: 8 },
  chip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  chipText: { fontSize: 10.5, fontWeight: "600" },
  chipTextActive: { color: "#fff" },
  noteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  noteInput: { flex: 1, fontSize: 13 },
  noteCount: { fontSize: 10 },
});