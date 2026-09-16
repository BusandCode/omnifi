import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const balance = '3,106,055.21';

export function HistoryWalletCard() {
  const { mode } = useTheme();
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
      }
    : {
        label: 'rgba(255,255,255,0.7)',
        amount: '#fff',
        walletText: 'rgba(255,255,255,0.6)',
        icon: 'rgba(255,255,255,0.6)',
      };

  const styles = useMemo(
    () => StyleSheet.create({
  wrapper: { flexDirection: 'row', borderRadius: 18, padding: 16, overflow: 'hidden'},
  left: { flex: 1 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  label: { fontSize: 12 },
  amount: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  walletRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  walletText: { fontSize: 11 },
  illustration: { width: 130, height: 100,marginTop:-10 },
}),
    []
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
          <Text style={[styles.label, { color: fg.label }]}>Wallet Balance</Text>
          <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
            <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={13} color={fg.icon} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.amount, { color: fg.amount }]}>{visible ? `₦${balance}` : '••••••••••'}</Text>

        <TouchableOpacity style={styles.walletRow}>
          <Text style={[styles.walletText, { color: fg.walletText }]}>Naira Wallet</Text>
          <Ionicons name="chevron-down" size={12} color={fg.icon} />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../../../assets/naira.png')}
        style={styles.illustration}
        resizeMode="contain"
      />
    </View>
  );
}