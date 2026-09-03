// AccountLimitsHeader.tsx — back button, title, shield status icon
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, ShieldCheck } from 'lucide-react-native';
import { colors } from '../../theme/colors';

interface Props {
  onBack?: () => void;
  filledShield?: boolean; // true for Tier 3 (solid purple badge)
}

export default function AccountLimitsHeader({ onBack, filledShield }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <Pressable style={styles.iconBtn} onPress={onBack} hitSlop={10}>
        <ChevronLeft color={colors.textPrimary} size={22} />
      </Pressable>
      <Text style={styles.title}>Account Limits</Text>
      <View style={[styles.iconBtn, filledShield && styles.iconBtnFilled]}>
        <ShieldCheck
          color={filledShield ? '#0A0812' : colors.primary}
          size={20}
          fill={filledShield ? colors.primary : 'transparent'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '600',
  },
});
