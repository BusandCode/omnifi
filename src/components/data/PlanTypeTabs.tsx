import { useMemo } from 'react';
// src/components/data/PlanTypeTabs.tsx
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export type PlanType = 'daily' | 'weekly' | 'monthly' | 'special' | 'night';

const TABS: { key: PlanType; label: string }[] = [
  { key: 'daily', label: 'Daily' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' },
  { key: 'special', label: 'Special' },
  { key: 'night', label: 'Night' },
];

type Props = {
  active: PlanType;
  onChange: (t: PlanType) => void;
};

export function PlanTypeTabs({ active, onChange }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  // row: { flexDirection: 'row', gap: 6, paddingVertical: 2 },
  row: { flexDirection: 'row', gap: 6, paddingVertical: 2 },
  tab: {
    paddingHorizontal: 12,
    height: 28,
    // marginBottom:200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: themeColors.surface,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabActive: {
    borderColor: themeColors.primary,
    backgroundColor: 'rgba(167,139,250,0.1)',
  },
  label: {
    color: themeColors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  labelActive: {
    color: themeColors.primaryLight,
  },
}),
    [themeColors]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(tab.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

