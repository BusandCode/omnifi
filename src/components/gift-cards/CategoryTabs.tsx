// src/components/gift-cards/CategoryTabs.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export type GiftCategory = 'all' | 'ecommerce' | 'entertainment' | 'gaming' | 'food' | 'more';

const tabs: { id: GiftCategory; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { id: 'all', label: 'All', icon: 'grid' },
  { id: 'ecommerce', label: 'E-Commerce', icon: 'shopping-cart' },
  { id: 'entertainment', label: 'Entertainment', icon: 'play-circle' },
  { id: 'gaming', label: 'Gaming', icon: 'monitor' },
  { id: 'food', label: 'Food', icon: 'coffee' },
  { id: 'more', label: 'More', icon: 'more-horizontal' },
];

type Props = { active: GiftCategory; onChange: (c: GiftCategory) => void };

export function CategoryTabs({ active, onChange }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <TouchableOpacity key={t.id} style={styles.item} onPress={() => onChange(t.id)}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: themeColors.surface, borderColor: 'transparent' },
                isActive && { backgroundColor: themeColors.primaryTint, borderColor: themeColors.primary },
              ]}
            >
              <Feather name={t.icon} size={14} color={isActive ? themeColors.primaryLight : themeColors.textSecondary} />
            </View>
            <Text
              style={[
                styles.label,
                { color: themeColors.textSecondary },
                isActive && { color: themeColors.primaryLight },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  item: { alignItems: 'center', gap: 4, flex: 1 },
  iconBox: {
    width: 36, height: 36, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5,
  },
  label: { fontSize: 7.5, fontWeight: '600', textAlign: 'center', width: '100%' },
});