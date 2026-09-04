import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

export function PromoBanner() {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(16),
      styles: StyleSheet.create({
        card: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: s(12),
          backgroundColor: themeColors.surface,
          borderRadius: s(14),
          padding: s(14),
          borderWidth: 1,
          borderColor: themeColors.border,
        },
        iconBox: {
          width: s(36),
          height: s(36),
          borderRadius: s(10),
          backgroundColor: themeColors.primaryTint,
          justifyContent: 'center',
          alignItems: 'center',
        },
        title: { color: themeColors.textPrimary, fontSize: f(12.5), fontWeight: '700' },
        sub: { color: themeColors.textSecondary, fontSize: f(10.5), marginTop: s(2) },
        textContainer: { flex: 1 },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="gift" size={iconSize} color={themeColors.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Get more value!</Text>
        <Text style={styles.sub}>Enjoy discounts on airtime top-ups every time.</Text>
      </View>
      <Feather name="chevron-right" size={iconSize} color={themeColors.textSecondary} />
    </TouchableOpacity>
  );
}