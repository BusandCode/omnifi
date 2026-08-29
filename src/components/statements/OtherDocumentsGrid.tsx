import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type DocCard = {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  sub: string;
  arrowColor: string;
};

const docs: DocCard[] = [
  {
    id: 'tax',
    icon: <Ionicons name="shield-checkmark" size={18} color="#34C759" />,
    iconBg: 'rgba(52,199,89,0.15)',
    title: 'Tax Documents',
    sub: 'Download your tax reports and certificates',
    arrowColor: colors.primaryLight,
  },
  {
    id: 'confirmation',
    icon: <MaterialCommunityIcons name="bank" size={18} color="#FF9500" />,
    iconBg: 'rgba(255,149,0,0.15)',
    title: 'Account Confirmation',
    sub: 'Get account confirmation letters',
    arrowColor: '#FF9500',
  },
  {
    id: 'kyc',
    icon: <Feather name="user-check" size={17} color="#0A84FF" />,
    iconBg: 'rgba(10,132,255,0.15)',
    title: 'KYC Documents',
    sub: 'View your submitted KYC documents',
    arrowColor: colors.primaryLight,
  },
  {
    id: 'interest',
    icon: <Feather name="percent" size={17} color={colors.primaryLight} />,
    iconBg: 'rgba(167,139,250,0.15)',
    title: 'Interest Certificates',
    sub: 'Download your interest earned certificates',
    arrowColor: colors.primaryLight,
  },
];

export function OtherDocumentsGrid() {
  return (
    <View>
      <Text style={styles.title}>Other Documents</Text>
      <Text style={styles.sub}>Important documents and reports</Text>

      {docs.length === 0 ? (
        <View style={styles.emptyCard}>
          <Feather name="folder" size={28} color={colors.textSecondary} style={styles.emptyIcon} />
          <Text style={styles.emptyText}>No documents available</Text>
          <Text style={styles.emptySub}>Your documents will appear here once available.</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {docs.map((d) => (
            <TouchableOpacity key={d.id} style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: d.iconBg }]}>
                {d.icon}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{d.title}</Text>
                <Text style={styles.cardSub} numberOfLines={2}>{d.sub}</Text>
              </View>
              <Feather name="chevron-right" size={14} color={d.arrowColor} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 15.5, fontWeight: '700', marginBottom: 3 },
  sub: { color: colors.textSecondary, fontSize: 11.5, marginBottom: 12 },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: { marginBottom: 12 },
  emptyText: { color: colors.textPrimary, fontSize: 14, fontWeight: '700', textAlign: 'center' },
  emptySub: { color: colors.textSecondary, fontSize: 11.5, marginTop: 6, textAlign: 'center' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: { marginBottom: 8 },
  cardTitle: { color: colors.textPrimary, fontSize: 12, fontWeight: '700', marginBottom: 3 },
  cardSub: { color: colors.textSecondary, fontSize: 10, lineHeight: 13.5 },
});