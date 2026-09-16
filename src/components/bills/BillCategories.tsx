import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Category = { icon: keyof typeof Feather.glyphMap; title: string; sub: string };

const categories: Category[] = [
  { icon: 'zap', title: 'Electricity', sub: 'Pay electricity bills' },
  { icon: 'smartphone', title: 'Airtime & Data', sub: 'Top up airtime\nand data' },
  { icon: 'tv', title: 'TV Subscription', sub: 'DStv, GOtv and\nmore' },
  { icon: 'wifi', title: 'Internet', sub: 'Pay for your\ninternet service' },
  { icon: 'droplet', title: 'Water', sub: 'Pay water bills' },
  { icon: 'book-open', title: 'Education', sub: 'School fees and\nonline learning' },
  { icon: 'shield', title: 'Insurance', sub: 'Pay insurance\npremiums' },
  { icon: 'home', title: 'Loans', sub: 'Repay your\nloans' },
  { icon: 'more-horizontal', title: 'Others', sub: 'View more\nbillers' },
];

const ICON_SIZE = 14;

export function BillCategories() {
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        },
        title: { color: themeColors.textPrimary, fontSize: 13, fontWeight: '600' },
        viewAll: { color: themeColors.primaryLight, fontSize: 10, fontWeight: '600' },
        grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
        card: {
          width: '31%',
          backgroundColor: themeColors.surface,
          borderRadius: 10,
          padding: 8,
          minHeight: 72,
          justifyContent: 'center',
          alignItems: 'center',
        },
        iconBox: {
          width: 26, height: 26, borderRadius: 6,
          backgroundColor: themeColors.primaryTint,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 4,
        },
        cardTitle: {
          color: themeColors.textPrimary,
          fontSize: 9,
          fontWeight: '600',
          marginBottom: 1,
          textAlign: 'center',
        },
        cardSub: {
          color: themeColors.textSecondary,
          fontSize: 7.5,
          lineHeight: 9,
          textAlign: 'center',
        },
      }),
    [themeColors]
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <TouchableOpacity><Text style={styles.viewAll}>See all</Text></TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {categories.map((c) => (
          <TouchableOpacity key={c.title} style={styles.card}>
            <View style={styles.iconBox}>
              <Feather name={c.icon} size={ICON_SIZE} color={themeColors.primaryLight} />
            </View>
            <Text style={styles.cardTitle}>{c.title}</Text>
            <Text style={styles.cardSub}>{c.sub}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}