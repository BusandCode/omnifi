// src/components/betting/PopularPlatforms.tsx
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export type Platform = { id: string; name: string; bg: string; label: string; labelColor: string };

export const platforms: Platform[] = [
  { id: 'bet9ja', name: 'Bet9ja', bg: '#12A150', label: 'bet9ja', labelColor: '#fff' },
  { id: 'betway', name: 'Betway', bg: '#0B0B0B', label: 'betway', labelColor: '#00CB4A' },
  { id: 'parimatch', name: 'Parimatch', bg: '#F2C400', label: 'PARI', labelColor: '#0B0B0B' },
  { id: '1xbet', name: '1xBet', bg: '#0A5CC2', label: '1XBET', labelColor: '#fff' },
  { id: 'melbet', name: 'Melbet', bg: '#141414', label: 'MEL', labelColor: '#F2A900' },
];

type Props = { selected: string; onSelect: (id: string) => void };

export function PopularPlatforms({ selected, onSelect }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Popular Platforms</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: themeColors.primaryLight }]}>View all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {platforms.map((p) => {
          const active = p.id === selected;
          return (
            <TouchableOpacity key={p.id} style={styles.item} onPress={() => onSelect(p.id)}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: p.bg },
                  active && { borderWidth: 2, borderColor: themeColors.primary },
                ]}
              >
                <Text style={[styles.iconLabel, { color: p.labelColor }]} numberOfLines={1}>
                  {p.label}
                </Text>
                {active && (
                  <View style={[styles.checkBadge, { backgroundColor: themeColors.primary }]}>
                    <Feather name="check" size={9} color="#fff" />
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.name,
                  { color: active ? themeColors.textPrimary : themeColors.textSecondary },
                ]}
                numberOfLines={1}
              >
                {p.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.dots}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === 0 ? themeColors.primary : themeColors.border },
              i === 0 && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontSize: 13, fontWeight: '600' },
  viewAll: { fontSize: 12, fontWeight: '600' },
  row: { gap: 12, paddingRight: 8 },
  item: { alignItems: 'center', width: 64 },
  iconBox: {
    width: 60, height: 60, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  iconLabel: { fontSize: 10, fontWeight: '800' },
  checkBadge: {
    position: 'absolute', top: -4, right: -4,
    width: 17, height: 17, borderRadius: 9,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#000',
  },
  name: { fontSize: 10.5, fontWeight: '600', marginTop: 6 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 12 },
  dot: { width: 5, height: 5, borderRadius: 2.5 },
  dotActive: { width: 14 },
});