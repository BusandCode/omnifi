import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

type Props = {
  amount: number;
  currency: CurrencyCode;
  recipientName: string;
  recipientBank: string;
  recipientInitials: string;
};

export function TransferSummary({ amount, currency, recipientName, recipientBank, recipientInitials }: Props) {
  const { symbol } = getCurrency(currency);
  const formattedAmount = `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.label}>You sent</Text>
        <Text style={styles.amount}>{formattedAmount}</Text>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Successful</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.recipientRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{recipientInitials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{recipientName}</Text>
          {!!recipientBank && <Text style={styles.sub}>{recipientBank}</Text>}
        </View>
        <TouchableOpacity style={styles.chatBtn}>
          <Feather name="message-square" size={14} color={colors.primaryLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 18 },
  top: { alignItems: 'center', marginBottom: 12 },
  label: { color: colors.textSecondary, fontSize: 11, marginBottom: 4 },
  amount: { color: colors.textPrimary, fontSize: 22, fontWeight: '700', marginBottom: 8 },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(52,199,89,0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  statusDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.success },
  statusText: { color: colors.success, fontSize: 10, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#2C2C2E', marginBottom: 12 },
  recipientRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(167,139,250,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: colors.primaryLight, fontSize: 12, fontWeight: '700' },
  name: { color: colors.textPrimary, fontSize: 12, fontWeight: '600' },
  sub: { color: colors.textSecondary, fontSize: 10, marginTop: 1 },
  chatBtn: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(167,139,250,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
});