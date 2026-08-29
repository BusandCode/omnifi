import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

const SUGGESTED_BY_CURRENCY: Record<CurrencyCode, number[]> = {
  NGN: [5000, 10000, 25000, 50000],
  USD: [10, 25, 50, 100],
  EUR: [10, 25, 50, 100],
};

type AmountEntrySectionProps = {
  currency: CurrencyCode;
  balance: number;
  amount: string;
  onChangeAmount: (value: string) => void;
};

export function AmountEntrySection({
  currency,
  balance,
  amount,
  onChangeAmount,
}: AmountEntrySectionProps) {
  const { flag, symbol } = getCurrency(currency);
  const suggested = SUGGESTED_BY_CURRENCY[currency];

  const formattedBalance = `${symbol}${balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>2. Enter Amount</Text>

      <View style={styles.card}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.currencyPill}>
            <Text style={styles.flag}>{flag}</Text>
            <Text style={styles.currencyText}>{currency}</Text>
            <Ionicons name="chevron-down" size={13} color={colors.textSecondary} />
          </TouchableOpacity>

          <TextInput
            value={amount}
            onChangeText={(t) => onChangeAmount(t.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad"
            placeholder={`${symbol}0.00`}
            placeholderTextColor={colors.textSecondary}
            style={styles.amountInput}
          />

          <TouchableOpacity
            style={styles.maxBtn}
            onPress={() => onChangeAmount(Math.floor(balance).toString())}
          >
            <Text style={styles.maxText}>Max</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Available Balance: {formattedBalance}</Text>
          <View style={styles.feesRow}>
            <Text style={styles.feesText}>No fees to request</Text>
            <Ionicons name="information-circle-outline" size={12} color={colors.success} />
          </View>
        </View>

        <View style={styles.suggestedBlock}>
          <Text style={styles.suggestedLabel}>Suggested amounts</Text>
          <View style={styles.chipsRow}>
            {suggested.map((s) => (
              <TouchableOpacity
                key={s}
                style={styles.chip}
                onPress={() => onChangeAmount(s.toString())}
              >
                <Text style={styles.chipText}>
                  {symbol}
                  {s.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.chip} onPress={() => onChangeAmount('')}>
              <Text style={styles.chipText}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:{marginTop:-10},
  sectionTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', marginBottom: 12 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  currencyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  flag: { fontSize: 15 },
  currencyText: { color: colors.textPrimary, fontSize: 12, fontWeight: '600' },
  amountInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'right',
    padding: 0,
  },
  maxBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  maxText: { color: colors.primaryLight, fontSize: 11, fontWeight: '700' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  metaText: { color: colors.textSecondary, fontSize: 10.5 },
  feesRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  feesText: { color: colors.success, fontSize: 10.5, fontWeight: '600' },
  suggestedBlock: { marginTop: 14 },
  suggestedLabel: { color: colors.textSecondary, fontSize: 10.5, marginBottom: 8 },
  chipsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  chip: {
    flex: 1,
    minWidth: 60,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  chipText: { color: colors.primaryLight, fontSize: 11, fontWeight: '600' },
});