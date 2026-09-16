import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function RequestMoneyHeader() {
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
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.2,
    borderColor: themeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: { left: 0 },
  right: { right: 0 },
  title: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '700' },
  subtitle: { color: themeColors.textSecondary, fontSize: 11, textAlign: 'center', marginTop: 3 },
}),
    [themeColors]
  );

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.iconBtn, styles.left]} hitSlop={8}>
          <Ionicons name="chevron-back" size={18} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Request Money</Text>
        <TouchableOpacity style={[styles.iconBtn, styles.right]}>
          <Ionicons name="help-circle-outline" size={17} color={themeColors.primaryLight} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Request money from anyone</Text>
    </View>
  );
}

