import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

export function TradeHeader() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(20),
      styles: StyleSheet.create({
        topRow: { 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        },
        left: { 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: s(10) 
        },
        backBtn: {
          width: s(32), 
          height: s(32), 
          borderRadius: s(16), 
          backgroundColor: colors.surface,
          justifyContent: 'center', 
          alignItems: 'center',
        },
        title: { color: colors.textPrimary, fontSize: f(18), fontWeight: '700' },
        historyBtn: {
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: s(6),
          borderWidth: 1.2, 
          borderColor: colors.primary, 
          borderRadius: s(10),
          paddingHorizontal: s(8), 
          paddingVertical: s(7),
        },
        historyText: { 
          color: colors.primaryLight, 
          fontSize: f(10), 
          fontWeight: '600' 
        },
        subtitle: { 
          color: colors.textSecondary, 
          fontSize: f(12), 
          marginTop: s(4), 
          marginLeft: s(42) 
        },
      }),
    };
  }, [layoutScale]);

  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={iconSize} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Trade</Text>
        </View>
        <TouchableOpacity style={styles.historyBtn}>
          <Feather name="clock" size={iconSize - 7} color={colors.primaryLight} />
          <Text style={styles.historyText}>Trade History</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Trade crypto or gift cards instantly</Text>
    </View>
  );
}