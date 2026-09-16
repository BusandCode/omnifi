import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function HigherReturnsBanner() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: themeColors.surface, borderRadius: 16, padding: 14,
  },
  illustration: { width: 46, height: 46, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  book: { width: 34, height: 40, borderRadius: 6, backgroundColor: '#4B23B6', borderWidth: 1.5, borderColor: 'rgba(167,139,250,0.5)' },
  coin1: { position: 'absolute', bottom: 0, left: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#E8C77A' },
  coin2: { position: 'absolute', bottom: -2, left: 8, width: 12, height: 12, borderRadius: 6, backgroundColor: '#D4AF6A' },
  title: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  sub: { color: themeColors.textSecondary, fontSize: 10.5, marginTop: 3, lineHeight: 14 },
}),
    [themeColors]
  );

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.illustration}>
        <View style={styles.book} />
        <View style={styles.coin1} />
        <View style={styles.coin2} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Earn more with higher returns!</Text>
        <Text style={styles.sub}>Enjoy up to 8% interest on your savings when you save consistently.</Text>
      </View>
      <Feather name="chevron-right" size={16} color={themeColors.textSecondary} />
    </TouchableOpacity>
  );
}

