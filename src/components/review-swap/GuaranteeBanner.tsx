import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function GuaranteeBanner() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: 'rgba(167,139,250,0.1)', borderRadius: 12, padding: 10,
    borderWidth: 1, borderColor: 'rgba(167,139,250,0.25)',
  },
  iconBox: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(167,139,250,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: themeColors.textPrimary, fontSize: 10.5, fontWeight: '700', lineHeight: 14 },
  sub: { color: themeColors.textSecondary, fontSize: 9, marginTop: 2, lineHeight: 12 },
}),
    [themeColors]
  );

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="shield-checkmark" size={14} color={themeColors.primaryLight} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>You will receive exactly ₦1,542,350.00</Text>
        <Text style={styles.sub}>We guarantee this amount or we'll refund the difference.</Text>
      </View>
    </View>
  );
}

