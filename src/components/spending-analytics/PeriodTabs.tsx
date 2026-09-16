import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../theme/ThemeContext';
import { PeriodKey } from '../../constants/spendingData';

const TABS: { key: PeriodKey; label: string }[] = [
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: 'quarter', label: 'This Quarter' },
  { key: 'year', label: 'This Year' },
];

type Props = {
  active: PeriodKey;
};

export function PeriodTabs({ active }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: themeColors.surface,
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: themeColors.primary },
  label: { color: themeColors.textSecondary, fontSize: 12, fontWeight: '600' },
  labelActive: { color: '#fff' },
}),
    [themeColors]
  );

  return (
    <View style={styles.row}>
      {TABS.map((t) => {
        const isActive = t.key === active;
        return (
          <TouchableOpacity
            key={t.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => {
              // if (!isActive) router.replace(`/spending-analytics/${t.key}`);
              if (!isActive) router.replace({ pathname: '/spending-analytics/[period]', params: { period: t.key } });
            }}
          >
            <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

