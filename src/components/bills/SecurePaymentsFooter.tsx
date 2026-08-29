import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

export function SecurePaymentsFooter() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(15),
      styles: StyleSheet.create({
        card: {
          flexDirection: 'row', alignItems: 'center', gap: s(12),
          backgroundColor: colors.surface, borderRadius: s(14), padding: s(14),
        },
        iconBox: {
          width: s(32), height: s(32), borderRadius: s(16), 
          backgroundColor: 'rgba(167,139,250,0.15)',
          justifyContent: 'center', alignItems: 'center',
        },
        title: { color: colors.textPrimary, fontSize: f(12), fontWeight: '600' },
        sub: { color: colors.textSecondary, fontSize: f(10), marginTop: s(2) },
        textContainer: { flex: 1 },
      }),
    };
  }, [layoutScale]);

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="shield" size={iconSize} color={colors.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Secure payments</Text>
        <Text style={styles.sub}>Your payments are protected with bank-level security.</Text>
      </View>
      <Feather name="chevron-right" size={iconSize + 1} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}