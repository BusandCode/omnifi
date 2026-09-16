import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type AccountHeaderProps = {
  code: string;
  fullName: string;
};

export function AccountHeader({ code, fullName }: AccountHeaderProps) {
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
    backgroundColor: themeColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: { left: 0 },
  right: { right: 0 },
  title: { color: themeColors.textPrimary, fontSize: 16, fontWeight: '700' },
  subtitle: { color: themeColors.textSecondary, fontSize: 11.5, textAlign: 'center', marginTop: 6 },
}),
    [themeColors]
  );

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.iconBtn, styles.left]} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>{code} Account</Text>
        <TouchableOpacity style={[styles.iconBtn, styles.right]}>
          <Feather name="more-vertical" size={17} color={themeColors.textPrimary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Manage your {fullName} balance and transactions</Text>
    </View>
  );
}

