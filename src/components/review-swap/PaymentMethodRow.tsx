import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function PaymentMethodRow() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  title: { color: themeColors.textPrimary, fontSize: 13, fontWeight: '700', marginBottom: 10 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: themeColors.surface, borderRadius: 14, padding: 13,
  },
  iconBox: {
    width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  name: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  sub: { color: themeColors.textSecondary, fontSize: 10.5, marginTop: 2 },
  changeRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  changeText: { color: themeColors.primaryLight, fontSize: 11.5, fontWeight: '600' },
}),
    [themeColors]
  );

  return (
    <View>
      <Text style={styles.title}>Payment method</Text>
     <TouchableOpacity style={styles.card}>
        <View style={styles.iconBox}>
            <Ionicons name="swap-horizontal" size={16} color={themeColors.primaryLight} />
        </View>
        <View style={{ flex: 1 }}>
            <Text style={styles.name}>Bank Transfer</Text>
            <Text style={styles.sub}>0114 7892 3648</Text>
        </View>
        <View style={styles.changeRow}>
            <Text style={styles.changeText}>Change</Text>
            <Feather name="chevron-right" size={14} color={themeColors.primaryLight} />
        </View>
        </TouchableOpacity>
            </View>
  );
}

