import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';

type Channel = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  sub: string;
  meta?: string;
  metaColor?: string;
  onPress?: () => void;
};

const channels: Channel[] = [
  {
    id: 'chat',
    icon: 'chatbubble-ellipses',
    title: 'Live Chat',
    sub: 'Chat with our support team in real time.',
    meta: '● Available now',
    metaColor: colors.success,
    onPress: () => router.push('/livechat'),
  },
  {
    id: 'email',
    icon: 'mail',
    title: 'Email Us',
    sub: "Send us an email and we'll get back to you as soon as possible.",
    meta: 'support@omnifi.com',
    metaColor: colors.primaryLight,
    onPress: () => Linking.openURL('mailto:support@omnifi.com'),
  },
  {
    id: 'call',
    icon: 'call',
    title: 'Call Us',
    sub: 'Speak with our support team directly.',
    meta: '+234 800 123 4567',
    metaColor: colors.primaryLight,
    onPress: () => Linking.openURL('tel:+2348001234567'),
  },
];

export function SupportChannelsCard() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Talk to our support team</Text>
      <Text style={styles.sectionSub}>Choose the option that works best for you.</Text>

      <View style={styles.card}>
        {channels.map((c, index) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.row, index !== channels.length - 1 && styles.rowDivider]}
            onPress={c.onPress}
          >
            <View style={styles.iconBox}>
              <Ionicons name={c.icon} size={18} color={colors.primaryLight} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{c.title}</Text>
              <Text style={styles.sub}>{c.sub}</Text>
              {c.meta && (
                <Text style={[styles.meta, { color: c.metaColor }]}>{c.meta}</Text>
              )}
            </View>
            <Feather name="chevron-right" size={16} color={colors.primaryLight} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { color: colors.textPrimary, fontSize: 14.5, fontWeight: '700', marginBottom: 3 },
  sectionSub: { color: colors.textSecondary, fontSize: 11.5, marginBottom: 12 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 14,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  textContainer: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  sub: { color: colors.textSecondary, fontSize: 11, marginTop: 3, lineHeight: 15 },
  meta: { fontSize: 11, fontWeight: '600', marginTop: 4 },
});