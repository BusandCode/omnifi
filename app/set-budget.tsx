import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SetBudgetHeader } from '../src/components/set-budget/SetBudgetHeader';
import { StepIndicator } from '../src/components/set-budget/StepIndicator';
import { CategoryStep } from '../src/components/set-budget/CategoryStep';
import { BudgetAmountStep } from '../src/components/set-budget/BudgetAmountStep';
import { DurationStep } from '../src/components/set-budget/DurationStep';
import { ReviewStep } from '../src/components/set-budget/ReviewStep';
import { colors } from '../src/theme/colors';
import { BUDGET_CATEGORIES, BudgetCategoryKey, DURATION_OPTIONS, DurationKey } from '../src/constants/budgetData';

const START_DATE_LABEL = '16 May 2026';

export default function SetBudgetScreen() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [categoryKey, setCategoryKey] = useState<BudgetCategoryKey>('transfers');
  const [amount, setAmount] = useState('50000');
  const [durationKey, setDurationKey] = useState<DurationKey>('daily');
  const [alert80, setAlert80] = useState(true);
  const [alert100, setAlert100] = useState(true);

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
          <CategoryStep
            currency="NGN"
            selected={categoryKey}
            onSelect={setCategoryKey}
            onContinue={() => setStep(2)}
          />
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
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <DurationStep
            selected={durationKey}
            onSelect={setDurationKey}
            startDateLabel={START_DATE_LABEL}
            onContinue={() => setStep(4)}
          />
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
            onCreate={handleCreate}
            loading={loading}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  fixedHeader: { paddingHorizontal: 20, paddingBottom: 14, gap: 16, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 24 },
});