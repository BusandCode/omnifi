import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CurrencyCode, formatAmount } from "../../constants/currencies";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

type Transaction = {
  id: string;
  name: string;
  sub: string;
  amountNGN: number;
  time: string;
  bg?: string;
  icon?: React.ReactNode;
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
    // no icon/bg set — falls back to the generic credit icon below
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

// Fallback used only when a transaction doesn't specify its own icon/bg —
// e.g. a merchant we don't have a brand icon for.
function getFallbackVisual(amountNGN: number) {
  const isCredit = amountNGN >= 0;
  return {
    icon: isCredit ? (
      <Feather name="arrow-down-left" size={16} color="#fff" />
    ) : (
      <Feather name="arrow-up-right" size={16} color="#fff" />
    ),
    bg: isCredit ? "#1DB954" : "#E4302D",
  };
}

type RecentTransactionsProps = {
  currency: CurrencyCode;
};

export function RecentTransactions({ currency }: RecentTransactionsProps) {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textSecondary }]}>
          Recent transactions
        </Text>
        <TouchableOpacity onPress={() => router.push("/transaction-history")}>
          <Text style={[styles.viewAll, { color: themeColors.primaryLight }]}>
            View all
          </Text>
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <View
          style={[styles.emptyCard, { backgroundColor: themeColors.surface }]}
        >
          <Text
            style={[styles.emptyText, { color: themeColors.textSecondary }]}
          >
            No recent transactions
          </Text>
        </View>
      ) : (
        <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
          {transactions.map((t, index) => {
            const fallback = getFallbackVisual(t.amountNGN);
            const icon = t.icon ?? fallback.icon;
            const bg = t.bg ?? fallback.bg;
            const isCredit = t.amountNGN >= 0;

            return (
              <View
                key={t.id}
                style={[
                  styles.row,
                  index !== transactions.length - 1 && [
                    styles.rowDivider,
                    { borderBottomColor: themeColors.border },
                  ],
                ]}
              >
                <View style={styles.left}>
                  <View style={[styles.iconCircle, { backgroundColor: bg }]}>
                    {icon}
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.name,
                        { color: themeColors.textPrimary },
                      ]}
                    >
                      {t.name}
                    </Text>
                    <Text
                      style={[
                        styles.sub,
                        { color: themeColors.textSecondary },
                      ]}
                    >
                      {t.sub}
                    </Text>
                  </View>
                </View>
                <View style={styles.right}>
                  <Text
                    style={[
                      styles.amount,
                      {
                        color: isCredit
                          ? themeColors.success
                          : themeColors.textPrimary,
                      },
                    ]}
                  >
                    {formatAmount(t.amountNGN, currency)}
                  </Text>
                  <Text
                    style={[styles.time, { color: themeColors.textSecondary }]}
                  >
                    {t.time}
                  </Text>
                </View>
              </View>
            );
          })}
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