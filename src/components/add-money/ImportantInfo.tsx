import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type InfoItem = { icon: keyof typeof Feather.glyphMap; bg: string; iconColor: string; title: string; sub: string };

export function ImportantInfo() {
  const { colors: themeColors } = useTheme();

  const items: InfoItem[] = useMemo(
    () => [
      {
        icon: 'shield',
        bg: 'rgba(52,199,89,0.15)',
        iconColor: themeColors.success,
        title: 'This is a unique virtual account just for you.',
        sub: 'Do not share it with anyone.',
      },
      {
        icon: 'clock',
        bg: themeColors.primaryTint,
        iconColor: themeColors.primaryLight,
        title: 'Transfers may take up to 10 minutes',
        sub: 'depending on your bank.',
      },
    ],
    [themeColors]
  );

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>Important information</Text>
      {items.map((it, i) => (
        <View key={it.title} style={[styles.row, i !== items.length - 1 && styles.rowMargin]}>
          <View style={[styles.iconBox, { backgroundColor: it.bg }]}>
            <Feather name={it.icon} size={16} color={it.iconColor} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.itemTitle, { color: themeColors.textPrimary }]}>{it.title}</Text>
            <Text style={[styles.itemSub, { color: themeColors.textSecondary }]}>{it.sub}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, padding: 16, marginBottom: 4 },
  title: { fontSize: 13, fontWeight: '500', marginBottom: 14 },
  row: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  iconBox: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  itemTitle: { fontSize: 11.5, fontWeight: '500', lineHeight: 17 },
  itemSub: { fontSize: 9.5, marginTop: 2, lineHeight: 15 },
  textContainer: { flex: 1 },
  rowMargin: { marginBottom: 14 },
});