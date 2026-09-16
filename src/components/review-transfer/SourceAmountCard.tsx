import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  flag: string;
  accountLabel: string;
  availableBalanceLabel: string;
  amountLabel: string;
  currencyBadge: string;
};

export function SourceAmountCard({ flag, accountLabel, availableBalanceLabel, amountLabel, currencyBadge }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: { backgroundColor: themeColors.surface, borderRadius: 18, padding: 16 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  left: { flexDirection: 'row', gap: 10, flex: 1 },
  flagCircle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden',
  },
  flag: { fontSize: 18 },
  label: { color: themeColors.textSecondary, fontSize: 10.5 },
  accountName: { color: themeColors.textPrimary, fontSize: 14, fontWeight: '700', marginTop: 2 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: themeColors.success },
  statusText: { color: themeColors.success, fontSize: 10.5, fontWeight: '600' },
  balanceCol: { alignItems: 'flex-end' },
  balanceLabel: { color: themeColors.textSecondary, fontSize: 10 },
  balanceValue: { color: themeColors.success, fontSize: 15, fontWeight: '700', marginTop: 3 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: themeColors.border, marginVertical: 14 },
  sendRow: { flexDirection: 'row', alignItems: 'flex-start' },
  sendLabel: { color: themeColors.textSecondary, fontSize: 11 },
  sendAmount: { color: themeColors.textPrimary, fontSize: 26, fontWeight: '800', marginTop: 4 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 8,
  },
  badgeText: { color: themeColors.textSecondary, fontSize: 10.5, fontWeight: '600' },
  coinIllustration: { width: 70, height: 70, justifyContent: 'center', alignItems: 'center' },
  coinBack: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: 'rgba(167,139,250,0.3)',
    justifyContent: 'flex-end', alignItems: 'center',
    paddingBottom: 2,
  },
  coinFront: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: themeColors.primary,
    justifyContent: 'center', alignItems: 'center',
    position: 'absolute', top: -8,
  },
  coinSymbol: { color: '#fff', fontSize: 22, fontWeight: '800' },
}),
    [themeColors]
  );

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <View style={styles.flagCircle}>
            <Text style={styles.flag}>{flag}</Text>
          </View>
          <View>
            <Text style={styles.label}>From</Text>
            <Text style={styles.accountName}>{accountLabel}</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
        </View>

        <View style={styles.balanceCol}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceValue}>{availableBalanceLabel}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.sendRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sendLabel}>You will send</Text>
          <Text style={styles.sendAmount}>{amountLabel}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{currencyBadge}</Text>
          </View>
        </View>

        <View style={styles.coinIllustration}>
          <View style={styles.coinBack}>
            <View style={styles.coinFront}>
              <Text style={styles.coinSymbol}>$</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

