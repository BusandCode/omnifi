import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { CurrencyCode } from '../../constants/currencies';

type AccountQuickActionsProps = {
  currency: CurrencyCode;
};

export function AccountQuickActions({ currency }: AccountQuickActionsProps) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: { flexDirection: 'row' },
  item: { flex: 1, alignItems: 'center', gap: 6 },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: themeColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { color: themeColors.textPrimary, fontSize: 9.5, textAlign: 'center' },
}),
    [themeColors]
  );

  const actions: { icon: keyof typeof Feather.glyphMap; label: string; onPress?: () => void }[] = [
    {
      icon: 'plus',
      label: 'Add Funds',
      onPress: () => router.push({ pathname: '/request-money', params: { currency } }),
    },
    // { icon: 'send', label: 'Send' },
    { icon: 'refresh-cw', label: 'Convert' },
    {
      icon: 'file-text',
      label: 'Statements',
      onPress: () => router.push({ pathname: '/statements', params: { currency } }),
    },
    { icon: 'more-horizontal', label: 'More' },
  ];

  return (
    <View style={styles.row}>
      {actions.map((a) => (
        <TouchableOpacity key={a.label} style={styles.item} onPress={a.onPress} activeOpacity={0.7}>
          <View style={styles.iconCircle}>
            <Feather name={a.icon} size={17} color={themeColors.primaryLight} />
          </View>
          <Text style={styles.label} numberOfLines={1}>{a.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

