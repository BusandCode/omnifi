import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const total = '562,430.00';
const ICON_SIZE = 14;

export function TotalBillsCard() {
  const { colors: themeColors } = useTheme();
  const [visible, setVisible] = useState(true);

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      borderRadius: 20,
      padding: 15,
      overflow: 'hidden',
      marginTop: -4,
    },
    left: { flex: 1 },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 10,
    },
    label: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
    amountRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
    currency: { color: '#fff', fontSize: 15, fontWeight: '600' },
    amount: { color: '#fff', fontSize: 22, fontWeight: '700' },
    periodRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    period: { color: 'rgba(255,255,255,0.55)', fontSize: 11 },
    illustration: { width: 80, justifyContent: 'center', alignItems: 'center' },
    checkBadge: {
      position: 'absolute', bottom: -2, right: 6,
      width: 26, height: 26, borderRadius: 13, backgroundColor: themeColors.primary,
      justifyContent: 'center', alignItems: 'center',
      borderWidth: 3, borderColor: '#160D33',
    },
  });

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
          <Text style={styles.label}>Total bills paid</Text>
          <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
            <Ionicons
              name={visible ? 'eye-outline' : 'eye-off-outline'}
              size={ICON_SIZE}
              color="rgba(255,255,255,0.6)"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.amountRow}>
          <Text style={styles.currency}>NGN</Text>
          <Text style={styles.amount}>{visible ? total : '••••••'}</Text>
        </View>

        <TouchableOpacity style={styles.periodRow}>
          <Text style={styles.period}>This month</Text>
          <Ionicons name="chevron-down" size={ICON_SIZE - 2} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>
      </View>

      <View style={styles.illustration}>
        <Feather name="file-text" size={ICON_SIZE * 3.8} color="rgba(167,139,250,0.35)" />
        <View style={styles.checkBadge}>
          <Feather name="check" size={ICON_SIZE} color="#fff" />
        </View>
      </View>
    </View>
  );
}