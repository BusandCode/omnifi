import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function OtherAmountRow() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: themeColors.surface, borderRadius: 12, padding: 11,
  },
  iconBox: {
    width: 30, height: 30, borderRadius: 8, backgroundColor: themeColors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: themeColors.textPrimary, fontSize: 11.5, fontWeight: '700' },
  sub: { color: themeColors.textSecondary, fontSize: 9.5, marginTop: 1 },
}),
    [themeColors]
  );

  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.iconBox}>
        <Feather name="sliders" size={14} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Other Amount</Text>
        <Text style={styles.sub}>Enter a custom data amount</Text>
      </View>
      <Feather name="chevron-right" size={16} color={themeColors.textSecondary} />
    </TouchableOpacity>
  );
}

