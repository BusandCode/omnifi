import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import { ForeignAccountBrief } from "../../constants/foreignSendData";

type Props = { account: ForeignAccountBrief };

export function SendAccountCard({ account }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <Text style={[styles.watermark, { color: themeColors.primaryTint }]}>
        {account.symbol}
      </Text>
      <View style={styles.topRow}>
        <View style={[styles.flagCircle, { backgroundColor: themeColors.primaryTint }]}>
          <Text style={styles.flagText}>{account.flagEmoji}</Text>
        </View>
        <View style={styles.nameCol}>
          <Text style={[styles.accountName, { color: themeColors.textPrimary }]}>
            {account.code} Account
          </Text>
          <View style={styles.activeRow}>
            <View style={[styles.activeDot, { backgroundColor: themeColors.success }]} />
            <Text style={[styles.activeText, { color: themeColors.success }]}>Active</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.balance, { color: themeColors.textPrimary }]}>
        {account.symbol}
        {account.balance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
      <View style={styles.balanceLabelRow}>
        <Text style={[styles.balanceLabel, { color: themeColors.textSecondary }]}>
          Available Balance
        </Text>
        <Feather name="info" size={11} color={themeColors.textSecondary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, padding: 16, overflow: "hidden" },
  topRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  flagCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  flagText: { fontSize: 15 },
  nameCol: { flex: 1 },
  accountName: { fontSize: 13.5, fontWeight: "700" },
  activeRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 3 },
  activeDot: { width: 6, height: 6, borderRadius: 3 },
  activeText: { fontSize: 10.5, fontWeight: "600" },
  balance: { fontSize: 28, fontWeight: "700", marginTop: 14 },
  balanceLabelRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 3 },
  balanceLabel: { fontSize: 11 },
  watermark: {
    position: "absolute",
    right: -4,
    top: 10,
    fontSize: 76,
    fontWeight: "700",
  },
});