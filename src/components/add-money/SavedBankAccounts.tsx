import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

export function SavedBankAccounts() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(13),
      styles: StyleSheet.create({
        header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: s(12), marginTop: s(-10) },
        title: { color: colors.textPrimary, fontSize: f(12), fontWeight: '600' },
        manage: { color: colors.primaryLight, fontSize: f(11), fontWeight: '600' },
        card: {
          flexDirection: 'row', alignItems: 'center', gap: s(12),
          backgroundColor: colors.surface, borderRadius: s(16), padding: s(14),
        },
        logoCircle: {
          width: s(36), height: s(36), borderRadius: s(18), backgroundColor: '#fff',
          justifyContent: 'center', alignItems: 'center',
        },
        logoText: { color: '#1DB954', fontSize: f(15), fontWeight: '800' },
        bankName: { color: colors.textPrimary, fontSize: f(13), fontWeight: '600' },
        bankSub: { color: colors.textSecondary, fontSize: f(10.5), marginTop: s(2) },
        checkCircle: {
          width: s(22), height: s(22), borderRadius: s(11), backgroundColor: colors.primary,
          justifyContent: 'center', alignItems: 'center',
        },
        textContainer: { flex: 1 },
      }),
    };
  }, [layoutScale]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Saved bank accounts</Text>
        <TouchableOpacity><Text style={styles.manage}>Manage</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.card}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>K</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bankName}>Kuda Bank</Text>
          <Text style={styles.bankSub}>Silver Abdul  •  810 **** **** 1234</Text>
        </View>
        <View style={styles.checkCircle}>
          <Feather name="check" size={iconSize} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}