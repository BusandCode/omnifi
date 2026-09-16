import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Topic = {
  id: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
};

export function PopularTopics() {
  const { colors: themeColors } = useTheme();

  const topics: Topic[] = useMemo(
    () => [
      {
        id: 'account',
        icon: <Feather name="credit-card" size={15} color={themeColors.primaryLight} />,
        title: 'Account & Profile',
        sub: 'Update your details, change password and more',
      },
      {
        id: 'transactions',
        icon: <MaterialCommunityIcons name="swap-horizontal" size={17} color={themeColors.primaryLight} />,
        title: 'Transactions & Transfers',
        sub: 'Learn about sending, receiving and transaction issues',
      },
      {
        id: 'payments',
        icon: <Feather name="credit-card" size={15} color={themeColors.primaryLight} />,
        title: 'Payments & Cards',
        sub: 'Card issues, failed payments and payment methods',
      },
      {
        id: 'security',
        icon: <Ionicons name="shield" size={16} color={themeColors.primaryLight} />,
        title: 'Security & Privacy',
        sub: 'Secure your account and protect your information',
      },
      {
        id: 'settings',
        icon: <Ionicons name="settings" size={15} color={themeColors.primaryLight} />,
        title: 'Settings & Preferences',
        sub: 'Manage notifications, theme, language and more',
      },
    ],
    [themeColors]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: themeColors.surface,
          borderRadius: 14,
          paddingHorizontal: 12,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: themeColors.border,
          overflow: 'hidden',
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 12,
          paddingBottom: 3,
        },
        title: { color: themeColors.textPrimary, fontSize: 11.5, fontWeight: '500' },
        viewAll: { color: themeColors.primaryLight, fontSize: 10, fontWeight: '500', marginRight: 6 },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingVertical: 11,
        },
        rowDivider: {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: themeColors.border,
        },
        iconBox: {
          width: 34,
          height: 34,
          borderRadius: 17,
          backgroundColor: 'rgba(167,139,250,0.15)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        itemTitle: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '500' },
        itemSub: { color: themeColors.textSecondary, fontSize: 9, marginTop: 2 },
        textContainer: { flex: 1 },
      }),
    [themeColors]
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Topics</Text>
        <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
      </View>

      {topics.map((t, index) => (
        <TouchableOpacity
          key={t.id}
          style={[styles.row, index !== topics.length - 1 && styles.rowDivider]}
          activeOpacity={0.7}
        >
          <View style={styles.iconBox}>{t.icon}</View>
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{t.title}</Text>
            <Text style={styles.itemSub} numberOfLines={1}>{t.sub}</Text>
          </View>
          <Feather name="chevron-right" size={15} color={themeColors.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
}