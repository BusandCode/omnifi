import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Action = { icon: keyof typeof Feather.glyphMap; label: string };

const actions: Action[] = [
  { icon: 'target', label: 'Create New\nGoal' },
  { icon: 'repeat', label: 'Auto Save\nSettings' },
  { icon: 'arrow-down', label: 'Add Money' },
  { icon: 'arrow-up', label: 'Withdraw' },
];

export function SavingsQuickActions() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  item: { alignItems: 'center', gap: 8, flex: 1 },
  iconBox: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  label: { color: themeColors.textPrimary, fontSize: 10.5, fontWeight: '500', textAlign: 'center', lineHeight: 13 },
}),
    [themeColors]
  );

  return (
    <View style={styles.row}>
      {actions.map((a) => (
        <TouchableOpacity key={a.label} style={styles.item}>
          <View style={styles.iconBox}>
            <Feather name={a.icon} size={18} color={themeColors.primaryLight} />
          </View>
          <Text style={styles.label}>{a.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

