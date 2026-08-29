import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Item = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  valueColor?: string;
};

type Props = { title: string; items: Item[] };

export function InfoSection({ title, items }: Props) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>
        {items.map((item, i) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.row, i !== items.length - 1 && styles.divider]}
          >
            <View style={styles.iconBox}>
              <Feather name={item.icon} size={14} color={colors.primaryLight} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
            {!!item.value && (
              <Text style={[styles.value, item.valueColor && { color: item.valueColor }]} numberOfLines={1}>
                {item.value}
              </Text>
            )}
            <Feather name="chevron-right" size={14} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', marginBottom: 10 },
  card: { backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 13 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#2C2C2E' },
  iconBox: {
    width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  label: { flex: 1, color: colors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  value: { color: colors.textSecondary, fontSize: 11.5, marginRight: 4, maxWidth: '45%' },
});