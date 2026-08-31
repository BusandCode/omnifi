import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Props = {
  onBack: () => void;
  canGoBack: boolean;
};

export function SetBudgetHeader({ onBack, canGoBack }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onBack} style={styles.iconBtn} hitSlop={8} disabled={!canGoBack}>
        <Ionicons name="chevron-back" size={18} color={canGoBack ? colors.textPrimary : colors.textSecondary} />
      </TouchableOpacity>
      <Text style={styles.title}>Set Budget</Text>
      <TouchableOpacity onPress={() => router.back()} style={[styles.iconBtn, styles.closeBtn]} hitSlop={8}>
        <Ionicons name="close" size={16} color={colors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  closeBtn: { borderWidth: 1.2, borderColor: colors.primary, backgroundColor: 'transparent' },
  title: { flex: 1, color: colors.textPrimary, fontSize: 15, fontWeight: '700', textAlign: 'center' },
});