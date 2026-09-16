import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const quickAmounts = [10000, 20000, 50000, 100000];
const currentBalance = 3745220.5;

type AmountEntryCardProps = {
  amount: string;
  onChangeAmount: (value: string) => void;
};

export function AmountEntryCard({ amount, onChangeAmount }: AmountEntryCardProps) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  wrapper: { borderRadius: 16, padding: 14, overflow: 'hidden' },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3 },
  currencyPill: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  currency: { color: themeColors.primaryLight, fontSize: 13, fontWeight: '700' },
  amountInput: { color: '#fff', fontSize: 26, fontWeight: '700', padding: 0, minWidth: 32 },
  illustration: {
    position: 'absolute', top: 10, right: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  plusBadge: {
    position: 'absolute', bottom: -3, right: -3,
    width: 21, height: 21, borderRadius: 11, backgroundColor: themeColors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#160D33',
  },
  chipsRow: { flexDirection: 'row', gap: 6, marginTop: 14, marginBottom: 12 },
  chip: { flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', paddingVertical: 7, borderRadius: 8, alignItems: 'center' },
  chipActive: { backgroundColor: themeColors.primary },
  chipText: { color: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  balanceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 9,
  },
  balanceIcon: {
    width: 23, height: 23, borderRadius: 12, backgroundColor: 'rgba(167,139,250,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  balanceLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
  balanceValue: { color: '#fff', fontSize: 11, fontWeight: '600', marginTop: 1 },
  textContainer: { flex: 1 },
}),
    [themeColors]
  );

  const displayAmount = amount ? Number(amount).toLocaleString() : '';
  const newBalance = (currentBalance + Number(amount || 0)).toLocaleString('en-US', { minimumFractionDigits: 2 });

  const handleChange = (text: string) => onChangeAmount(text.replace(/[^0-9]/g, ''));

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2A1858', '#160D33', '#0A0616']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.labelRow}>
        <Text style={styles.label}>Enter amount</Text>
        <Feather name="info" size={11} color={themeColors.textSecondary} />
      </View>

      <View style={styles.amountRow}>
        <View style={styles.currencyPill}>
          <Text style={styles.currency}>NGN</Text>
          <Ionicons name="chevron-down" size={10} color={themeColors.primaryLight} />
        </View>
        <TextInput
          value={displayAmount}
          onChangeText={handleChange}
          keyboardType="number-pad"
          style={styles.amountInput}
          placeholder="0"
          placeholderTextColor="rgba(255,255,255,0.3)"
        />
      </View>

      <View style={styles.illustration}>
        <Ionicons name="wallet" size={48.4} color="rgba(167,139,250,0.4)" />
        <View style={styles.plusBadge}>
          <Feather name="plus" size={12} color="#fff" />
        </View>
      </View>

      <View style={styles.chipsRow}>
        {quickAmounts.map((qa) => {
          const active = amount === String(qa);
          return (
            <TouchableOpacity
              key={qa}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => onChangeAmount(String(qa))}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                ₦{qa.toLocaleString()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.balanceRow}>
        <View style={styles.balanceIcon}>
          <Ionicons name="wallet-outline" size={13} color={themeColors.primaryLight} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.balanceLabel}>New balance</Text>
          <Text style={styles.balanceValue}>NGN {newBalance}</Text>
        </View>
        <Feather name="chevron-right" size={13} color="rgba(255,255,255,0.5)" />
      </TouchableOpacity>
    </View>
  );
}

