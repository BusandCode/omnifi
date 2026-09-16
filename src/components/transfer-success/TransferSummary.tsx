// src/components/transfer-success/TransferSummary.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

type Props = {
  amount: number;
  currency: CurrencyCode;
  recipientName: string;
  recipientBank: string;
  recipientInitials: string;
};

export function TransferSummary({ amount, currency, recipientName, recipientBank, recipientInitials }: Props) {
  const { colors: themeColors } = useTheme();
  const { symbol } = getCurrency(currency);
  const formattedAmount = `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <View style={styles.top}>
        <Text style={[styles.label, { color: themeColors.textSecondary }]}>You sent</Text>
        <Text style={[styles.amount, { color: themeColors.textPrimary }]}>{formattedAmount}</Text>
        <View style={styles.statusPill}>
          <View style={[styles.statusDot, { backgroundColor: themeColors.success }]} />
          <Text style={[styles.statusText, { color: themeColors.success }]}>Successful</Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: themeColors.border }]} />

      <View style={styles.recipientRow}>
        <View style={styles.avatar}>
          <Text style={[styles.avatarText, { color: themeColors.primaryLight }]}>{recipientInitials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: themeColors.textPrimary }]}>{recipientName}</Text>
          {!!recipientBank && <Text style={[styles.sub, { color: themeColors.textSecondary }]}>{recipientBank}</Text>}
        </View>
        <TouchableOpacity style={styles.chatBtn}>
          <Feather name="message-square" size={14} color={themeColors.primaryLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 18 },
  top: { alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 11, marginBottom: 4 },
  amount: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(52,199,89,0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  statusDot: { width: 5, height: 5, borderRadius: 2.5 },
  statusText: { fontSize: 10, fontWeight: '600' },
  divider: { height: 1, marginBottom: 12 },
  recipientRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(167,139,250,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 12, fontWeight: '700' },
  name: { fontSize: 12, fontWeight: '600' },
  sub: { fontSize: 10, marginTop: 1 },
  chatBtn: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(167,139,250,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
});