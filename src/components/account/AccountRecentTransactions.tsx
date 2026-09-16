// AccountRecentTransactions.tsx
import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { AccountTransaction } from '../../constants/accountData';

type AccountRecentTransactionsProps = {
  transactions: AccountTransaction[];
};

export function AccountRecentTransactions({ transactions }: AccountRecentTransactionsProps) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
      header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
      title: { color: themeColors.textPrimary, fontSize: 14.5, fontWeight: '700' },
      viewAll: { color: themeColors.primaryLight, fontSize: 12, fontWeight: '600' },
      card: { backgroundColor: themeColors.surface, borderRadius: 16, paddingHorizontal: 14 },
      emptyCard: {
        backgroundColor: themeColors.surface,
        borderRadius: 16,
        paddingVertical: 36,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
      },
      emptyIcon: { marginBottom: 10 },
      emptyText: { color: themeColors.textPrimary, fontSize: 13.5, fontWeight: '700', textAlign: 'center' },
      emptySub: { color: themeColors.textSecondary, fontSize: 11, marginTop: 5, textAlign: 'center' },
      row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
      rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: themeColors.border },
      iconCircle: {
        width: 38, height: 38, borderRadius: 19,
        justifyContent: 'center', alignItems: 'center',
      },
      textContainer: { flex: 1 },
      name: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600' },
      date: { color: themeColors.textSecondary, fontSize: 10.5, marginTop: 2 },
      rightCol: { alignItems: 'flex-end' },
      amount: { fontSize: 12, fontWeight: '700' },
      status: { color: themeColors.textSecondary, fontSize: 10, marginTop: 3 },
    }),
    [themeColors]
  );

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
          <Feather name="inbox" size={26} color={themeColors.textSecondary} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>No transactions yet</Text>
          <Text style={styles.emptySub}>Your transaction history will appear here.</Text>
        </View>
      ) : (
        <View style={styles.card}>
          {transactions.map((t, index) => {
            const isNegative = t.amount.trim().startsWith('-');
            const iconColor = t.kind === 'received' ? themeColors.success : 
                             t.kind === 'sent' ? themeColors.danger : themeColors.primary;
            const iconName = t.kind === 'received' ? 'arrow-down-left' : 
                            t.kind === 'sent' ? 'arrow-up-right' : 'refresh-cw';
            
            return (
              <View
                key={t.id}
                style={[styles.row, index !== transactions.length - 1 && styles.rowDivider]}
              >
                <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>
                  <Feather name={iconName} size={16} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{t.title}</Text>
                  <Text style={styles.date}>{t.date}</Text>
                </View>
                <View style={styles.rightCol}>
                  <Text style={[styles.amount, { color: isNegative ? themeColors.danger : themeColors.success }]}>
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