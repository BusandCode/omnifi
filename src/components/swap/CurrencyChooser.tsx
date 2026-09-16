import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { currencies, CurrencyCode } from '../../data/currencies';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  selected: CurrencyCode;
  onSelect: (code: CurrencyCode) => void;
  excluding: CurrencyCode;
};

export function CurrencyChooser({ selected, onSelect }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  title: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8 },
  card: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: themeColors.surface, borderRadius: 12, padding: 9,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  cardActive: { borderColor: themeColors.primary, backgroundColor: themeColors.primaryTint },
  flag: { fontSize: 18 },
  code: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '700' },
  name: { color: themeColors.textSecondary, fontSize: 7.5, marginTop: 1 },
}),
    [themeColors]
  );

  const list = Object.values(currencies);

  return (
    <View>
      <Text style={styles.title}>Choose currency</Text>
      <View style={styles.row}>
        {list.map((c) => {
          const active = c.code === selected;
          return (
            <TouchableOpacity
              key={c.code}
              style={[styles.card, active && styles.cardActive]}
              onPress={() => onSelect(c.code)}
            >
              <Text style={styles.flag}>{c.flag}</Text>
              <View>
                <Text style={styles.code}>{c.code}</Text>
                <Text style={styles.name}>{c.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}