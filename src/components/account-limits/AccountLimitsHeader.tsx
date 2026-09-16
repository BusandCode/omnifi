// AccountLimitsHeader.tsx — back button, title, shield status icon
import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';

interface Props {
  onBack?: () => void;
  filledShield?: boolean; // true for Tier 3 (solid purple badge)
}

export default function AccountLimitsHeader({ onBack, filledShield }: Props) {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingBottom: 12,
        },
        iconBtn: {
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: themeColors.surface,
          borderWidth: 1,
          borderColor: themeColors.border,
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconBtnFilled: {
          backgroundColor: themeColors.primary,
          borderColor: themeColors.primary,
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: 17,
          fontWeight: '600',
        },
      }),
    [themeColors]
  );

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <Pressable style={styles.iconBtn} onPress={onBack} hitSlop={10}>
        <ChevronLeft color={themeColors.textPrimary} size={22} />
      </Pressable>
      <Text style={styles.title}>Account Limits</Text>
      <View style={[styles.iconBtn, filledShield && styles.iconBtnFilled]}>
        <ShieldCheck
          color={filledShield ? '#0A0812' : themeColors.primary}
          size={20}
          fill={filledShield ? themeColors.primary : 'transparent'}
        />
      </View>
    </View>
  );
}