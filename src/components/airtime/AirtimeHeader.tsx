import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

export function AirtimeHeader() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(20),
      styles: StyleSheet.create({
        row: { 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        },
        iconBtn: {
          width: s(36), 
          height: s(36), 
          borderRadius: s(18),
          borderWidth: 1.2, 
          borderColor: colors.primary,
          justifyContent: 'center', 
          alignItems: 'center',
        },
        title: { 
          color: colors.textPrimary, 
          fontSize: f(17), 
          fontWeight: '700' 
        },
      }),
    };
  }, [layoutScale]);

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
        <Ionicons name="chevron-back" size={iconSize} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Airtime</Text>
      <TouchableOpacity style={styles.iconBtn}>
        <Feather name="clock" size={iconSize - 4} color={colors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}