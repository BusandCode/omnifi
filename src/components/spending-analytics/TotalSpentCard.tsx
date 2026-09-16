import {useState, useMemo} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

type Props = {
  totalSpent: number;
  vsLastPeriodPercent: number;
  moneyIn: number;
  moneyOut: number;
  currency: CurrencyCode;
};

function WalletIllustration() {
  return (
    <View style={illStyles.wrap}>
      <View style={illStyles.walletBack} />
      <View style={illStyles.walletFront}>
        <Svg width={30} height={20} viewBox="0 0 30 20">
          <Path
            d="M2 16 L9 8 L15 13 L28 2"
            fill="none"
            stroke="#fff"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      <View style={illStyles.coinStack}>
        <View style={[illStyles.coin, { bottom: 0 }]} />
        <View style={[illStyles.coin, { bottom: 6 }]} />
        <View style={[illStyles.coin, { bottom: 12 }]} />
      </View>
      <View style={illStyles.pie}>
        <Svg width={34} height={34} viewBox="0 0 34 34">
          <Path d="M17 17 L17 1 A16 16 0 0 1 30.86 24.5 Z" fill="#6D28D9" />
          <Path d="M17 17 L30.86 24.5 A16 16 0 0 1 3.14 24.5 Z" fill="#4C1D95" />
          <Path d="M17 17 L3.14 24.5 A16 16 0 0 1 17 1 Z" fill="#8B5CF6" />
        </Svg>
      </View>
    </View>
  );
}

export function TotalSpentCard({ totalSpent, vsLastPeriodPercent, moneyIn, moneyOut, currency }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: { borderRadius: 20, padding: 16, overflow: 'hidden' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  label: { color: 'rgba(255,255,255,0.65)', fontSize: 11.5 },
  amount: { color: '#fff', fontSize: 26, fontWeight: '800' },
  changeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  changePill: { flexDirection: 'row', alignItems: 'center', gap: 3, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
  changeText: { fontSize: 10.5, fontWeight: '700' },
  changeSub: { color: 'rgba(255,255,255,0.5)', fontSize: 10.5 },
  rightCol: { alignItems: 'flex-end', gap: 10 },
  currencyPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  currencyText: { color: '#fff', fontSize: 10.5, fontWeight: '700' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(255,255,255,0.12)', marginVertical: 14 },
  summaryRow: { flexDirection: 'row', alignItems: 'center' },
  summaryItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  summaryDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.12)', marginHorizontal: 10 },
  summaryIcon: { width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  summaryLabel: { color: 'rgba(255,255,255,0.55)', fontSize: 9.5 },
  summaryValue: { color: '#fff', fontSize: 12, fontWeight: '700', marginTop: 2 },
}),
    [themeColors]
  );

  const [visible, setVisible] = useState(true);
  const { symbol } = getCurrency(currency);

  const money = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const isDown = vsLastPeriodPercent < 0;

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#2A1858', '#160D33', '#0A0616']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Total Spent</Text>
            <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
              <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={13} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>

          <Text style={styles.amount}>{visible ? `${symbol}${money(totalSpent)}` : '••••••••'}</Text>

          <View style={styles.changeRow}>
            <View style={[styles.changePill, { backgroundColor: isDown ? 'rgba(52,199,89,0.15)' : 'rgba(255,59,48,0.15)' }]}>
              <Feather name={isDown ? 'arrow-down' : 'arrow-up'} size={10} color={isDown ? themeColors.success : themeColors.danger} />
              <Text style={[styles.changeText, { color: isDown ? themeColors.success : themeColors.danger }]}>
                {Math.abs(vsLastPeriodPercent)}%
              </Text>
            </View>
            <Text style={styles.changeSub}>vs last period</Text>
          </View>
        </View>

        <View style={styles.rightCol}>
          <TouchableOpacity style={styles.currencyPill}>
            <Text style={styles.currencyText}>{currency}</Text>
            <Ionicons name="chevron-down" size={12} color="#fff" />
          </TouchableOpacity>
          <WalletIllustration />
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <View style={[styles.summaryIcon, { backgroundColor: 'rgba(52,199,89,0.15)' }]}>
            <Feather name="arrow-up" size={12} color={themeColors.success} />
          </View>
          <View>
            <Text style={styles.summaryLabel}>Money In</Text>
            <Text style={styles.summaryValue}>{symbol}{money(moneyIn)}</Text>
          </View>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <View style={[styles.summaryIcon, { backgroundColor: 'rgba(255,59,48,0.15)' }]}>
            <Feather name="arrow-down" size={12} color={themeColors.danger} />
          </View>
          <View>
            <Text style={styles.summaryLabel}>Money Out</Text>
            <Text style={styles.summaryValue}>{symbol}{money(moneyOut)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const illStyles = StyleSheet.create({
  wrap: { width: 90, height: 70, position: 'relative' },
  walletBack: {
    position: 'absolute', bottom: 4, left: 6,
    width: 62, height: 44, borderRadius: 10,
    backgroundColor: '#3B2170',
  },
  walletFront: {
    position: 'absolute', bottom: 0, left: 0,
    width: 62, height: 44, borderRadius: 10,
    backgroundColor: '#6D28D9',
    justifyContent: 'center', alignItems: 'center',
  },
  coinStack: { position: 'absolute', left: -4, bottom: 4 },
  coin: {
    position: 'absolute',
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#A78BFA',
    borderWidth: 1.5, borderColor: '#2A1858',
  },
  pie: { position: 'absolute', right: -4, top: -2 },
});

