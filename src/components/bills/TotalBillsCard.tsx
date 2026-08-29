import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

const total = '562,430.00';

export function TotalBillsCard() {
  const layoutScale = useLayoutScale();
  const [visible, setVisible] = useState(true);

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(14),
      styles: StyleSheet.create({
        wrapper: { 
          flexDirection: 'row', 
          borderRadius: s(20), 
          padding: s(15), 
          overflow: 'hidden',
          marginTop: s(-4),
        },
        left: { flex: 1 },
        labelRow: { 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: s(6), 
          marginBottom: s(10) 
        },
        label: { color: 'rgba(255,255,255,0.7)', fontSize: f(13) },
        amountRow: { 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: s(8), 
          marginBottom: s(8) 
        },
        currency: { color: '#fff', fontSize: f(15), fontWeight: '600' },
        amount: { color: '#fff', fontSize: f(22), fontWeight: '700' },
        periodRow: { flexDirection: 'row', alignItems: 'center', gap: s(4) },
        period: { color: 'rgba(255,255,255,0.55)', fontSize: f(11) },
        illustration: { width: s(80), justifyContent: 'center', alignItems: 'center' },
        checkBadge: {
          position: 'absolute', bottom: s(-2), right: s(6),
          width: s(26), height: s(26), borderRadius: s(13), backgroundColor: colors.primary,
          justifyContent: 'center', alignItems: 'center',
          borderWidth: 3, borderColor: '#160D33',
        },
      }),
    };
  }, [layoutScale]);

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
              size={iconSize} 
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
          <Ionicons name="chevron-down" size={iconSize - 2} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>
      </View>

      <View style={styles.illustration}>
        <Feather name="file-text" size={iconSize * 3.8} color="rgba(167,139,250,0.35)" />
        <View style={styles.checkBadge}>
          <Feather name="check" size={iconSize} color="#fff" />
        </View>
      </View>
    </View>
  );
}