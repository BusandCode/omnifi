import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { AccountTransaction } from '../../constants/accountData';

function TransactionIcon({ kind }: { kind: AccountTransaction['kind'] }) {
  if (kind === 'received') {
    return (
      <View style={[styles.iconCircle, { backgroundColor: colors.success }]}>
        <Feather name="arrow-down-left" size={16} color="#fff" />
      </View>
    );
  }
  if (kind === 'sent') {
    return (
      <View style={[styles.iconCircle, { backgroundColor: colors.danger }]}>
        <Feather name="arrow-up-right" size={16} color="#fff" />
      </View>
    );
  }
  return (
    <View style={[styles.iconCircle, { backgroundColor: colors.primary }]}>
      <Feather name="refresh-cw" size={15} color="#fff" />
    </View>
  );
}

type AccountRecentTransactionsProps = {
  transactions: AccountTransaction[];
};

export function AccountRecentTransactions({ transactions }: AccountRecentTransactionsProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        {transactions.length > 0 && (
          <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        )}
      </View>

      {transactions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Feather name="inbox" size={26} color={colors.textSecondary} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>No transactions yet</Text>
          <Text style={styles.emptySub}>Your transaction history will appear here.</Text>
        </View>
      ) : (
        <View style={styles.card}>
          {transactions.map((t, index) => {
            const isNegative = t.amount.trim().startsWith('-');
            return (
              <View
                key={t.id}
                style={[styles.row, index !== transactions.length - 1 && styles.rowDivider]}
              >
                <TransactionIcon kind={t.kind} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{t.title}</Text>
                  <Text style={styles.date}>{t.date}</Text>
                </View>
                <View style={styles.rightCol}>
                  <Text style={[styles.amount, { color: isNegative ? colors.danger : colors.success }]}>
                    {t.amount}
                  </Text>
                  <Text style={styles.status}>{t.status}</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  title: { color: colors.textPrimary, fontSize: 14.5, fontWeight: '700' },
  viewAll: { color: colors.primaryLight, fontSize: 12, fontWeight: '600' },
  card: { backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 14 },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: { marginBottom: 10 },
  emptyText: { color: colors.textPrimary, fontSize: 13.5, fontWeight: '700', textAlign: 'center' },
  emptySub: { color: colors.textSecondary, fontSize: 11, marginTop: 5, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  iconCircle: {
    width: 38, height: 38, borderRadius: 19,
    justifyContent: 'center', alignItems: 'center',
  },
  textContainer: { flex: 1 },
  name: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  date: { color: colors.textSecondary, fontSize: 10.5, marginTop: 2 },
  rightCol: { alignItems: 'flex-end' },
  amount: { fontSize: 12, fontWeight: '700' },
  status: { color: colors.textSecondary, fontSize: 10, marginTop: 3 },
});