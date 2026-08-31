import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BudgetCreatedContent } from '../src/components/set-budget/BudgetCreatedContent';
import { colors } from '../src/theme/colors';
import { BUDGET_CATEGORIES, BudgetCategoryKey, DURATION_OPTIONS, DurationKey } from '../src/constants/budgetData';

export default function BudgetCreatedScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    category?: string;
    amount?: string;
    duration?: string;
    startDate?: string;
    alert80?: string;
    alert100?: string;
  }>();

  const category = BUDGET_CATEGORIES.find((c) => c.key === (params.category as BudgetCategoryKey)) ?? BUDGET_CATEGORIES[0];
  const duration = DURATION_OPTIONS.find((d) => d.key === (params.duration as DurationKey)) ?? DURATION_OPTIONS[0];
  const amount = Number(params.amount) || 0;
  const startDateLabel = params.startDate || '—';
  const alert80 = params.alert80 === '1';
  const alert100 = params.alert100 === '1';

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={18} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Budget Created</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="share" size={14} color={colors.primaryLight} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BudgetCreatedContent
          currency="NGN"
          category={category}
          amount={amount}
          duration={duration}
          startDateLabel={startDateLabel}
          alert80={alert80}
          alert100={alert100}
        />

        <TouchableOpacity style={styles.viewBtn} onPress={() => router.push('/spending-analytics')}>
          <Text style={styles.viewBtnText}>View My Budgets</Text>
          <Ionicons name="chevron-forward" size={14} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashboardBtn} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.dashboardBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  fixedHeader: { paddingHorizontal: 18, paddingBottom: 9, backgroundColor: colors.background },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { flex: 1, color: colors.textPrimary, fontSize: 15, fontWeight: '700', textAlign: 'center' },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 18, paddingTop: 4, paddingBottom: 18, gap: 10 },
  viewBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
  },
  viewBtnText: { color: '#fff', fontSize: 12.5, fontWeight: '700' },
  dashboardBtn: {
    borderWidth: 1.2, borderColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  dashboardBtnText: { color: colors.primaryLight, fontSize: 11.5, fontWeight: '700' },
});