import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Topic = {
  id: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
};

const topics: Topic[] = [
  {
    id: 'account',
    icon: <Feather name="credit-card" size={15} color={colors.primaryLight} />,
    title: 'Account & Profile',
    sub: 'Update your details, change password and more',
  },
  {
    id: 'transactions',
    icon: <MaterialCommunityIcons name="swap-horizontal" size={17} color={colors.primaryLight} />,
    title: 'Transactions & Transfers',
    sub: 'Learn about sending, receiving and transaction issues',
  },
  {
    id: 'payments',
    icon: <Feather name="credit-card" size={15} color={colors.primaryLight} />,
    title: 'Payments & Cards',
    sub: 'Card issues, failed payments and payment methods',
  },
  {
    id: 'security',
    icon: <Ionicons name="shield" size={16} color={colors.primaryLight} />,
    title: 'Security & Privacy',
    sub: 'Secure your account and protect your information',
  },
  {
    id: 'settings',
    icon: <Ionicons name="settings" size={15} color={colors.primaryLight} />,
    title: 'Settings & Preferences',
    sub: 'Manage notifications, theme, language and more',
  },
];

export function PopularTopics() {
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
          <Feather name="chevron-right" size={15} color={colors.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 3,
  },
  title: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '500' },
  viewAll: { color: colors.primaryLight, fontSize: 10, fontWeight: '500', marginRight: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 11,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: { color: colors.textPrimary, fontSize: 11, fontWeight: '500' },
  itemSub: { color: colors.textSecondary, fontSize: 9, marginTop: 2 },
  textContainer: { flex: 1 },
});