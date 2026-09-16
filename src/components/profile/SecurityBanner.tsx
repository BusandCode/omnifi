import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function SecurityBanner() {
  const { colors: themeColors } = useTheme();

  const palette = useMemo(
    () => ({
      gradient: [themeColors.surfaceAlt, themeColors.surface] as const,
      label: themeColors.textSecondary,
      title: themeColors.textPrimary,
      sub: themeColors.textSecondary,
      reviewText: themeColors.primary,
      shieldColor: themeColors.primary,
      checkColor: themeColors.surface,
    }),
    [themeColors]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flexDirection: 'row',
          borderRadius: 20,
          padding: 18,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: themeColors.border,
        },
        left: { flex: 1 },
        label: { color: palette.label, fontSize: 11, fontWeight: '600', marginBottom: 8 },
        title: { color: palette.title, fontSize: 15, fontWeight: '700', marginBottom: 4 },
        sub: { color: palette.sub, fontSize: 10, marginBottom: 14 },
        reviewRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
        reviewText: { color: palette.reviewText, fontSize: 12, fontWeight: '600' },
        shieldWrap: { justifyContent: 'center', alignItems: 'center', width: 80 },
        checkIcon: { position: 'absolute' },
      }),
    [palette, themeColors]
  );

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={palette.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.left}>
        <Text style={styles.label}>Security check</Text>
        <Text style={styles.title}>Your account is secure</Text>
        <Text style={styles.sub}>Last security check was 2 days ago.</Text>

        <TouchableOpacity style={styles.reviewRow}>
          <Text style={styles.reviewText}>Review security</Text>
          <Feather name="chevron-right" size={13} color={palette.reviewText} />
        </TouchableOpacity>
      </View>

      <View style={styles.shieldWrap}>
        <Ionicons name="shield" size={70} color={palette.shieldColor} />
        <Feather name="check" size={26} color={palette.checkColor} style={styles.checkIcon} />
      </View>
    </View>
  );
}