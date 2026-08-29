import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

const tabs = ['All', 'Unread'] as const;

type Props = {
  active: typeof tabs[number];
  onChange: (tab: typeof tabs[number]) => void;
};

export function FilterTabs({ active, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      {tabs.map((t) => (
        <TouchableOpacity
          key={t}
          style={[styles.tab, active === t && styles.tabActive]}
          onPress={() => onChange(t)}
        >
          <Text style={[styles.text, active === t && styles.textActive]}>{t}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 4,
    // paddingTop: 2,
    // marginTop: 12,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabActive: { backgroundColor: 'rgba(167,139,250,0.18)' },
  text: { color: colors.textSecondary, fontSize: 13, fontWeight: '600' },
  textActive: { color: colors.primaryLight },
});