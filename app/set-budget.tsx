import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SetBudgetHeader } from '../src/components/set-budget/SetBudgetHeader';
import { StepIndicator } from '../src/components/set-budget/StepIndicator';
import { CategoryStep } from '../src/components/set-budget/CategoryStep';
import { BudgetAmountStep } from '../src/components/set-budget/BudgetAmountStep';
import { DurationStep } from '../src/components/set-budget/DurationStep';
import { ReviewStep } from '../src/components/set-budget/ReviewStep';
import { useTheme } from '../src/theme/ThemeContext';
import { BUDGET_CATEGORIES, BudgetCategoryKey, DURATION_OPTIONS, DurationKey } from '../src/constants/budgetData';

const START_DATE_LABEL = '16 May 2026';
const TOTAL_STEPS = 4;

export default function SetBudgetScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [categoryKey, setCategoryKey] = useState<BudgetCategoryKey>('transfers');
  const [amount, setAmount] = useState('50000');
  const [durationKey, setDurationKey] = useState<DurationKey>('daily');
  const [alert80, setAlert80] = useState(true);
  const [alert100, setAlert100] = useState(true);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: themeColors.background },
        fixedHeader: {
          paddingHorizontal: 20,
          paddingBottom: 14,
          gap: 16,
          backgroundColor: themeColors.background,
        },
        scroll: { flex: 1 },
        content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 24 },
        footer: {
          paddingHorizontal: 20,
          paddingTop: 10,
          backgroundColor: themeColors.background,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: themeColors.border,
        },
        footerBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          backgroundColor: themeColors.primary,
          borderRadius: 14,
          paddingVertical: 14,
        },
        footerBtnDisabled: { opacity: 0.5 },
        footerBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
      }),
    [themeColors],
  );

  const category = BUDGET_CATEGORIES.find((c) => c.key === categoryKey)!;
  const duration = DURATION_OPTIONS.find((d) => d.key === durationKey)!;
  const numericAmount = Number(amount) || 0;

  const goBack = () => {
    if (step > 1) setStep(step - 1);
    else router.back();
  };

  const handleCreate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace({
        pathname: '/budget-created',
        params: {
          category: categoryKey,
          amount: numericAmount.toString(),
          duration: durationKey,
          startDate: START_DATE_LABEL,
          alert80: alert80 ? '1' : '0',
          alert100: alert100 ? '1' : '0',
        },
      });
    }, 500);
  };

  const isReviewStep = step === TOTAL_STEPS;
  const isAmountStep = step === 2;
  const footerDisabled = (isAmountStep && numericAmount <= 0) || loading;

  const handleFooterPress = () => {
    if (isReviewStep) {
      handleCreate();
    } else {
      setStep(step + 1);
    }
  };

  const footerLabel = isReviewStep ? (loading ? 'Creating…' : 'Create Budget') : 'Continue';

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <SetBudgetHeader onBack={goBack} canGoBack />
        <StepIndicator currentStep={step} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {step === 1 && (
          <CategoryStep currency="NGN" selected={categoryKey} onSelect={setCategoryKey} />
        )}

        {step === 2 && (
          <BudgetAmountStep
            currency="NGN"
            category={category}
            amount={amount}
            onChangeAmount={setAmount}
            alert80={alert80}
            alert100={alert100}
            onToggle80={setAlert80}
            onToggle100={setAlert100}
          />
        )}

        {step === 3 && (
          <DurationStep selected={durationKey} onSelect={setDurationKey} startDateLabel={START_DATE_LABEL} />
        )}

        {step === 4 && (
          <ReviewStep
            currency="NGN"
            category={category}
            amount={numericAmount}
            duration={duration}
            startDateLabel={START_DATE_LABEL}
            alert80={alert80}
            alert100={alert100}
            onToggle80={setAlert80}
            onToggle100={setAlert100}
          />
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? 10 : 16 }]}>
        <TouchableOpacity
          style={[styles.footerBtn, footerDisabled && styles.footerBtnDisabled]}
          onPress={handleFooterPress}
          disabled={footerDisabled}
        >
          {isReviewStep && <Ionicons name="shield-checkmark-outline" size={13} color="#fff" />}
          <Text style={styles.footerBtnText}>{footerLabel}</Text>
          <Ionicons name="chevron-forward" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}