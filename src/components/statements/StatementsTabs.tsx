import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export type StatementsTab = 'statements' | 'other';

type StatementsTabsProps = {
  active: StatementsTab;
  onChange: (tab: StatementsTab) => void;
};

export function StatementsTabs({ active, onChange }: StatementsTabsProps) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.tab, active === 'statements' && styles.tabActive]}
        onPress={() => onChange('statements')}
      >
        <Feather name="file-text" size={14} color={active === 'statements' ? colors.primaryLight : colors.textSecondary} />
        <Text style={[styles.text, active === 'statements' && styles.textActive]}>Statements</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, active === 'other' && styles.tabActive]}
        onPress={() => onChange('other')}
      >
        <Feather name="folder" size={14} color={active === 'other' ? colors.primaryLight : colors.textSecondary} />
        <Text style={[styles.text, active === 'other' && styles.textActive]}>Other Documents</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: 'rgba(167,139,250,0.15)',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: { color: colors.textSecondary, fontSize: 12.5, fontWeight: '600' },
  textActive: { color: colors.primaryLight },
});