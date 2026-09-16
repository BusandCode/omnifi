import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function ReportIssueHeader() {
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
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: themeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: { left: 0 },
  right: { right: 0 },
  title: { color: themeColors.textPrimary, fontSize: 17, fontWeight: '700' },
}),
    [themeColors]
  );

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={[styles.iconBtn, styles.left]} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Report an Issue</Text>
      <TouchableOpacity style={[styles.iconBtn, styles.right]}>
        <Ionicons name="headset-outline" size={19} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

