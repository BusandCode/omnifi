// AccountDetailsCard.tsx
import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { AccountDetailRow } from '../../constants/accountData';

type AccountDetailsCardProps = {
  details: AccountDetailRow[];
};

export function AccountDetailsCard({ details }: AccountDetailsCardProps) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
      sectionTitle: { color: themeColors.textPrimary, fontSize: 14.5, fontWeight: '700', marginBottom: 12 },
      card: { backgroundColor: themeColors.surface, borderRadius: 16, paddingHorizontal: 14 },
      row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
      rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: themeColors.border },
      iconBox: {
        width: 34, height: 34, borderRadius: 17,
        backgroundColor: 'rgba(167,139,250,0.15)',
        justifyContent: 'center', alignItems: 'center',
      },
      textContainer: { flex: 1 },
      label: { color: themeColors.textSecondary, fontSize: 10.5 },
      value: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600', marginTop: 2 },
    }),
    [themeColors]
  );

  const handleCopy = (value: string) => {
    Clipboard.setStringAsync(value.replace(/\s/g, ''));
  };

  // Function to render icon based on icon name
  const renderIcon = (iconName: string) => {
    switch(iconName) {
      case 'hash':
        return <Feather name="hash" size={15} color={themeColors.primaryLight} />;
      case 'globe':
        return <Feather name="globe" size={15} color={themeColors.primaryLight} />;
      case 'bank':
        return <MaterialCommunityIcons name="bank-outline" size={15} color={themeColors.primaryLight} />;
      case 'calendar':
        return <Feather name="calendar" size={15} color={themeColors.primaryLight} />;
      default:
        return null;
    }
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>Account Details</Text>
      <View style={styles.card}>
        {details.map((d, index) => (
          <TouchableOpacity
            key={d.id}
            style={[styles.row, index !== details.length - 1 && styles.rowDivider]}
            onPress={d.copyable ? () => handleCopy(d.value) : undefined}
            activeOpacity={d.copyable || d.chevron ? 0.6 : 1}
          >
            <View style={styles.iconBox}>
              {renderIcon(d.icon)}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>{d.label}</Text>
              <Text style={styles.value}>{d.value}</Text>
            </View>
            {d.copyable && <Feather name="copy" size={14} color={themeColors.textSecondary} />}
            {d.chevron && <Feather name="chevron-right" size={16} color={themeColors.textSecondary} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}