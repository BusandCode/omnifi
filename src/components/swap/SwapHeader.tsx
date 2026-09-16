import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function SwapHeader() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  backBtn: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: themeColors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: themeColors.textPrimary, fontSize: 17, fontWeight: '600' },
  historyBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  historyText: { color: themeColors.primaryLight, fontSize: 11, fontWeight: '600' },
  subtitle: { color: themeColors.textSecondary, fontSize: 10.5, marginTop: 3, marginLeft: 42 },
}),
    [themeColors]
  );

  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={19} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Swap</Text>
        </View>
        <TouchableOpacity style={styles.historyBtn}>
          <Feather name="clock" size={12} color={themeColors.primaryLight} />
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Swap currencies instantly</Text>
    </View>
  );
}

