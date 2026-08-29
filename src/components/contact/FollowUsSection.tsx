import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type SocialLink = {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  handle: string;
};

const links: SocialLink[] = [
  {
    id: 'instagram',
    icon: <FontAwesome5 name="instagram" size={14} color="#fff" />,
    iconBg: '#C13584',
    label: 'Instagram',
    handle: '@omnifi_ng',
  },
  {
    id: 'twitter',
    icon: <FontAwesome5 name="twitter" size={13} color="#fff" />,
    iconBg: '#111',
    label: 'Twitter',
    handle: '@OmniFi_Support',
  },
  {
    id: 'facebook',
    icon: <FontAwesome5 name="facebook-f" size={13} color="#fff" />,
    iconBg: '#1877F2',
    label: 'Facebook',
    handle: '@omnifi_ng',
  },
  {
    id: 'linkedin',
    icon: <FontAwesome5 name="linkedin-in" size={13} color="#fff" />,
    iconBg: '#0A66C2',
    label: 'LinkedIn',
    handle: 'OmniFi Ltd',
  },
];

export function FollowUsSection() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Follow Us</Text>
      <Text style={styles.sectionSub}>We're connected for updates and announcements.</Text>

      <View style={styles.grid}>
        {links.map((l) => (
          <TouchableOpacity key={l.id} style={styles.card}>
            <View style={[styles.iconCircle, { backgroundColor: l.iconBg }]}>
              {l.icon}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>{l.label}</Text>
              <Text style={styles.handle} numberOfLines={1}>{l.handle}</Text>
            </View>
            <Feather name="chevron-right" size={13} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { color: colors.textPrimary, fontSize: 14.5, fontWeight: '700', marginBottom: 3 },
  sectionSub: { color: colors.textSecondary, fontSize: 11.5, marginBottom: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    width: '47.5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 10,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: { flex: 1 },
  label: { color: colors.textPrimary, fontSize: 11, fontWeight: '700' },
  handle: { color: colors.primaryLight, fontSize: 9.5, marginTop: 1 },
});