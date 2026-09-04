import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const tabs = ['All', 'Unread'] as const;

type Props = {
  active: typeof tabs[number];
  onChange: (tab: typeof tabs[number]) => void;
};

export function FilterTabs({ active, onChange }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.wrapper, { backgroundColor: themeColors.surface }]}>
      {tabs.map((t) => (
        <TouchableOpacity
          key={t}
          style={[
            styles.tab,
            active === t && { backgroundColor: themeColors.primaryTint },
          ]}
          onPress={() => onChange(t)}
        >
          <Text
            style={[
              styles.text,
              { color: themeColors.textSecondary },
              active === t && { color: themeColors.primaryLight },
            ]}
          >
            {t}
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
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  text: { fontSize: 13, fontWeight: '600' },
});