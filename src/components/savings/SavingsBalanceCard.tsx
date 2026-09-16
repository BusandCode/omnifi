import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const balance = '3,106,055.21';
const interest = '106,550.75';

export function SavingsBalanceCard() {
  const { mode, colors: themeColors } = useTheme();
  const isLight = mode === 'light';

  const gradientColors = isLight
    ? (['#FFFFFF', '#F7F3FD', '#EFE7FB'] as const)
    : (['#2A1858', '#160D33', '#0A0616'] as const);

  const fg = isLight
    ? {
        label: 'rgba(46,20,90,0.6)',
        amount: '#2E145A',
        walletText: 'rgba(46,20,90,0.55)',
        icon: 'rgba(46,20,90,0.55)',
        interestLabel: 'rgba(46,20,90,0.5)',
      }
    : {
        label: 'rgba(255,255,255,0.7)',
        amount: '#fff',
        walletText: 'rgba(255,255,255,0.6)',
        icon: 'rgba(255,255,255,0.6)',
        interestLabel: 'rgba(255,255,255,0.5)',
      };

  const styles = useMemo(
    () => StyleSheet.create({
  wrapper: { flexDirection: 'row', borderRadius: 18, padding: 16, overflow: 'hidden' },
  left: { flex: 1 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  label: { fontSize: 12 },
  amount: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  walletRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  walletText: { fontSize: 11 },
  interestBlock: {},
  interestLabel: { fontSize: 10, marginBottom: 3 },
  interestRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  interestValue: { color: themeColors.success, fontSize: 13, fontWeight: '700' },
  illustration: { width: 130, height: 100 },
}),
    [themeColors]
  );

  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.left}>
        <View style={styles.labelRow}>
          <Text style={[styles.label, { color: fg.label }]}>Total Savings Balance</Text>
          <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
            <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={13} color={fg.icon} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.amount, { color: fg.amount }]}>{visible ? `₦${balance}` : '••••••••••'}</Text>

        <TouchableOpacity style={styles.walletRow}>
          <Text style={[styles.walletText, { color: fg.walletText }]}>Naira Wallet</Text>
          <Ionicons name="chevron-down" size={12} color={fg.icon} />
        </TouchableOpacity>

        <View style={styles.interestBlock}>
          <Text style={[styles.interestLabel, { color: fg.interestLabel }]}>Total Interest Earned</Text>
          <View style={styles.interestRow}>
            <Text style={styles.interestValue}>{visible ? `₦${interest}` : '••••••'}</Text>
            <Feather name="trending-up" size={12} color={themeColors.success} />
          </View>
        </View>
      </View>

      <Image
        source={
          isLight
            ? require('../../../assets/savings-light.png')
            : require('../../../assets/savings.png')
        }
        style={styles.illustration}
        resizeMode="contain"
      />
    </View>
  );
}