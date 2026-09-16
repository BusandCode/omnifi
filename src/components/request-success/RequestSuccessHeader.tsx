import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function RequestSuccessHeader() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: themeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { flex: 1, color: themeColors.textPrimary, fontSize: 17, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: themeColors.textSecondary, fontSize: 12, textAlign: 'center', marginTop: 6 },
}),
    [themeColors]
  );

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Request Money</Text>
        <View style={styles.iconBtn}>
          <Ionicons name="shield-checkmark-outline" size={18} color={themeColors.primaryLight} />
        </View>
      </View>
      <Text style={styles.subtitle}>Review your request</Text>
    </View>
  );
}

