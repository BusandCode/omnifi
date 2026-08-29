import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TransactionItem } from './TransactionItem';
import { Transaction } from '../../data/transactionHistory';
import { FilterType } from './HistoryFilterTabs';
import { colors } from '../../theme/colors';

const COLLAPSED_COUNT = 4;

type Props = {
  date: string;
  transactions: Transaction[];
  filter: FilterType;
};

export function TransactionGroup({ date, transactions, filter }: Props) {
  const [expanded, setExpanded] = useState(false);

  const filtered = filter === 'all' ? transactions : transactions.filter((t) => t.category === filter);
  if (filtered.length === 0) return null;

  const visible = expanded ? filtered : filtered.slice(0, COLLAPSED_COUNT);
  const hasMore = filtered.length > COLLAPSED_COUNT;

  return (
    <View>
      <Text style={styles.dateLabel}>{date}</Text>

      <View style={styles.card}>
        {visible.map((t, i) => (
          <TransactionItem key={t.id} txn={t} isLast={i === visible.length - 1} />
        ))}
      </View>

      {hasMore && (
        <TouchableOpacity style={styles.moreBtn} onPress={() => setExpanded((e) => !e)}>
          <Text style={styles.moreText}>{expanded ? 'Show less' : 'View more transactions'}</Text>
          <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={colors.primaryLight} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateLabel: { color: colors.textSecondary, fontSize: 12, fontWeight: '600', marginBottom: 10 },
  card: { backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 14 },
  moreBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, paddingVertical: 12 },
  moreText: { color: colors.primaryLight, fontSize: 12, fontWeight: '600' },
});