import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

type AccountSourceCardProps = {
  currency: CurrencyCode;
  balance: number;
};

export function AccountSourceCard({ currency, balance }: AccountSourceCardProps) {
  const { flag, symbol, label } = getCurrency(currency);

  const formattedBalance = `${symbol}${balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2A1858', '#160D33', '#0A0616']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.flag}>{flag}</Text>
          <View>
            <Text style={styles.label}>From</Text>
            <Text style={styles.accountName}>{currency} Account</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
        </View>

        <View style={styles.illustration}>
          <View style={styles.coinBack}>
            <View style={styles.coinFront}>
              <Feather name="dollar-sign" size={16} color="#fff" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.balanceBlock}>
        <View style={styles.balanceLabelRow}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Ionicons name="information-circle-outline" size={12} color="rgba(255,255,255,0.5)" />
        </View>
        <Text style={styles.balance}>{formattedBalance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderRadius: 16, padding: 13, overflow: 'hidden',marginTop:-10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  left: { flexDirection: 'row', gap: 9 },
  flag: { fontSize: 21, marginTop: 1 },
  label: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
  accountName: { color: '#fff', fontSize: 14, fontWeight: '700', marginTop: 1 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  statusDot: { width: 5.5, height: 5.5, borderRadius: 2.75, backgroundColor: colors.success },
  statusText: { color: colors.success, fontSize: 10, fontWeight: '600' },
  illustration: { width: 56, height: 56, justifyContent: 'center', alignItems: 'center' },
  coinBack: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(167,139,250,0.35)',
    justifyContent: 'flex-end', alignItems: 'center',
    paddingBottom: 2,
  },
  coinFront: {
    width: 39, height: 39, borderRadius: 19.5,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    position: 'absolute', top: -8,
  },
  balanceBlock: { marginTop: 13 },
  balanceLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 3 },
  balanceLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10.5 },
  balance: { color: '#fff', fontSize: 21, fontWeight: '700' },
});