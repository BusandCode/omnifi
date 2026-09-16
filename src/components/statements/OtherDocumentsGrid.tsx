// src/components/statements/OtherDocumentsGrid.tsx
import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type DocCard = {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  sub: string;
  arrowColor: string;
};

export function OtherDocumentsGrid() {
  const { colors: themeColors } = useTheme();

  const docs: DocCard[] = useMemo(
    () => [
      {
        id: 'tax',
        icon: <Ionicons name="shield-checkmark" size={18} color="#34C759" />,
        iconBg: 'rgba(52,199,89,0.15)',
        title: 'Tax Documents',
        sub: 'Download your tax reports and certificates',
        arrowColor: themeColors.primaryLight,
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
        arrowColor: themeColors.primaryLight,
      },
      {
        id: 'interest',
        icon: <Feather name="percent" size={17} color={themeColors.primaryLight} />,
        iconBg: 'rgba(167,139,250,0.15)',
        title: 'Interest Certificates',
        sub: 'Download your interest earned certificates',
        arrowColor: themeColors.primaryLight,
      },
    ],
    [themeColors]
  );

  return (
    <View>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>Other Documents</Text>
      <Text style={[styles.sub, { color: themeColors.textSecondary }]}>Important documents and reports</Text>

      {docs.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: themeColors.surface }]}>
          <Feather name="folder" size={28} color={themeColors.textSecondary} style={styles.emptyIcon} />
          <Text style={[styles.emptyText, { color: themeColors.textPrimary }]}>No documents available</Text>
          <Text style={[styles.emptySub, { color: themeColors.textSecondary }]}>Your documents will appear here once available.</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {docs.map((d) => (
            <TouchableOpacity key={d.id} style={[styles.card, { backgroundColor: themeColors.surface }]}>
              <View style={[styles.iconBox, { backgroundColor: d.iconBg }]}>
                {d.icon}
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.cardTitle, { color: themeColors.textPrimary }]}>{d.title}</Text>
                <Text style={[styles.cardSub, { color: themeColors.textSecondary }]} numberOfLines={2}>{d.sub}</Text>
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
  title: { fontSize: 15.5, fontWeight: '700', marginBottom: 3 },
  sub: { fontSize: 11.5, marginBottom: 12 },
  emptyCard: {
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: { marginBottom: 12 },
  emptyText: { fontSize: 14, fontWeight: '700', textAlign: 'center' },
  emptySub: { fontSize: 11.5, marginTop: 6, textAlign: 'center' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    width: '48%',
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
  cardTitle: { fontSize: 12, fontWeight: '700', marginBottom: 3 },
  cardSub: { fontSize: 10, lineHeight: 13.5 },
});