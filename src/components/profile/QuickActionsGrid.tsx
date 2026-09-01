import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Action = { icon: keyof typeof Feather.glyphMap; label: string };

const actions: Action[] = [
  { icon: 'user', label: 'Personal' },
  { icon: 'shield', label: 'Security' },
  { icon: 'file-text', label: 'Statements' },
  { icon: 'credit-card', label: 'Limits' },
  { icon: 'settings', label: 'Preferences' },
];

export function QuickActionsGrid() {
  return (
    <View style={styles.card}>
      {actions.map((a) => (
        <TouchableOpacity key={a.label} style={styles.item}>
          <View style={styles.iconBox}>
            <Feather name={a.icon} size={16} color={colors.primaryLight} />
          </View>
          <Text style={styles.label} numberOfLines={1}>{a.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: colors.surface, borderRadius: 13, padding: 10,
  },
  item: { alignItems: 'center', gap: 6, flex: 1 },
  iconBox: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  label: { color: colors.textPrimary, fontSize: 8.5, textAlign: 'center' },
});
