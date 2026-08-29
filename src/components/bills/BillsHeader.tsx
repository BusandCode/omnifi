import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

export function BillsHeader() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(20),
      styles: StyleSheet.create({
        topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        left: { flexDirection: 'row', alignItems: 'center', gap: s(12) },
        backBtn: {
          width: s(36), height: s(36), borderRadius: s(18), backgroundColor: colors.surface,
          justifyContent: 'center', alignItems: 'center',
        },
        title: { color: colors.textPrimary, fontSize: f(20), fontWeight: '700' },
        historyBtn: { flexDirection: 'row', alignItems: 'center', gap: s(5) },
        historyText: { color: colors.primaryLight, fontSize: f(13), fontWeight: '600' },
        subtitle: { color: colors.textSecondary, fontSize: f(12), marginTop: s(1), marginLeft: s(48),marginBottom:s(3) },
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
          <Text style={styles.title}>Bills</Text>
        </View>
        <TouchableOpacity style={styles.historyBtn}>
          <Feather name="clock" size={iconSize - 6} color={colors.primaryLight} />
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Pay your bills quickly and securely</Text>
    </View>
  );
}