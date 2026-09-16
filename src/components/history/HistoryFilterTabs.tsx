import { useMemo } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export type FilterType = 'all' | 'in' | 'out' | 'airtime_data' | 'other';

const TABS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All Transactions' },
  { key: 'in', label: 'Money In' },
  { key: 'out', label: 'Money Out' },
  { key: 'airtime_data', label: 'Airtime & Data' },
  { key: 'other', label: 'Others' },
];

type Props = {
  active: FilterType;
  onChange: (t: FilterType) => void;
};

export function HistoryFilterTabs({ active, onChange }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, paddingHorizontal: 20 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: themeColors.surface,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: themeColors.primary,
    borderColor: themeColors.primary,
  },
  label: { color: themeColors.textSecondary, fontSize: 12, fontWeight: '600' },
  labelActive: { color: '#fff' },
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
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

