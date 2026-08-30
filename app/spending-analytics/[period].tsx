import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, Redirect } from 'expo-router';
import { SpendingAnalyticsHeader } from '../../src/components/spending-analytics/SpendingAnalyticsHeader';
import { PeriodTabs } from '../../src/components/spending-analytics/PeriodTabs';
import { TotalSpentCard } from '../../src/components/spending-analytics/TotalSpentCard';
import { SpendingOverviewCard } from '../../src/components/spending-analytics/SpendingOverviewCard';
import { SpendingTrendCard } from '../../src/components/spending-analytics/SpendingTrendCard';
import { SetBudgetBanner } from '../../src/components/spending-analytics/SetBudgetBanner';
import { colors } from '../../src/theme/colors';
import { SPENDING_DATA, PeriodKey } from '../../src/constants/spendingData';
import { getCurrency } from '../../src/constants/currencies';

const VALID_PERIODS: PeriodKey[] = ['week', 'month', 'quarter', 'year'];

function isValidPeriod(value: unknown): value is PeriodKey {
  return typeof value === 'string' && (VALID_PERIODS as string[]).includes(value);
}

export default function SpendingAnalyticsScreen() {
  const insets = useSafeAreaInsets();
  const { period: rawPeriod } = useLocalSearchParams<{ period: string }>();

  if (!isValidPeriod(rawPeriod)) {
    // return <Redirect href="/spending-analytics/month" />;
    return <Redirect href={`/spending-analytics/month` as any} />;
  }

  const period = rawPeriod;
  const data = useMemo(() => SPENDING_DATA[period], [period]);
  const currency = 'NGN' as const;
  const { symbol } = getCurrency(currency);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <SpendingAnalyticsHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PeriodTabs active={period} />

        <TotalSpentCard
          totalSpent={data.totalSpent}
          vsLastPeriodPercent={data.vsLastPeriodPercent}
          moneyIn={data.moneyIn}
          moneyOut={data.moneyOut}
          currency={currency}
        />

        <SpendingOverviewCard
          categories={data.categories}
          totalSpent={data.totalSpent}
          currency={currency}
        />

        <SpendingTrendCard points={data.trend} symbol={symbol} />

        <SetBudgetBanner />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  fixedHeader: { paddingHorizontal: 20, paddingBottom: 10, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 24, gap: 16 },
});