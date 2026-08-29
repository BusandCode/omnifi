import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { colors } from '../../theme/colors';

const accountNumber = '0114 7892 3648';

export function VirtualAccountCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(accountNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#160C34', '#0D0820', '#050308']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.topRow}>
        <Text style={styles.label}>Your Virtual Account</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Active</Text>
        </View>
      </View>

      <View style={styles.numberRow}>
        <Text style={styles.number}>{accountNumber}</Text>
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <Feather name={copied ? 'check' : 'copy'} size={12} color={colors.primaryLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.bankRow}>
        <View style={styles.bankIcon}>
          <Ionicons name="shield-checkmark" size={13} color={colors.primaryLight} />
        </View>
        <View>
          <Text style={styles.bankName}>Kuda Bank</Text>
          <Text style={styles.bankSub}>Silver Abdul</Text>
        </View>
      </View>

      <View style={styles.illustration}>
        <Ionicons name="business" size={67.6} color="rgba(167,139,250,0.55)" />
        <View style={styles.plusBadge}>
          <Feather name="plus" size={13} color="#fff" />
        </View>
      </View>

      <View style={styles.infoBox}>
        <Feather name="info" size={14} color={colors.primaryLight} style={{ marginTop: 1 }} />
        <View style={styles.textContainer}>
          <Text style={styles.infoTitle}>Transfer from any bank or fintech app</Text>
          <Text style={styles.infoSub}>Use the account number above to transfer funds to your virtual account.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderRadius: 18, padding: 16, overflow: 'hidden', marginBottom: 4 },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { color: 'rgba(255,255,255,0.65)', fontSize: 12, marginRight: 8 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  statusDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.success },
  statusText: { color: colors.success, fontSize: 11, fontWeight: '600' },
  numberRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 12 },
  number: { color: '#fff', fontSize: 17, fontWeight: '700', letterSpacing: 0.2 },
  copyBtn: {
    width: 20, height: 20, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center', alignItems: 'center',
  },
  bankRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bankIcon: {
    width: 24, height: 24, borderRadius: 7, backgroundColor: 'rgba(167,139,250,0.18)',
    justifyContent: 'center', alignItems: 'center',
  },
  bankName: { color: '#fff', fontSize: 12, fontWeight: '600' },
  bankSub: { color: 'rgba(255,255,255,0.45)', fontSize: 10, marginTop: 1 },
  illustration: {
    position: 'absolute', top: 10, right: 2,
    justifyContent: 'center', alignItems: 'center',
  },
  plusBadge: {
    position: 'absolute', bottom: -5, right: -5,
    width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2.5, borderColor: '#0D0820',
  },
  infoBox: {
    flexDirection: 'row', gap: 8, marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 10,
  },
  infoTitle: { color: '#fff', fontSize: 11, fontWeight: '600', marginBottom: 2 },
  infoSub: { color: 'rgba(255,255,255,0.55)', fontSize: 10, lineHeight: 14 },
  textContainer: { flex: 1 },
});