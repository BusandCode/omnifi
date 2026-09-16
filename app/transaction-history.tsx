import { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { HistoryHeader } from '../src/components/history/HistoryHeader';
import { HistoryWalletCard } from '../src/components/history/HistoryWalletCard';
import { HistoryFilterTabs, FilterType } from '../src/components/history/HistoryFilterTabs';
import { TransactionGroup } from '../src/components/history/TransactionGroup';
import { transactionsByDate } from '../src/data/transactionHistory';
import { useTheme } from '../src/theme/ThemeContext';

export default function TransactionHistoryScreen() {
  const { colors: themeColors } = useTheme();
  const [filter, setFilter] = useState<FilterType>('all');

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: themeColors.background },
        fixedHeader: {
          paddingHorizontal: 20,
          paddingTop: 55,
          paddingBottom: 14,
          gap: 16,
          backgroundColor: themeColors.background,
        },
        tabsWrap: { paddingBottom: 10, backgroundColor: themeColors.background },
        content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 30, gap: 20 },
      }),
    [themeColors],
  );

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <HistoryHeader />
        <HistoryWalletCard />
      </View>

      <View style={styles.tabsWrap}>
        <HistoryFilterTabs active={filter} onChange={setFilter} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {transactionsByDate.map((group) => (
          <TransactionGroup key={group.date} date={group.date} transactions={group.transactions} filter={filter} />
        ))}
      </ScrollView>
    </View>
  );
}