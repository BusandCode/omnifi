import { View, ScrollView, StyleSheet } from 'react-native';
import { SavingsHeader } from '../src/components/savings/SavingsHeader';
import { SavingsBalanceCard } from '../src/components/savings/SavingsBalanceCard';
import { SavingsQuickActions } from '../src/components/savings/SavingsQuickActions';
import { SavingsGoalsList } from '../src/components/savings/SavingsGoalsList';
import { HigherReturnsBanner } from '../src/components/savings/HigherReturnsBanner';
import { RecentSavingsTransactions } from '../src/components/savings/RecentSavingsTransactions';
import { useTheme } from '../src/theme/ThemeContext';

export default function SavingsScreen() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.fixedHeader, { backgroundColor: themeColors.background }]}>
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
  container: { flex: 1 },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 14,
    gap: 16,
  },
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 30, gap: 18 },
});