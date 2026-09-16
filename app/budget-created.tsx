import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { BudgetCreatedContent } from '../src/components/set-budget/BudgetCreatedContent';
import { useTheme } from '../src/theme/ThemeContext';
import { BUDGET_CATEGORIES, DURATION_OPTIONS, BudgetCategoryKey, DurationKey } from '../src/constants/budgetData';

export default function BudgetCreatedScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();
  const params = useLocalSearchParams<{
    category: string;
    amount: string;
    duration: string;
    startDate: string;
    alert80: string;
    alert100: string;
  }>();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: themeColors.background },
        fixedHeader: {
          paddingHorizontal: 20,
          paddingBottom: 12,
          backgroundColor: themeColors.background,
        },
        headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
        iconBtn: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: themeColors.surface,
          justifyContent: 'center',
          alignItems: 'center',
        },
        title: {
          flex: 1,
          color: themeColors.textPrimary,
          fontSize: 16.5,
          fontWeight: '700',
          textAlign: 'center',
        },
        scroll: { flex: 1 },
        content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
        footer: {
          paddingHorizontal: 20,
          paddingTop: 10,
          gap: 10,
          backgroundColor: themeColors.background,
        },
        primaryBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          backgroundColor: themeColors.primary,
          borderRadius: 14,
          paddingVertical: 15,
        },
        primaryText: { color: '#fff', fontSize: 13.5, fontWeight: '700' },
        secondaryBtn: {
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 14,
          paddingVertical: 15,
          borderWidth: 1.2,
          borderColor: themeColors.primary,
        },
        secondaryText: { color: themeColors.primaryLight, fontSize: 13.5, fontWeight: '700' },
      }),
    [themeColors],
  );

  const categoryKey = (params.category ?? 'transfers') as BudgetCategoryKey;
  const durationKey = (params.duration ?? 'daily') as DurationKey;
  const category = BUDGET_CATEGORIES.find((c) => c.key === categoryKey)!;
  const duration = DURATION_OPTIONS.find((d) => d.key === durationKey)!;
  const amount = Number(params.amount) || 0;
  const alert80 = params.alert80 === '1';
  const alert100 = params.alert100 === '1';

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Budget Created</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="share" size={16} color={themeColors.textPrimary} />
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
          startDateLabel={params.startDate ?? ''}
          alert80={alert80}
          alert100={alert100}
        />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? 4 : 14 }]}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/budgets' as any)}>
          <Text style={styles.primaryText}>View My Budgets</Text>
          <Ionicons name="chevron-forward" size={14} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.replace('/' as any)}>
          <Text style={styles.secondaryText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}