import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useTheme } from '../../theme/ThemeContext';

const accountNumber = '0114 7892 3648';

export function VirtualAccountCard() {
  const [copied, setCopied] = useState(false);
  const { colors: themeColors } = useTheme();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(accountNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: themeColors.surface, borderColor: themeColors.border, borderWidth: 1 }]}>
      <LinearGradient
        colors={[themeColors.primaryTint, 'rgba(167,139,250,0.03)', 'rgba(255,255,255,0)']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.topRow}>
        <Text style={[styles.label, { color: themeColors.textSecondary }]}>Your Virtual Account</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: themeColors.success }]} />
          <Text style={[styles.statusText, { color: themeColors.success }]}>Active</Text>
        </View>
      </View>

      <View style={styles.numberRow}>
        <Text style={[styles.number, { color: themeColors.textPrimary }]}>{accountNumber}</Text>
        <TouchableOpacity style={[styles.copyBtn, { backgroundColor: themeColors.primaryTint }]} onPress={handleCopy}>
          <Feather name={copied ? 'check' : 'copy'} size={12} color={themeColors.primaryLight} />
        </TouchableOpacity>
      </View>

      <View style={styles.bankRow}>
        <View style={[styles.bankIcon, { backgroundColor: themeColors.primaryTint }]}>
          <Ionicons name="shield-checkmark" size={13} color={themeColors.primaryLight} />
        </View>
        <View>
          <Text style={[styles.bankName, { color: themeColors.textPrimary }]}>Kuda Bank</Text>
          <Text style={[styles.bankSub, { color: themeColors.textSecondary }]}>Silver Abdul</Text>
        </View>
      </View>

      <View style={styles.illustration}>
        <Ionicons name="business" size={67.6} color={themeColors.primaryTint} />
        <View style={[styles.plusBadge, { backgroundColor: themeColors.primary, borderColor: themeColors.surface }]}>
          <Feather name="plus" size={13} color="#fff" />
        </View>
      </View>

      <View style={[styles.infoBox, { backgroundColor: themeColors.background }]}>
        <Feather name="info" size={14} color={themeColors.primaryLight} style={{ marginTop: 1 }} />
        <View style={styles.textContainer}>
          <Text style={[styles.infoTitle, { color: themeColors.textPrimary }]}>Transfer from any bank or fintech app</Text>
          <Text style={[styles.infoSub, { color: themeColors.textSecondary }]}>
            Use the account number above to transfer funds to your virtual account.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderRadius: 18, padding: 16, overflow: 'hidden', marginBottom: 4 },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 12, marginRight: 8 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  statusDot: { width: 5, height: 5, borderRadius: 2.5 },
  statusText: { fontSize: 11, fontWeight: '600' },
  numberRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 12 },
  number: { fontSize: 17, fontWeight: '700', letterSpacing: 0.2 },
  copyBtn: {
    width: 20, height: 20, borderRadius: 5,
    justifyContent: 'center', alignItems: 'center',
  },
  bankRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bankIcon: {
    width: 24, height: 24, borderRadius: 7,
    justifyContent: 'center', alignItems: 'center',
  },
  bankName: { fontSize: 12, fontWeight: '600' },
  bankSub: { fontSize: 10, marginTop: 1 },
  illustration: {
    position: 'absolute', top: 10, right: 2,
    justifyContent: 'center', alignItems: 'center',
  },
  plusBadge: {
    position: 'absolute', bottom: -5, right: -5,
    width: 26, height: 26, borderRadius: 13,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2.5,
  },
  infoBox: {
    flexDirection: 'row', gap: 8, marginTop: 16,
    borderRadius: 12, padding: 10,
  },
  infoTitle: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
  infoSub: { fontSize: 10, lineHeight: 14 },
  textContainer: { flex: 1 },
});