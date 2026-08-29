import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const balance = '3,106,055.21';
const interest = '106,550.75';

export function SavingsBalanceCard() {
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2A1858', '#160D33', '#0A0616']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.left}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Total Savings Balance</Text>
          <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
            <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={13} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>

        <Text style={styles.amount}>{visible ? `₦${balance}` : '••••••••••'}</Text>

        <TouchableOpacity style={styles.walletRow}>
          <Text style={styles.walletText}>Naira Wallet</Text>
          <Ionicons name="chevron-down" size={12} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>

        <View style={styles.interestBlock}>
          <Text style={styles.interestLabel}>Total Interest Earned</Text>
          <View style={styles.interestRow}>
            <Text style={styles.interestValue}>{visible ? `₦${interest}` : '••••••'}</Text>
            <Feather name="trending-up" size={12} color={colors.success} />
          </View>
        </View>
      </View>

      <View style={styles.illustration}>
        <View style={styles.safeBody}>
          <View style={styles.dial} />
        </View>
        <View style={styles.coinStack} />
        <View style={styles.badgeCircle}>
          <Text style={styles.badgeText}>₦</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', borderRadius: 18, padding: 16, overflow: 'hidden' },
  left: { flex: 1 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  amount: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  walletRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  walletText: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  interestBlock: {},
  interestLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginBottom: 3 },
  interestRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  interestValue: { color: colors.success, fontSize: 13, fontWeight: '700' },
  illustration: { width: 76, height: 76, justifyContent: 'flex-end', alignItems: 'center', position: 'relative' },
  safeBody: {
    width: 54, height: 54, borderRadius: 10, backgroundColor: '#4B23B6',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: 'rgba(167,139,250,0.5)',
  },
  dial: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)',
  },
  coinStack: {
    position: 'absolute', bottom: 0, left: 2,
    width: 16, height: 20, borderRadius: 8, backgroundColor: '#7C4FE0',
  },
  badgeCircle: {
    position: 'absolute', bottom: -4, right: -2,
    width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: '#160D33',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '800' },
});