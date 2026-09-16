import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../theme/ThemeContext';

export function LiveChatHeader() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  wrapper: { alignItems: 'center', gap: 6 },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: themeColors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '700' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: themeColors.success },
  statusText: { color: themeColors.textSecondary, fontSize: 11.5 },
}),
    [themeColors]
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Feather name="chevron-left" size={20} color={themeColors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Live Chat</Text>

        <TouchableOpacity style={styles.iconBtn}>
          <Feather name="more-vertical" size={18} color={themeColors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.dot} />
        <Text style={styles.statusText}>Support Agent is online</Text>
      </View>
    </View>
  );
}

