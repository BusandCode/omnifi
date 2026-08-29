import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { CurrencyCode, formatAmount } from "../../constants/currencies";

type Transaction = {
  id: string;
  name: string;
  sub: string;
  amountNGN: number;
  time: string;
  bg: string;
  icon: React.ReactNode;
};

const transactions: Transaction[] = [
  {
    id: "1",
    name: "Spotify",
    sub: "Subscription",
    amountNGN: -2500,
    time: "Today, 8:21 AM",
    bg: "#1DB954",
    icon: <FontAwesome5 name="spotify" size={16} color="#fff" />,
  },
  {
    id: "2",
    name: "Andrew Salary",
    sub: "Income",
    amountNGN: 2500000,
    time: "Yesterday, 9:15 AM",
    bg: "#0A84FF",
    icon: <Feather name="arrow-down" size={15} color="#fff" />,
  },
  {
    id: "3",
    name: "Amazon",
    sub: "Shopping",
    amountNGN: -48600,
    time: "May 18, 7:40 PM",
    bg: "#111",
    icon: <FontAwesome5 name="amazon" size={15} color="#fff" />,
  },
  {
    id: "4",
    name: "Netflix",
    sub: "Subscription",
    amountNGN: -48600,
    time: "May 18, 7:40 PM",
    bg: "#111",
    icon: <MaterialCommunityIcons name="netflix" size={15} color="#fff" />,
  },
];

type RecentTransactionsProps = {
  currency: CurrencyCode;
};

export function RecentTransactions({ currency }: RecentTransactionsProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Recent transactions</Text>
        <TouchableOpacity onPress={() => router.push("/transaction-history")}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No recent transactions</Text>
        </View>
      ) : (
        <View style={styles.card}>
          {transactions.map((t, index) => (
            <View
              key={t.id}
              style={[
                styles.row,
                index !== transactions.length - 1 && styles.rowDivider,
              ]}
            >
              <View style={styles.left}>
                <View style={[styles.iconCircle, { backgroundColor: t.bg }]}>
                  {t.icon}
                </View>
                <View>
                  <Text style={styles.name}>{t.name}</Text>
                  <Text style={styles.sub}>{t.sub}</Text>
                </View>
              </View>
              <View style={styles.right}>
                <Text
                  style={[
                    styles.amount,
                    { color: t.amountNGN < 0 ? colors.textPrimary : colors.success },
                  ]}
                >
                  {formatAmount(t.amountNGN, currency)}
                </Text>
                <Text style={styles.time}>{t.time}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  viewAll: {
    color: colors.primaryLight,
    fontSize: 11,
    fontWeight: "600",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 11 },
  right: { alignItems: "flex-end" },
  iconCircle: {
    width: 39,
    height: 39,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  name: { color: colors.textPrimary, fontSize: 11.5, fontWeight: "600" },
  sub: { color: colors.textSecondary, fontSize: 9.5, marginTop: 1 },
  amount: { fontSize: 11, fontWeight: "600" },
  time: { color: colors.textSecondary, fontSize: 9.5, marginTop: 1 },
});