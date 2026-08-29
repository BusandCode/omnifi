import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

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
  return (
    <View style={styles.row}>
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <TouchableOpacity key={t.id} style={styles.item} onPress={() => onChange(t.id)}>
            <View style={[styles.iconBox, isActive && styles.iconBoxActive]}>
              <Feather name={t.icon} size={14} color={isActive ? '#fff' : colors.textSecondary} />
            </View>
            <Text
              style={[styles.label, isActive && styles.labelActive]}
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
  row: { flexDirection: 'row', justifyContent: 'space-between',gap:8 },
  item: { alignItems: 'center', gap: 4, flex: 1 },
  iconBox: {
    width: 36, height: 36, borderRadius: 12, backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: 'transparent',
  },
  iconBoxActive: { backgroundColor: 'rgba(167,139,250,0.2)', borderColor: colors.primary },
  label: { color: colors.textSecondary, fontSize: 7.5, fontWeight: '600', textAlign: 'center', width: '100%' },
  labelActive: { color: colors.primaryLight },
});