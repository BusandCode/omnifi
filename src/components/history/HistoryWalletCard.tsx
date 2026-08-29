import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const balance = '3,106,055.21';

export function HistoryWalletCard() {
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
          <Text style={styles.label}>Wallet Balance</Text>
          <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
            <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={13} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>

        <Text style={styles.amount}>{visible ? `₦${balance}` : '••••••••••'}</Text>

        <TouchableOpacity style={styles.walletRow}>
          <Text style={styles.walletText}>Naira Wallet</Text>
          <Ionicons name="chevron-down" size={12} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>
      </View>

      <View style={styles.illustration}>
        <View style={styles.cardBack} />
        <View style={styles.walletBody}>
          <View style={styles.badgeCircle}>
            <Text style={styles.badgeText}>₦</Text>
          </View>
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
  walletRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  walletText: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  illustration: { width: 76, height: 76, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  cardBack: {
    position: 'absolute', top: 6, right: 4,
    width: 40, height: 26, borderRadius: 6, backgroundColor: '#3B82F6',
    transform: [{ rotate: '18deg' }],
  },
  walletBody: {
    width: 54, height: 44, borderRadius: 10, backgroundColor: '#4B23B6',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: 'rgba(167,139,250,0.5)',
  },
  badgeCircle: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
});