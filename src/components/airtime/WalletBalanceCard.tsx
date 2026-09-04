import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

const balance = '3,106,055.21';

export function WalletBalanceCard() {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();
  const [visible, setVisible] = useState(true);

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(12),
      styles: StyleSheet.create({
        wrapper: {
          flexDirection: 'row',
          borderRadius: s(14),
          padding: s(11),
          overflow: 'hidden',
          alignItems: 'center',
          backgroundColor: themeColors.surface,
          borderWidth: 1,
          borderColor: themeColors.border,
        },
        left: { flex: 1 },
        labelRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: s(5),
          marginBottom: s(5)
        },
        label: { color: themeColors.textSecondary, fontSize: f(10.5) },
        amount: { color: themeColors.textPrimary, fontSize: f(16), fontWeight: '700', marginBottom: s(5) },
        walletRow: { flexDirection: 'row', alignItems: 'center', gap: s(3) },
        walletText: { color: themeColors.textSecondary, fontSize: f(9.5) },
        illustration: {
          width: s(56),
          height: s(56),
          justifyContent: 'center',
          alignItems: 'center'
        },
        phoneBody: {
          width: s(34),
          height: s(50),
          borderRadius: s(8),
          backgroundColor: themeColors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1.5,
          borderColor: themeColors.primaryTint,
        },
        phoneNaira: { color: '#fff', fontSize: f(17), fontWeight: '800' },
        boltBadge: {
          position: 'absolute', bottom: s(0), right: s(3),
          width: s(20), height: s(20), borderRadius: s(10), backgroundColor: themeColors.primary,
          justifyContent: 'center', alignItems: 'center',
          borderWidth: 2, borderColor: themeColors.surface,
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[themeColors.primaryTint, 'rgba(167,139,250,0.03)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.left}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Wallet Balance</Text>
          <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
            <Ionicons
              name={visible ? 'eye-outline' : 'eye-off-outline'}
              size={iconSize}
              color={themeColors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.amount}>{visible ? `₦${balance}` : '••••••••••'}</Text>

        <TouchableOpacity style={styles.walletRow}>
          <Text style={styles.walletText}>Naira Wallet</Text>
          <Ionicons name="chevron-down" size={iconSize - 1} color={themeColors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.illustration}>
        <View style={styles.phoneBody}>
          <Text style={styles.phoneNaira}>₦</Text>
        </View>
        <View style={styles.boltBadge}>
          <Feather name="zap" size={iconSize - 1} color="#fff" />
        </View>
      </View>
    </View>
  );
}