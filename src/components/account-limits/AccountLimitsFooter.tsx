// AccountLimitsFooter.tsx — gradient CTA button + "Need help? Contact Support"
import React, { useMemo } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';

interface Props {
  ctaLabel: string;
  showFooterHelp: boolean;
  onCtaPress?: () => void;
  onContactSupport?: () => void;
}

export default function AccountLimitsFooter({
  ctaLabel,
  showFooterHelp,
  onCtaPress,
  onContactSupport,
}: Props) {
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          height: 44,
          borderRadius: 13,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        },
        label: {
          color: '#fff',
          fontSize: 13,
          fontWeight: '700',
        },
        footerRow: {
          alignItems: 'center',
          marginTop: 10,
        },
        footerText: {
          color: themeColors.textSecondary,
          fontSize: 11,
        },
        footerLink: {
          color: themeColors.primary,
          fontWeight: '600',
        },
      }),
    [themeColors]
  );

  return (
    <>
      <Pressable onPress={onCtaPress}>
        <LinearGradient
          colors={[themeColors.primary, themeColors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.label}>{ctaLabel}</Text>
          <ChevronRight color="#fff" size={15} />
        </LinearGradient>
      </Pressable>

      {showFooterHelp && (
        <Pressable onPress={onContactSupport} style={styles.footerRow}>
          <Text style={styles.footerText}>
            Need help? <Text style={styles.footerLink}>Contact Support</Text>
          </Text>
        </Pressable>
      )}
    </>
  );
}