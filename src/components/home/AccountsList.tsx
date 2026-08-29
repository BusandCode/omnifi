import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";

const accounts = [
  {
    flag: "🇳🇬",
    name: "Nigerian Naira",
    code: "NGN",
    primary: true,
    amount: "450,320.00",
  },
  {
    flag: "🇺🇸",
    name: "US Dollar",
    code: "USD",
    amount: "$12,430.00",
    sub: "NGN 18,456,000.00",
  },
  {
    flag: "🇪🇺",
    name: "Euro",
    code: "EUR",
    amount: "€2,200.50",
    sub: "NGN 3,520,800.00",
  },
];

type AccountsListProps = {
  visible: boolean;
};

export function AccountsList({ visible }: AccountsListProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Accounts</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      {accounts.map((acc) => (
        <View key={acc.code} style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.flagIcon}>{acc.flag}</Text>
            <View>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{acc.name}</Text>
                {acc.primary && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Primary</Text>
                  </View>
                )}
              </View>
              <Text style={styles.code}>{acc.code}</Text>
            </View>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            {visible ? (
              <>
                <Text style={styles.amount}>
                  {acc.code === "NGN" ? `NGN ${acc.amount}` : acc.amount}
                </Text>
                {acc.sub && <Text style={styles.sub}>{acc.sub}</Text>}
              </>
            ) : (
              <View style={styles.dotsRow}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <View key={i} style={styles.dot} />
                ))}
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { color: colors.textSecondary, fontSize: 12, fontWeight: "500" },
  viewAll: { color: colors.primaryLight, fontSize: 11, fontWeight: "600" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 8 },
  flagIcon: { fontSize: 23 },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  name: { color: colors.textPrimary, fontSize: 12, fontWeight: "600" },
  badge: {
    backgroundColor: "#2C2C2E",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: { color: colors.textSecondary, fontSize: 10 },
  code: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  amount: { color: colors.textPrimary, fontSize: 12, fontWeight: "600" },
  sub: { color: colors.textSecondary, fontSize: 9, marginTop: 2 },
  dotsRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
  },
});