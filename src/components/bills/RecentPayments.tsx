import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

type Payment = {
  name: string;
  sub: string;
  amount: string;
  time: string;
  icon: keyof typeof Feather.glyphMap;
  bg: string;
};

const payments: Payment[] = [
  { name: 'Ikeja Electric', sub: 'Electricity  •  0123456789', amount: '- NGN 25,000.00', time: 'Today, 9:21 AM', icon: 'zap', bg: colors.primary },
  { name: 'DStv Compact', sub: 'Subscription  •  7002345678', amount: '- NGN 9,500.00', time: 'Yesterday, 7:45 PM', icon: 'tv', bg: '#0A5EC2' },
  { name: 'MTN Airtime', sub: 'Airtime  •  08012345678', amount: '- NGN 1,000.00', time: 'May 18, 2:10 PM', icon: 'smartphone', bg: '#34C759' },
];

export function RecentPayments() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(15),
      styles: StyleSheet.create({
        header: { 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginBottom: s(12) 
        },
        title: { color: colors.textPrimary, fontSize: f(15), fontWeight: '600' },
        viewAll: { color: colors.primaryLight, fontSize: f(12), fontWeight: '600' },
        card: { 
          backgroundColor: colors.surface, 
          borderRadius: s(16), 
          paddingHorizontal: s(14) 
        },
        row: { 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: s(10), 
          paddingVertical: s(12) 
        },
        divider: { borderBottomWidth: 1, borderBottomColor: '#2C2C2E' },
        iconCircle: { 
          width: s(36), height: s(36), borderRadius: s(18), 
          justifyContent: 'center', alignItems: 'center' 
        },
        name: { color: colors.textPrimary, fontSize: f(12.5), fontWeight: '600' },
        sub: { color: colors.textSecondary, fontSize: f(10), marginTop: s(2) },
        amount: { color: colors.textPrimary, fontSize: f(12), fontWeight: '600' },
        time: { color: colors.textSecondary, fontSize: f(10), marginTop: s(2) },
        rightColumn: { alignItems: 'flex-end' },
        textContainer: { flex: 1 },
      }),
    };
  }, [layoutScale]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Recent payments</Text>
        <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
      </View>

      <View style={styles.card}>
        {payments.map((p, i) => (
          <TouchableOpacity 
            key={p.name} 
            style={[styles.row, i !== payments.length - 1 && styles.divider]}
          >
            <View style={[styles.iconCircle, { backgroundColor: p.bg }]}>
              <Feather name={p.icon} size={iconSize} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.sub}>{p.sub}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.amount}>{p.amount}</Text>
              <Text style={styles.time}>{p.time}</Text>
            </View>
            <Feather name="chevron-right" size={iconSize - 1} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}