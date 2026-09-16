// src/components/transfer-success/NeedHelp.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function NeedHelp() {
  const { colors: themeColors } = useTheme();

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <View style={styles.iconBox}>
        <Feather name="help-circle" size={13} color={themeColors.primaryLight} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Need Help?</Text>
        <Text style={[styles.sub, { color: themeColors.textSecondary }]}>Contact our support team if you have any issues.</Text>
      </View>
      <Feather name="chevron-right" size={14} color={themeColors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 12, padding: 10, marginTop: 8,
  },
  iconBox: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 11, fontWeight: '600' },
  sub: { fontSize: 9, marginTop: 1 },
});