import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type TabId = 'virtual' | 'other';

const tabs: { id: TabId; label: string; icon: keyof typeof Feather.glyphMap }[] = [
  { id: 'virtual', label: 'Virtual Account', icon: 'home' },
  { id: 'other', label: 'Other Methods', icon: 'credit-card' },
];

type Props = { active: TabId; onChange: (id: TabId) => void };

export function AddMoneyTabs({ active, onChange }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.wrapper, { backgroundColor: themeColors.surface }]}>
      {tabs.map((t) => (
        <TouchableOpacity
          key={t.id}
          style={[styles.tab, active === t.id && { backgroundColor: themeColors.primaryTint }]}
          onPress={() => onChange(t.id)}
        >
          <Feather
            name={t.icon}
            size={14}
            color={active === t.id ? themeColors.primaryLight : themeColors.textSecondary}
          />
          <Text
            style={[
              styles.text,
              { color: themeColors.textSecondary },
              active === t.id && { color: themeColors.primaryLight },
            ]}
          >
            {t.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
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
  text: { fontSize: 12, fontWeight: '600' },
});