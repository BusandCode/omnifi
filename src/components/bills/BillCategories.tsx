import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

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

export function BillCategories() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(14),
      styles: StyleSheet.create({
        header: { 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginBottom: s(8) 
        },
        title: { color: colors.textPrimary, fontSize: f(13), fontWeight: '600' },
        viewAll: { color: colors.primaryLight, fontSize: f(10), fontWeight: '600' },
        grid: { flexDirection: 'row', flexWrap: 'wrap', gap: s(6) },
        card: {
          width: '31%', 
          backgroundColor: colors.surface, 
          borderRadius: s(10), 
          padding: s(8), 
          minHeight: s(72),
          justifyContent: 'center',
          alignItems: 'center',
        },
        iconBox: {
          width: s(26), height: s(26), borderRadius: s(6), 
          backgroundColor: 'rgba(167,139,250,0.15)',
          justifyContent: 'center', 
          alignItems: 'center', 
          marginBottom: s(4),
        },
        cardTitle: { 
          color: colors.textPrimary, 
          fontSize: f(9), 
          fontWeight: '600', 
          marginBottom: s(1),
          textAlign: 'center',
        },
        cardSub: { 
          color: colors.textSecondary, 
          fontSize: f(7.5), 
          lineHeight: s(9),
          textAlign: 'center',
        },
      }),
    };
  }, [layoutScale]);

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
              <Feather name={c.icon} size={iconSize} color={colors.primaryLight} />
            </View>
            <Text style={styles.cardTitle}>{c.title}</Text>
            <Text style={styles.cardSub}>{c.sub}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}