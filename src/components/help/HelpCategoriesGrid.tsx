import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Category = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  sub: string;
  arrowColor: string;
};

const categories: Category[] = [
  {
    id: 'faqs',
    icon: 'chatbubble-ellipses',
    iconBg: 'rgba(167,139,250,0.18)',
    iconColor: colors.primaryLight,
    title: 'FAQs',
    sub: 'Find quick answers to common questions',
    arrowColor: colors.primaryLight,
  },
  {
    id: 'guides',
    icon: 'document-text',
    iconBg: 'rgba(52,199,89,0.18)',
    iconColor: colors.success,
    title: 'Guides',
    sub: 'Step-by-step guides to help you',
    arrowColor: colors.success,
  },
  {
    id: 'safety',
    icon: 'shield-checkmark',
    iconBg: 'rgba(10,132,255,0.18)',
    iconColor: '#0A84FF',
    title: 'Safety Center',
    sub: 'Learn how to stay safe and protect your account',
    arrowColor: '#0A84FF',
  },
  {
    id: 'announcements',
    icon: 'notifications',
    iconBg: 'rgba(255,149,0,0.18)',
    iconColor: '#FF9500',
    title: 'Announcements',
    sub: 'Stay updated with the latest news and updates',
    arrowColor: '#FF9500',
  },
];

export function HelpCategoriesGrid() {
  return (
    <View style={styles.row}>
      {categories.map((c) => (
        <TouchableOpacity key={c.id} style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: c.iconBg }]}>
            <Ionicons name={c.icon} size={20} color={c.iconColor} />
          </View>
          <Text style={styles.title}>{c.title}</Text>
          <Text style={styles.sub} numberOfLines={4}>{c.sub}</Text>
          <Feather name="arrow-right" size={14} color={c.arrowColor} style={styles.arrow} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 10, fontWeight: '600', marginBottom: 6, textAlign: 'center', width: '100%' },
  sub: { color: colors.textSecondary, fontSize: 9, lineHeight: 13, textAlign: 'center', width: '100%' },
  arrow: { marginTop: 10, alignSelf: 'center' },
});