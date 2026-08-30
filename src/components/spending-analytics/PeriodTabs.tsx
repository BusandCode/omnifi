import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
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
  tabActive: { backgroundColor: colors.primary },
  label: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  labelActive: { color: '#fff' },
});