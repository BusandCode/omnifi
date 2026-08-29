import { useMemo } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

export function SecureSmartBanner() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(16),
      styles: StyleSheet.create({
        card: {
          flexDirection: 'row', 
          alignItems: 'flex-start', 
          gap: s(12),
          backgroundColor: 'rgba(167,139,250,0.08)', 
          borderRadius: s(14), 
          padding: s(13),
          borderWidth: 1, 
          borderColor: 'rgba(167,139,250,0.2)',
          marginBottom: s(10), 
          marginHorizontal: s(16),
        },
        iconBox: {
          width: s(32), 
          height: s(32), 
          borderRadius: s(16), 
          backgroundColor: 'rgba(167,139,250,0.15)',
          justifyContent: 'center', 
          alignItems: 'center',
        },
        title: { color: colors.textPrimary, fontSize: f(12.5), fontWeight: '700' },
        sub: { color: colors.textSecondary, fontSize: f(10.5), marginTop: s(3), lineHeight: s(14) },
        textContainer: { flex: 1 },
      }),
    };
  }, [layoutScale]);

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="shield-checkmark" size={iconSize} color={colors.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Secure & Smart</Text>
        <Text style={styles.sub}>AI Pay is safe and secure. All payments are protected with bank-level encryption.</Text>
      </View>
    </View>
  );
}