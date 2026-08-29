import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type TabId = 'virtual' | 'other';

const tabs: { id: TabId; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { id: 'virtual', label: 'Virtual Account', icon: 'home' },
  { id: 'other', label: 'Other Methods', icon: 'credit-card' },
];

type Props = { active: TabId; onChange: (id: TabId) => void };

export function AddMoneyTabs({ active, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      {tabs.map((t) => (
        <TouchableOpacity
          key={t.id}
          style={[styles.tab, active === t.id && styles.tabActive]}
          onPress={() => onChange(t.id)}
        >
          <Feather name={t.icon} size={14} color={active === t.id ? colors.primaryLight : colors.textSecondary} />
          <Text style={[styles.text, active === t.id && styles.textActive]}>{t.label}</Text>
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
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabActive: { backgroundColor: 'rgba(167,139,250,0.18)' },
  text: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  textActive: { color: colors.primaryLight },
});