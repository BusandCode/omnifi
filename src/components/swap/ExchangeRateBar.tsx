import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CurrencyCode } from '../../data/currencies';
import { colors } from '../../theme/colors';

type Props = { sendCurrency: CurrencyCode; receiveCurrency: CurrencyCode; rate: number };

export function ExchangeRateBar({ sendCurrency, receiveCurrency, rate }: Props) {
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 1 ? 45 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const display = `00:${seconds.toString().padStart(2, '0')}`;

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.label}>Exchange Rate</Text>
        <View style={styles.rateRow}>
          <Text style={styles.rate}>1 {sendCurrency} = {rate.toLocaleString('en-US', { minimumFractionDigits: 2 })} {receiveCurrency}</Text>
          <Feather name="info" size={10} color={colors.textSecondary} />
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.updatesLabel}>Rate updates in</Text>
        <View style={styles.timerPill}>
          <Text style={styles.timerText}>{display}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#1A1225', borderRadius: 12, padding: 11,
  },
  label: { color: colors.textSecondary, fontSize: 9.5, marginBottom: 3 },
  rateRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  rate: { color: colors.textPrimary, fontSize: 11, fontWeight: '600' },
  updatesLabel: { color: colors.textSecondary, fontSize: 9, marginBottom: 3 },
  timerPill: { backgroundColor: colors.primary, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  timerText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});