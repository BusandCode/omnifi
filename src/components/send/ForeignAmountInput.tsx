import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { ForeignAccountBrief } from "../../constants/foreignSendData";

type AmountProps = {
  account: ForeignAccountBrief;
  amount: string;
  onChangeAmount: (val: string) => void;
};

export function ForeignAmountCard({ account, amount, onChangeAmount }: AmountProps) {
  const { colors: themeColors } = useTheme();

  const rawDigits = amount.split(".")[0].replace(/[^0-9]/g, "");
  const displayAmount = rawDigits ? Number(rawDigits).toLocaleString("en-US") : "";

  const handleChange = (text: string) => onChangeAmount(text.replace(/[^0-9]/g, ""));

  return (
    <View style={[amountStyles.card, { backgroundColor: themeColors.surface }]}>
      <View style={amountStyles.topRow}>
        <View style={[amountStyles.currencyPill, { backgroundColor: themeColors.primaryTint }]}>
          <Text style={[amountStyles.currencyText, { color: themeColors.textPrimary }]}>
            {account.code}
          </Text>
          <Ionicons name="chevron-down" size={13} color={themeColors.textPrimary} />
        </View>
        <TouchableOpacity
          style={[amountStyles.maxBtn, { borderColor: themeColors.primary }]}
          onPress={() => onChangeAmount(String(Math.trunc(account.balance)))}
        >
          <Text style={[amountStyles.maxText, { color: themeColors.primaryLight }]}>Max</Text>
        </TouchableOpacity>
      </View>

      <View style={amountStyles.amountRow}>
        <Text style={[amountStyles.symbol, { color: themeColors.textPrimary }]}>
          {account.symbol}
        </Text>
        <TextInput
          value={displayAmount}
          onChangeText={handleChange}
          keyboardType="number-pad"
          placeholder="0.00"
          placeholderTextColor={themeColors.textSecondary}
          style={[amountStyles.input, { color: themeColors.textPrimary }]}
        />
      </View>

      <View style={amountStyles.footerRow}>
        <Text style={[amountStyles.footerLabel, { color: themeColors.textSecondary }]}>
          Available Balance: {account.symbol}
          {account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
        <Text style={[amountStyles.footerValue, { color: themeColors.textPrimary }]}>
          You will send {account.symbol}
          {Number(rawDigits || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </View>
  );
}

const amountStyles = StyleSheet.create({
  card: { borderRadius: 16, padding: 14 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  currencyPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  currencyText: { fontSize: 11, fontWeight: "700" },
  maxBtn: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  maxText: { fontSize: 11, fontWeight: "700" },
  amountRow: { flexDirection: "row", alignItems: "center", gap: 6, marginVertical: 12 },
  symbol: { fontSize: 26, fontWeight: "700" },
  input: { flex: 1, fontSize: 26, fontWeight: "700", padding: 0 },
  footerRow: { flexDirection: "row", justifyContent: "space-between" },
  footerLabel: { fontSize: 10 },
  footerValue: { fontSize: 10, fontWeight: "600" },
});

type NoteProps = { note: string; onChangeNote: (val: string) => void };

export function ForeignNoteCard({ note, onChangeNote }: NoteProps) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[noteStyles.row, { backgroundColor: themeColors.surface }]}>
      <Feather name="message-square" size={13} color={themeColors.textSecondary} />
      <TextInput
        value={note}
        onChangeText={(t) => onChangeNote(t.slice(0, 50))}
        placeholder="What's this for?"
        placeholderTextColor={themeColors.textSecondary}
        style={[noteStyles.input, { color: themeColors.textPrimary }]}
      />
      <Text style={[noteStyles.count, { color: themeColors.textSecondary }]}>
        {note.length}/50
      </Text>
    </View>
  );
}

const noteStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  input: { flex: 1, fontSize: 13 },
  count: { fontSize: 10 },
});