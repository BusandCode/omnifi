import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const ICON_SIZE = 20;

export function BillsHeader() {
  const { colors: themeColors } = useTheme();

  const styles = StyleSheet.create({
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    backBtn: {
      width: 36, height: 36, borderRadius: 18, backgroundColor: themeColors.surface,
      justifyContent: 'center', alignItems: 'center',
    },
    title: { color: themeColors.textPrimary, fontSize: 20, fontWeight: '700' },
    historyBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    historyText: { color: themeColors.primaryLight, fontSize: 13, fontWeight: '600' },
    subtitle: { color: themeColors.textSecondary, fontSize: 12, marginTop: 1, marginLeft: 48, marginBottom: 3 },
  });

  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={ICON_SIZE} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Bills</Text>
        </View>
        <TouchableOpacity style={styles.historyBtn}>
          <Feather name="clock" size={ICON_SIZE - 6} color={themeColors.primaryLight} />
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Pay your bills quickly and securely</Text>
    </View>
  );
}