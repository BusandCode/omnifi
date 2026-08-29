import { useMemo } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

type Badge = { icon: keyof typeof Feather.glyphMap; title: string; sub: string };

const badges: Badge[] = [
  { icon: 'shield', title: 'Secure & Trusted', sub: '100% secure transactions' },
  { icon: 'zap', title: 'Instant Delivery', sub: 'Fast delivery to your wallet' },
  { icon: 'headphones', title: '24/7 Support', sub: "We're here to help" },
];

export function TrustBadges() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(13),
      styles: StyleSheet.create({
        row: { flexDirection: 'row', gap: s(6) },
        card: { 
          flex: 1, 
          backgroundColor: colors.surface, 
          borderRadius: s(12), 
          padding: s(9), 
          alignItems: 'flex-start' 
        },
        iconBox: {
          width: s(26), 
          height: s(26), 
          borderRadius: s(13), 
          backgroundColor: 'rgba(167,139,250,0.15)',
          justifyContent: 'center', 
          alignItems: 'center', 
          marginBottom: s(6),
        },
        title: { color: colors.textPrimary, fontSize: f(9.5), fontWeight: '700', marginBottom: s(2) },
        sub: { color: colors.textSecondary, fontSize: f(7.5), lineHeight: s(10) },
      }),
    };
  }, [layoutScale]);

  return (
    <View style={styles.row}>
      {badges.map((b) => (
        <View key={b.title} style={styles.card}>
          <View style={styles.iconBox}>
            <Feather name={b.icon} size={iconSize} color={colors.primaryLight} />
          </View>
          <Text style={styles.title}>{b.title}</Text>
          <Text style={styles.sub}>{b.sub}</Text>
        </View>
      ))}
    </View>
  );
}