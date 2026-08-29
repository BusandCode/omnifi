import { View, ScrollView, StyleSheet } from 'react-native';
import { SavingsHeader } from '../src/components/savings/SavingsHeader';
import { SavingsBalanceCard } from '../src/components/savings/SavingsBalanceCard';
import { SavingsQuickActions } from '../src/components/savings/SavingsQuickActions';
import { SavingsGoalsList } from '../src/components/savings/SavingsGoalsList';
import { HigherReturnsBanner } from '../src/components/savings/HigherReturnsBanner';
import { RecentSavingsTransactions } from '../src/components/savings/RecentSavingsTransactions';
import { colors } from '../src/theme/colors';

export default function SavingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <SavingsHeader />
        <SavingsBalanceCard />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <SavingsQuickActions />
        <SavingsGoalsList />
        <HigherReturnsBanner />
        <RecentSavingsTransactions />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 14,
    gap: 16,
    backgroundColor: colors.background,
  },
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 30, gap: 18 },
});