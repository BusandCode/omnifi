import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function AddMoneyHeader({ subtitle }: { subtitle: string }) {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backBtn, { backgroundColor: themeColors.surface }]}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>Add Money</Text>
        </View>
        <TouchableOpacity style={styles.historyBtn}>
          <Feather name="clock" size={14} color={themeColors.primaryLight} />
          <Text style={[styles.historyText, { color: themeColors.primaryLight }]}>History</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: '500' },
  historyBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  historyText: { fontSize: 13, fontWeight: '600' },
  subtitle: { fontSize: 12, marginTop: 6, marginLeft: 48 },
});