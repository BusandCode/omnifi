import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

const walletAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';

export function ReceiveCryptoCard() {
  const layoutScale = useLayoutScale();
  const [copied, setCopied] = useState(false);

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(11),
      styles: StyleSheet.create({
        card: { 
          backgroundColor: colors.surface, 
          borderRadius: s(16), 
          padding: s(12) 
        },
        header: { 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: s(10) 
        },
        title: { color: colors.textPrimary, fontSize: f(12.5), fontWeight: '700' },
        sub: { color: colors.textSecondary, fontSize: f(9.5), marginTop: s(2) },
        qrBtn: { flexDirection: 'row', alignItems: 'center', gap: s(4) },
        qrText: { color: colors.primaryLight, fontSize: f(10.5), fontWeight: '600' },
        selectRow: {
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: s(8),
          backgroundColor: '#0F0F11', 
          borderRadius: s(10), 
          padding: s(10), 
          marginBottom: s(10),
        },
        coinIcon: { 
          width: s(28), 
          height: s(28), 
          borderRadius: s(14), 
          backgroundColor: '#F7931A', 
          justifyContent: 'center', 
          alignItems: 'center' 
        },
        coinSymbol: { color: '#fff', fontSize: f(14), fontWeight: '800' },
        coinName: { color: colors.textPrimary, fontSize: f(12), fontWeight: '600' },
        coinCode: { color: colors.textSecondary, fontSize: f(9), marginTop: s(1) },
        fieldLabelRow: { 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: s(4), 
          marginBottom: s(6) 
        },
        fieldLabel: { color: colors.textSecondary, fontSize: f(10), marginBottom: s(6) },
        selectRowSmall: {
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#0F0F11', 
          borderRadius: s(10), 
          padding: s(10), 
          marginBottom: s(10),
        },
        networkText: { color: colors.textPrimary, fontSize: f(11), fontWeight: '600' },
        addressRow: {
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: s(6),
          backgroundColor: '#0F0F11', 
          borderRadius: s(10), 
          padding: s(10), 
          marginBottom: s(8),
        },
        addressText: { 
          flex: 1, 
          color: colors.textPrimary, 
          fontSize: f(10) 
        },
        copyBtn: {
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: s(3),
          backgroundColor: 'rgba(167,139,250,0.15)', 
          paddingHorizontal: s(7), 
          paddingVertical: s(5), 
          borderRadius: s(7),
        },
        copyText: { color: colors.primaryLight, fontSize: f(9.5), fontWeight: '600' },
        warning: { color: colors.textSecondary, fontSize: f(9), lineHeight: s(12.5) },
        warningHighlight: { color: '#F5A623', fontWeight: '700' },
        textContainer: { flex: 1 },
      }),
    };
  }, [layoutScale]);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Receive Crypto</Text>
          <Text style={styles.sub}>Get crypto to your wallet</Text>
        </View>
        <TouchableOpacity style={styles.qrBtn}>
          <Feather name="grid" size={iconSize} color={colors.primaryLight} />
          <Text style={styles.qrText}>Show QR</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.selectRow}>
        <View style={styles.coinIcon}>
          <Text style={styles.coinSymbol}>₿</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.coinName}>Bitcoin</Text>
          <Text style={styles.coinCode}>BTC</Text>
        </View>
        <Ionicons name="chevron-down" size={iconSize + 3} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.fieldLabelRow}>
        <Text style={styles.fieldLabel}>Network</Text>
        <Feather name="info" size={iconSize - 1} color={colors.textSecondary} />
      </View>
      <TouchableOpacity style={styles.selectRowSmall}>
        <Text style={styles.networkText}>Bitcoin Network (BTC)</Text>
        <Ionicons name="chevron-down" size={iconSize + 2} color={colors.textSecondary} />
      </TouchableOpacity>

      <Text style={styles.fieldLabel}>Wallet Address</Text>
      <View style={styles.addressRow}>
        <Text style={styles.addressText} numberOfLines={1}>{walletAddress}</Text>
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <Feather name={copied ? 'check' : 'copy'} size={iconSize} color={colors.primaryLight} />
          <Text style={styles.copyText}>{copied ? 'Copied' : 'Copy'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.warning}>
        Only send <Text style={styles.warningHighlight}>BTC</Text> to this address. Sending any other coin may result in loss.
      </Text>
    </View>
  );
}