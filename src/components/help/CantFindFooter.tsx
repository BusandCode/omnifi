import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function CantFindFooter() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: themeColors.surface,
    borderRadius: 14,
    padding: 14,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: { flex: 1 },
  title: { color: themeColors.textPrimary, fontSize: 11.5, fontWeight: '600' },
  sub: { color: themeColors.textSecondary, fontSize: 9.5, marginTop: 2 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: themeColors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ctaText: { color: themeColors.primaryLight, fontSize: 10.5, fontWeight: '600' },
}),
    [themeColors]
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconBox}>
        <Ionicons name="help-circle-outline" size={18} color={themeColors.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Can't find what you're looking for?</Text>
        <Text style={styles.sub}>Check out our full FAQ section for more answers.</Text>
      </View>
      <TouchableOpacity style={styles.cta}>
        <Text style={styles.ctaText}>Go to FAQs</Text>
        <Feather name="chevron-right" size={14} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

