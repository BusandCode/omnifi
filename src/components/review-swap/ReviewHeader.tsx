import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function ReviewHeader() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: themeColors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: themeColors.textPrimary, fontSize: 17, fontWeight: '600' },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  editText: { color: themeColors.primaryLight, fontSize: 13, fontWeight: '600' },
  subtitle: { color: themeColors.textSecondary, fontSize: 12, marginTop: 6, marginLeft: 48 },
}),
    [themeColors]
  );

  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Review Swap</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={() => router.back()}>
          <Feather name="edit-2" size={13} color={themeColors.primaryLight} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Please review the details before you confirm</Text>
    </View>
  );
}

