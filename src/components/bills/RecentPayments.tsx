import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Payment = {
  name: string;
  sub: string;
  amount: string;
  time: string;
  icon: keyof typeof Feather.glyphMap;
  bg: string;
};

const ICON_SIZE = 15;

export function RecentPayments() {
  const { colors: themeColors } = useTheme();

  const payments: Payment[] = useMemo(
    () => [
      { name: 'Ikeja Electric', sub: 'Electricity  •  0123456789', amount: '- NGN 25,000.00', time: 'Today, 9:21 AM', icon: 'zap', bg: themeColors.primary },
      { name: 'DStv Compact', sub: 'Subscription  •  7002345678', amount: '- NGN 9,500.00', time: 'Yesterday, 7:45 PM', icon: 'tv', bg: '#0A5EC2' },
      { name: 'MTN Airtime', sub: 'Airtime  •  08012345678', amount: '- NGN 1,000.00', time: 'May 18, 2:10 PM', icon: 'smartphone', bg: '#34C759' },
    ],
    [themeColors]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        },
        title: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '600' },
        viewAll: { color: themeColors.primaryLight, fontSize: 12, fontWeight: '600' },
        card: {
          backgroundColor: themeColors.surface,
          borderRadius: 16,
          paddingHorizontal: 14,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingVertical: 12,
        },
        divider: { borderBottomWidth: 1, borderBottomColor: themeColors.border },
        iconCircle: {
          width: 36, height: 36, borderRadius: 18,
          justifyContent: 'center', alignItems: 'center',
        },
        name: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600' },
        sub: { color: themeColors.textSecondary, fontSize: 10, marginTop: 2 },
        amount: { color: themeColors.textPrimary, fontSize: 12, fontWeight: '600' },
        time: { color: themeColors.textSecondary, fontSize: 10, marginTop: 2 },
        rightColumn: { alignItems: 'flex-end' },
        textContainer: { flex: 1 },
      }),
    [themeColors]
  );

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
              <Feather name={p.icon} size={ICON_SIZE} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.sub}>{p.sub}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.amount}>{p.amount}</Text>
              <Text style={styles.time}>{p.time}</Text>
            </View>
            <Feather name="chevron-right" size={ICON_SIZE - 1} color={themeColors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}