import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Transaction } from '../../data/transactionHistory';
import { colors } from '../../theme/colors';

type Props = {
  txn: Transaction;
  isLast: boolean;
};

const fmt = (n: number) => `₦${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

export function TransactionItem({ txn, isLast }: Props) {
  const isIn = txn.direction === 'in';

  return (
    <TouchableOpacity style={[styles.row, !isLast && styles.divider]}>
      <View style={[styles.iconCircle, { backgroundColor: txn.iconBg }]}>
        <Feather name={txn.icon} size={16} color={txn.iconColor} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{txn.title}</Text>
        <Text style={styles.subtitle}>{txn.subtitle}</Text>
        <Text style={styles.time}>{txn.time}</Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.amount, { color: isIn ? colors.success : '#FF453A' }]}>
          {isIn ? '+ ' : '- '}
          {fmt(txn.amount)}
        </Text>
        <Text style={styles.status}>{txn.status}</Text>
      </View>

      <Feather name="chevron-right" size={15} color={colors.textSecondary} style={{ marginLeft: 6 }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#2C2C2E' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  name: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  time: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  amount: { fontSize: 12.5, fontWeight: '700' },
  status: { color: colors.success, fontSize: 10, marginTop: 3 },
});