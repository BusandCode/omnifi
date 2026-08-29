// src/components/swap/SwapCard.tsx
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { currencies, CurrencyCode } from "../../data/currencies";
import { colors } from "../../theme/colors";

type Props = {
  sendCurrency: CurrencyCode;
  receiveCurrency: CurrencyCode;
  sendAmount: string;
  receiveAmount: string;
  rate: number;
  onChangeSendAmount: (v: string) => void;
  onFlip: () => void;
};

function fmtBalance(code: CurrencyCode, value: number) {
  const symbol = code === "NGN" ? "₦" : code === "USD" ? "$" : "€";
  return `${symbol} ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

export function SwapCard({
  sendCurrency,
  receiveCurrency,
  sendAmount,
  receiveAmount,
  rate,
  onChangeSendAmount,
  onFlip,
}: Props) {
  const send = currencies[sendCurrency];
  const receive = currencies[receiveCurrency];
  const sendSymbol =
    sendCurrency === "NGN" ? "₦" : sendCurrency === "USD" ? "$" : "€";
  const receiveSymbol =
    receiveCurrency === "NGN" ? "₦" : receiveCurrency === "USD" ? "$" : "€";

  return (
    <View style={styles.card}>
      <Text style={styles.label}>You send</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.currencyPill}>
          <View style={styles.flagCircle}>
            <Text style={styles.flag}>{send.flag}</Text>
          </View>
          <View>
            <View style={styles.codeRow}>
              <Text style={styles.code}>{send.code}</Text>
              <Ionicons
                name="chevron-down"
                size={13}
                color={colors.textPrimary}
              />
            </View>
            <Text style={styles.name}>{send.name}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.amountBlock}>
          <TextInput
            value={sendAmount}
            onChangeText={onChangeSendAmount}
            keyboardType="decimal-pad"
            style={styles.amountInput}
          />
          <Text style={styles.approx}>
            ≈ {sendSymbol}
            {sendAmount || "0.00"}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceValue}>
          {fmtBalance(send.code, send.balance)}
        </Text>
      </View>

      <View style={styles.flipRow}>
        <View style={styles.flipLine} />
        <TouchableOpacity style={styles.flipBtn} onPress={onFlip}>
         <Ionicons name="swap-vertical" size={16} color={colors.primaryLight} />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>You receive</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.currencyPill}>
          <View style={styles.flagCircle}>
            <Text style={styles.flag}>{receive.flag}</Text>
          </View>
          <View>
            <View style={styles.codeRow}>
              <Text style={styles.code}>{receive.code}</Text>
              <Ionicons
                name="chevron-down"
                size={13}
                color={colors.textPrimary}
              />
            </View>
            <Text style={styles.name}>{receive.name}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.amountBlock}>
          <Text style={styles.amountText}>{receiveAmount}</Text>
          <Text style={styles.approx}>
            ≈ {receiveSymbol}
            {receiveAmount}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.balanceRow}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceValue}>
          {fmtBalance(receive.code, receive.balance)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 14 },
  label: { color: colors.textSecondary, fontSize: 10, marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  currencyPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    maxWidth: "44%",
    backgroundColor: "rgba(142, 142, 147, 0.18)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  flagCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F11",
  },
  flag: { fontSize: 15 },
  codeRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  code: { color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  name: { color: colors.textSecondary, fontSize: 7.5, marginTop: 1 },
  amountBlock: { alignItems: "flex-end", flex: 1 },
  amountInput: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    padding: 0,
    textAlign: "right",
    minWidth: 80,
  },
  amountText: { color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  approx: { color: colors.textSecondary, fontSize: 9.5, marginTop: 2 },
  divider: { height: 1, backgroundColor: "#2C2C2E", marginBottom: 10 },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  balanceLabel: { color: colors.textSecondary, fontSize: 9.5 },
  balanceValue: {
    color: colors.primaryLight,
    fontSize: 10.5,
    fontWeight: "600",
  },
  flipRow: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  flipLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#2C2C2E",
  },
  flipBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#241A38",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(167,139,250,0.3)",
    zIndex: 1,
  },
});
