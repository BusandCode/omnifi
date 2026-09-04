// src/components/gift-card/GiftWalletCard.tsx
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { useBalances } from '../../store/BalanceContext';

const GRADIENTS = {
  dark: ['#2A1858', '#160D33', '#0A0616'],
  light: ['#EFE9FC', '#E4D9F9', '#D9CCF5'],
};

export function GiftWalletCard() {
  const [visible, setVisible] = useState(true);
  const { balances } = useBalances();
  const { colors: themeColors, mode } = useTheme();
  const isLight = mode === 'light';

  const balance = balances.NGN.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const giftImage = isLight
    ? require('../../../assets/gift-light.png')
    : require('../../../assets/gift.png');

  const textStrong = isLight ? '#2A1858' : '#fff';
  const textMuted = isLight ? 'rgba(42,24,88,0.65)' : 'rgba(255,255,255,0.7)';
  const textFaint = isLight ? 'rgba(42,24,88,0.5)' : 'rgba(255,255,255,0.5)';

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={isLight ? GRADIENTS.light : GRADIENTS.dark}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.topRow}>
        <View style={styles.left}>
          <View style={styles.labelRow}>
            <Text style={[styles.label, { color: textMuted }]}>Wallet Balance</Text>
            <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
              <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={11} color={textMuted} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.amount, { color: textStrong }]}>{visible ? `₦${balance}` : '••••••••••'}</Text>
          <Text style={[styles.sub, { color: textFaint }]}>Available Balance</Text>
        </View>

        <View style={styles.illustrationCol}>
          <Image source={giftImage} style={styles.illustration} resizeMode="contain" />
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: themeColors.primary }]}>
          <Feather name="plus-circle" size={12} color="#fff" />
          <Text style={styles.addText}>Add Money</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.withdrawBtn,
            { borderColor: isLight ? 'rgba(42,24,88,0.25)' : '#3A3A3C' },
          ]}
        >
          <Feather name="download" size={11} color={themeColors.primaryLight} />
          <Text style={[styles.withdrawText, { color: textStrong }]}>Withdraw</Text>
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
  label: { fontSize: 10.5 },
  amount: { fontSize: 14, fontWeight: '700', marginBottom: 3 },
  sub: { fontSize: 9 },
  illustrationCol: { alignItems: 'center', gap: 6 },
  illustration: { width: 60, height: 60 },
  actionsRow: { flexDirection: 'row', gap: 7 },
  addBtn: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5,
    borderRadius: 10, paddingVertical: 8,
  },
  addText: { color: '#fff', fontSize: 10.5, fontWeight: '700' },
  withdrawBtn: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5,
    borderWidth: 1, borderRadius: 10, paddingVertical: 8,
  },
  withdrawText: { fontSize: 10.5, fontWeight: '600' },
});