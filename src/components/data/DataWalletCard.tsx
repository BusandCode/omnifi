import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const balance = '3,106,055.21';

export function DataWalletCard() {
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
            <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={12} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>

        <Text style={styles.amount}>{visible ? `₦${balance}` : '••••••••••'}</Text>

        <TouchableOpacity style={styles.walletRow}>
          <Text style={styles.walletText}>Naira Wallet</Text>
          <Ionicons name="chevron-down" size={11} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>
      </View>

      <View style={styles.illustration}>
        <View style={styles.phoneBody}>
          <Feather name="wifi" size={18} color="#fff" />
        </View>
        <View style={styles.dataBadge}>
          <Text style={styles.dataBadgeText}>DATA</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', borderRadius: 14, padding: 11, overflow: 'hidden', alignItems: 'center',marginTop:10 },
  left: { flex: 1 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 5 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 10.5 },
  amount: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 5 },
  walletRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  walletText: { color: 'rgba(255,255,255,0.6)', fontSize: 9.5 },
  illustration: { width: 56, height: 56, justifyContent: 'center', alignItems: 'center' },
  phoneBody: {
    width: 34, height: 50, borderRadius: 8, backgroundColor: '#4B23B6',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: 'rgba(167,139,250,0.5)',
  },
  dataBadge: {
    position: 'absolute', bottom: -2, right: -2,
    backgroundColor: colors.primary, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6,
    borderWidth: 2, borderColor: '#160D33',
  },
  dataBadgeText: { color: '#fff', fontSize: 7, fontWeight: '800' },
});