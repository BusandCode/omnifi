import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { AMOUNT_SUGGESTIONS, BudgetCategory } from '../../constants/budgetData';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

type Props = {
  currency: CurrencyCode;
  category: BudgetCategory;
  amount: string;
  onChangeAmount: (v: string) => void;
  alert80: boolean;
  alert100: boolean;
  onToggle80: (v: boolean) => void;
  onToggle100: (v: boolean) => void;
  onContinue: () => void;
};

export function BudgetAmountStep({
  currency,
  category,
  amount,
  onChangeAmount,
  alert80,
  alert100,
  onToggle80,
  onToggle100,
  onContinue,
}: Props) {
  const { symbol } = getCurrency(currency);
  const numericAmount = Number(amount) || 0;
  const spent = 0;
  const spentPct = numericAmount > 0 ? Math.min((spent / numericAmount) * 100, 100) : 0;
  const dailyLimit = numericAmount > 0 ? Math.round(numericAmount / 30) : 0;

  return (
    <View style={{ gap: 13 }}>
      <View style={styles.introCard}>
        <View style={styles.introIconBox}>
          <Ionicons name="swap-horizontal" size={14} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.introLabel}>You selected</Text>
          <Text style={styles.introTitle}>{category.label}</Text>
          <Text style={styles.introSub}>Set how much you want to spend for this category.</Text>
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>2. Set Budget Amount</Text>
        <Text style={styles.sectionSub}>Enter the total amount you want to spend.</Text>

        <View style={styles.amountCard}>
          <View style={styles.amountRow}>
            <View>
              <Text style={styles.amountLabel}>Budget Amount</Text>
              <View style={styles.amountInputRow}>
                <Text style={styles.currencySymbol}>{symbol}</Text>
                <TextInput
                  value={amount}
                  onChangeText={(t) => onChangeAmount(t.replace(/[^0-9]/g, ''))}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor={colors.textSecondary}
                  style={styles.amountInput}
                />
              </View>
            </View>
            {numericAmount > 0 && (
              <View style={styles.checkBadge}>
                <Ionicons name="checkmark" size={12} color={colors.success} />
              </View>
            )}
          </View>

          <View style={styles.chipsRow}>
            {AMOUNT_SUGGESTIONS.map((a) => {
              const active = numericAmount === a;
              return (
                <TouchableOpacity
                  key={a}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => onChangeAmount(a.toString())}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {symbol}{a.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={styles.chip} onPress={() => onChangeAmount('')}>
              <Text style={styles.chipText}>Custom</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tipRow}>
          <Ionicons name="bulb-outline" size={12} color={colors.primaryLight} />
          <Text style={styles.tipText}>
            Tip: Your average monthly spending on {category.label} is {symbol}{category.avgLastMonth.toLocaleString()}. Setting a budget helps you stay in control.
          </Text>
        </View>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>Budget Preview</Text>
        <View style={styles.previewRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.previewLabel}>Monthly Budget</Text>
            <Text style={styles.previewValue}>{symbol}{numericAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.previewDivider} />
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.previewLabel}>Daily Limit (Average)</Text>
            <Text style={styles.previewValue}>{symbol}{dailyLimit.toLocaleString()} / day</Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${spentPct}%` }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressText}>{symbol}{spent.toLocaleString()} spent</Text>
          <Text style={styles.progressText}>{symbol}{numericAmount.toLocaleString()} limit</Text>
        </View>
      </View>

      <View style={styles.notifyCard}>
        <Text style={styles.notifyTitle}>You'll be notified when:</Text>

        <View style={styles.notifyRow}>
          <View style={[styles.notifyIcon, { backgroundColor: 'rgba(139,92,246,0.15)' }]}>
            <Ionicons name="notifications" size={12} color={colors.primaryLight} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notifyItemTitle}>80% of your budget is used</Text>
            <Text style={styles.notifyItemSub}>At {symbol}{Math.round(numericAmount * 0.8).toLocaleString()}</Text>
          </View>
          <Switch
            value={alert80}
            onValueChange={onToggle80}
            trackColor={{ false: colors.border, true: colors.success }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.notifyRow}>
          <View style={[styles.notifyIcon, { backgroundColor: 'rgba(255,59,48,0.15)' }]}>
            <Ionicons name="notifications" size={12} color={colors.danger} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notifyItemTitle}>100% of your budget is reached</Text>
            <Text style={styles.notifyItemSub}>At {symbol}{numericAmount.toLocaleString()}</Text>
          </View>
          <Switch
            value={alert100}
            onValueChange={onToggle100}
            trackColor={{ false: colors.border, true: colors.success }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.continueBtn, numericAmount <= 0 && styles.continueBtnDisabled]}
        onPress={onContinue}
        disabled={numericAmount <= 0}
      >
        <Text style={styles.continueText}>Continue</Text>
        <Ionicons name="chevron-forward" size={14} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  introCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.25)',
  },
  introIconBox: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  introLabel: { color: colors.textSecondary, fontSize: 9.5 },
  introTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', marginTop: 2 },
  introSub: { color: colors.textSecondary, fontSize: 9.5, marginTop: 3, lineHeight: 13 },
  sectionTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700', marginBottom: 2 },
  sectionSub: { color: colors.textSecondary, fontSize: 9.5, marginBottom: 9 },
  amountCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 12 },
  amountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  amountLabel: { color: colors.textSecondary, fontSize: 9.5, marginBottom: 3 },
  amountInputRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  currencySymbol: { color: colors.textPrimary, fontSize: 21, fontWeight: '800' },
  amountInput: { color: colors.textPrimary, fontSize: 21, fontWeight: '800', minWidth: 90, padding: 0 },
  checkBadge: {
    width: 23, height: 23, borderRadius: 11.5,
    backgroundColor: 'rgba(52,199,89,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  chipsRow: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 7,
    marginTop: 12, paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  chipActive: { backgroundColor: colors.primary },
  chipText: { color: colors.textPrimary, fontSize: 10, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 7, marginTop: 9 },
  tipText: { flex: 1, color: colors.textSecondary, fontSize: 9.5, lineHeight: 13 },
  previewCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 12 },
  previewTitle: { color: colors.textPrimary, fontSize: 11, fontWeight: '700', marginBottom: 10 },
  previewRow: { flexDirection: 'row' },
  previewLabel: { color: colors.textSecondary, fontSize: 9 },
  previewValue: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', marginTop: 2 },
  previewDivider: { width: 1, backgroundColor: colors.border, marginHorizontal: 10 },
  progressTrack: {
    height: 5, borderRadius: 2.5, backgroundColor: colors.border,
    marginTop: 12, overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 2.5, backgroundColor: colors.primary },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  progressText: { color: colors.textSecondary, fontSize: 8.5 },
  notifyCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 12, gap: 10 },
  notifyTitle: { color: colors.textPrimary, fontSize: 11, fontWeight: '700' },
  notifyRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  notifyIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  notifyItemTitle: { color: colors.textPrimary, fontSize: 10, fontWeight: '600' },
  notifyItemSub: { color: colors.textSecondary, fontSize: 8.5, marginTop: 2 },
  continueBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 13,
  },
  continueBtnDisabled: { opacity: 0.5 },
  continueText: { color: '#fff', fontSize: 12.5, fontWeight: '700' },
});