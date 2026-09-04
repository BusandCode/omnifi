// src/components/betting/BettingAmountCard.tsx
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { router } from 'expo-router';

const quickAmounts = [5000, 10000, 25000, 50000];
const availableBalance = 3106055211.07;

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function threeDigits(n: number): string {
  let s = '';
  if (n >= 100) {
    s += ones[Math.floor(n / 100)] + ' Hundred ';
    n %= 100;
  }
  if (n >= 10 && n < 20) {
    s += teens[n - 10];
  } else {
    s += tens[Math.floor(n / 10)] + ' ' + ones[n % 10];
  }
  return s.trim();
}

function numberToWords(num: number): string {
  if (!num) return '';
  const million = Math.floor(num / 1_000_000);
  const thousand = Math.floor((num % 1_000_000) / 1000);
  const rest = num % 1000;
  let parts: string[] = [];
  if (million) parts.push(`${threeDigits(million)} Million`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

type Props = { amount: string; onChangeAmount: (v: string) => void };

export function BettingAmountCard({ amount, onChangeAmount }: Props) {
  const { colors: themeColors } = useTheme();

  const displayAmount = amount ? Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : '0.00';
  const words = amount ? `${numberToWords(Number(amount))} Naira Only` : '';

  const handleChange = (text: string) => onChangeAmount(text.replace(/[^0-9]/g, ''));

  return (
    <View>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>Amount</Text>

      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <View style={styles.amountRow}>
          <View style={[styles.currencyPill, { backgroundColor: themeColors.primaryTint }]}>
            <Ionicons name="flag" size={12} color={themeColors.primaryLight} />
            <Text style={[styles.currency, { color: themeColors.primaryLight }]}>NGN</Text>
            <Ionicons name="chevron-down" size={10} color={themeColors.primaryLight} />
          </View>
          <TextInput
            value={displayAmount}
            onChangeText={handleChange}
            keyboardType="number-pad"
            style={[styles.amountInput, { color: themeColors.textPrimary }]}
          />
        </View>
        {!!words && (
          <Text style={[styles.words, { color: themeColors.textSecondary }]} numberOfLines={1}>
            {words}
          </Text>
        )}

        <View style={styles.chipsRow}>
          {quickAmounts.map((qa) => {
            const active = amount === String(qa);
            return (
              <TouchableOpacity
                key={qa}
                style={[
                  styles.chip,
                  { borderColor: themeColors.border },
                  active && { borderColor: themeColors.primary, backgroundColor: themeColors.primaryTint },
                ]}
                onPress={() => onChangeAmount(String(qa))}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: active ? themeColors.primaryLight : themeColors.textSecondary },
                  ]}
                >
                  {qa.toLocaleString()}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[styles.chip, { borderColor: themeColors.border }]}
            onPress={() => onChangeAmount('')}
          >
            <Text style={[styles.chipText, { color: themeColors.textSecondary }]}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.balanceRow, { backgroundColor: themeColors.surface }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.balanceLabel, { color: themeColors.textSecondary }]}>Available Balance</Text>
          <Text style={[styles.balanceValue, { color: themeColors.textPrimary }]}>
            NGN {availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addMoneyBtn, { backgroundColor: themeColors.primaryTint }]}
          onPress={() => router.push('/add-money')}
        >
          <Text style={[styles.addMoneyText, { color: themeColors.primaryLight }]}>Add Money</Text>
          <Feather name="plus-circle" size={13} color={themeColors.primaryLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 13, fontWeight: '600', marginBottom: 12 },
  card: { borderRadius: 16, padding: 14 },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  currencyPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10,
  },
  currency: { fontSize: 12, fontWeight: '700' },
  amountInput: { flex: 1, fontSize: 24, fontWeight: '800', padding: 0, textAlign: 'right' },
  words: { fontSize: 10.5, marginTop: 6, textAlign: 'right' },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  chip: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1,
  },
  chipText: { fontSize: 11, fontWeight: '700' },
  balanceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 14, padding: 14, marginTop: 12,
  },
  textContainer: { flex: 1 },
  balanceLabel: { fontSize: 10.5 },
  balanceValue: { fontSize: 13, fontWeight: '700', marginTop: 2 },
  addMoneyBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 9, borderRadius: 10,
  },
  addMoneyText: { fontSize: 11.5, fontWeight: '700' },
});