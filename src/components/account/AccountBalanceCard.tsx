import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

type AccountBalanceCardProps = {
  flag: string;
  code: CurrencyCode;
  balance: number;
  onHold: number;
};

function formatMoney(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function AccountBalanceCard({ flag, code, balance, onHold }: AccountBalanceCardProps) {
  const [visible, setVisible] = useState(true);
  const availableBalance = balance - onHold;
  const { symbol } = getCurrency(code);

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2A1858', '#160D33', '#0A0616']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.topRow}>
        <View style={styles.left}>
          <Text style={styles.flag}>{flag}</Text>
          <View>
            <View style={styles.labelRow}>
              <Text style={styles.label}>{code} Balance</Text>
              <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
                <Ionicons
                  name={visible ? 'eye-outline' : 'eye-off-outline'}
                  size={14}
                  color="rgba(255,255,255,0.6)"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.amount}>
              {visible ? `${symbol}${formatMoney(balance)}` : '••••••'}
            </Text>
          </View>
        </View>

        <View style={styles.activeBadge}>
          <Text style={styles.activeText}>Active</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footerRow}>
        <View>
          <Text style={styles.footerLabel}>Available Balance</Text>
          <Text style={styles.footerValue}>{symbol}{formatMoney(availableBalance)}</Text>
        </View>
        <View style={styles.onHoldGroup}>
          <View style={styles.onHoldLabelRow}>
            <Text style={styles.footerLabel}>On Hold</Text>
            <Ionicons name="information-circle-outline" size={12} color="rgba(255,255,255,0.5)" />
          </View>
          <Text style={styles.footerValue}>{symbol}{formatMoney(onHold)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderRadius: 18, padding: 16, overflow: 'hidden' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  left: { flexDirection: 'row', gap: 10 },
  flag: { fontSize: 30, marginTop: 2 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  label: { color: 'rgba(255,255,255,0.65)', fontSize: 11.5 },
  amount: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 4 },
  activeBadge: {
    backgroundColor: 'rgba(52,199,89,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  activeText: { color: colors.success, fontSize: 10.5, fontWeight: '700' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 16 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  footerLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 10.5 },
  footerValue: { color: '#fff', fontSize: 13.5, fontWeight: '700', marginTop: 4 },
  onHoldGroup: { alignItems: 'flex-end' },
  onHoldLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});