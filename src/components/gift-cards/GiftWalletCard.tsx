import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { useBalances } from '../../store/BalanceContext';

export function GiftWalletCard() {
  const [visible, setVisible] = useState(true);
  const { balances } = useBalances();

  const balance = balances.NGN.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
          <View style={styles.labelRow}>
            <Text style={styles.label}>Wallet Balance</Text>
            <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
              <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={11} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>
          <Text style={styles.amount}>{visible ? `₦${balance}` : '••••••••••'}</Text>
          <Text style={styles.sub}>Available Balance</Text>
        </View>

        <View style={styles.illustrationCol}>
          <View style={styles.illustration}>
            <View style={styles.giftBox}>
              <View style={styles.giftRibbonV} />
              <View style={styles.giftRibbonH} />
            </View>
            <View style={styles.giftBow} />
          </View>

          <TouchableOpacity
            style={styles.tradeBtn}
            onPress={() => router.push('/gift-card-trading')}
          >
            <Feather name="repeat" size={10} color={colors.primaryLight} />
            <Text style={styles.tradeText}>Trade Card</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.addBtn}>
          <Feather name="plus-circle" size={12} color="#fff" />
          <Text style={styles.addText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.withdrawBtn}>
          <Feather name="download" size={11} color={colors.primaryLight} />
          <Text style={styles.withdrawText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderRadius: 15, padding: 11, overflow: 'hidden' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 9 },
  left: { flex: 1 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 4 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 10.5 },
  amount: { color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 3 },
  sub: { color: 'rgba(255,255,255,0.5)', fontSize: 9 },
  illustrationCol: { alignItems: 'center', gap: 6 },
  illustration: { width: 54, height: 54, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  giftBox: {
    width: 40, height: 40, borderRadius: 7, backgroundColor: '#6A3FD9',
    borderWidth: 1.2, borderColor: 'rgba(167,139,250,0.5)',
  },
  giftRibbonV: { position: 'absolute', top: 0, bottom: 0, left: '48%', width: 3, backgroundColor: 'rgba(255,255,255,0.3)' },
  giftRibbonH: { position: 'absolute', left: 0, right: 0, top: '44%', height: 3, backgroundColor: 'rgba(255,255,255,0.3)' },
  giftBow: {
    position: 'absolute', top: -5, alignSelf: 'center',
    width: 16, height: 10, borderRadius: 5, backgroundColor: '#8B5CF6',
  },
  tradeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(167,139,250,0.15)',
    borderWidth: 1, borderColor: 'rgba(167,139,250,0.4)',
    borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4,
  },
  tradeText: { color: colors.primaryLight, fontSize: 8.5, fontWeight: '700' },
  actionsRow: { flexDirection: 'row', gap: 7 },
  addBtn: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5,
    backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 8,
  },
  addText: { color: '#fff', fontSize: 10.5, fontWeight: '700' },
  withdrawBtn: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5,
    borderWidth: 1, borderColor: '#3A3A3C', borderRadius: 10, paddingVertical: 8,
  },
  withdrawText: { color: colors.textPrimary, fontSize: 10.5, fontWeight: '600' },
});