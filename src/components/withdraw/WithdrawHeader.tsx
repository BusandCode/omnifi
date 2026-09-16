import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export default function WithdrawHeader({ onBack }: { onBack?: () => void }) {
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        },
        iconButton: {
          width: 38,
          height: 38,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: themeColors.border,
          alignItems: 'center',
          justifyContent: 'center',
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: 18,
          fontWeight: '700',
        },
      }),
    [themeColors]
  );

  return (
    <View style={styles.header}>
      <Pressable onPress={onBack ?? (() => router.back())} style={styles.iconButton}>
        <Feather name="chevron-left" size={22} color={themeColors.textPrimary} />
      </Pressable>
      <Text style={styles.title}>Withdraw Funds</Text>
      <Pressable style={styles.iconButton}>
        <Feather name="shield" size={18} color={themeColors.textPrimary} />
      </Pressable>
    </View>
  );
}