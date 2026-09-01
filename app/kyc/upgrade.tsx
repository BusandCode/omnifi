// app/kyc/upgrade.tsx — verification upgrade flow, reads ?target=2|3
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, CreditCard, MapPin, Video, FileText, Check } from 'lucide-react-native';
import { colors } from '../../src/theme/colors';

interface Requirement {
  key: string;
  icon: React.ComponentType<any>;
  title: string;
  sub: string;
}

const REQUIREMENTS_BY_TARGET: Record<'2' | '3', { heading: string; blurb: string; items: Requirement[] }> = {
  '2': {
    heading: 'Upgrade to Tier 2',
    blurb: 'Verify your identity to unlock higher transfer limits and unlimited wallet balance.',
    items: [
      { key: 'bvn', icon: CreditCard, title: 'Link your BVN', sub: 'Used to confirm your identity with your bank' },
      { key: 'id', icon: FileText, title: 'Valid government ID', sub: 'NIN slip, driver\u2019s license, or international passport' },
    ],
  },
  '3': {
    heading: 'Upgrade to Tier 3',
    blurb: 'Complete premium verification to unlock unlimited limits and priority support.',
    items: [
      { key: 'address', icon: MapPin, title: 'Proof of address', sub: 'Utility bill or bank statement, issued within 3 months' },
      { key: 'video', icon: Video, title: 'Video verification', sub: 'A short live selfie video to confirm it\u2019s really you' },
      { key: 'id', icon: FileText, title: 'Valid government ID', sub: 'Must match the details on your Tier 2 verification' },
    ],
  },
};

export default function KycUpgradeScreen() {
  const router = useRouter();
  const { target } = useLocalSearchParams<{ target?: string }>();
  const targetKey: '2' | '3' = target === '3' ? '3' : '2';
  const config = useMemo(() => REQUIREMENTS_BY_TARGET[targetKey], [targetKey]);

  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()} hitSlop={10}>
          <ChevronLeft color={colors.textPrimary} size={22} />
        </Pressable>
        <Text style={styles.headerTitle}>{config.heading}</Text>
        <View style={styles.iconBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.blurb}>{config.blurb}</Text>

        <Text style={styles.sectionTitle}>You'll need</Text>
        <View style={styles.card}>
          {config.items.map((item, idx) => (
            <View
              key={item.key}
              style={[styles.row, idx !== config.items.length - 1 && styles.rowDivider]}
            >
              <View style={styles.rowIcon}>
                <item.icon color={colors.primary} size={18} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowSub}>{item.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        <Pressable
          style={styles.ackRow}
          onPress={() => setAcknowledged((prev) => !prev)}
        >
          <View style={[styles.checkbox, acknowledged && styles.checkboxChecked]}>
            {acknowledged && <Check color="#fff" size={13} strokeWidth={3} />}
          </View>
          <Text style={styles.ackText}>
            I confirm the documents I provide are accurate and belong to me.
          </Text>
        </Pressable>

        <Pressable
          disabled={!acknowledged}
          onPress={() => {
            if (!acknowledged) return;
            router.replace({ pathname: '/account-limits', params: { tier: targetKey } });
          }}
        >
          <LinearGradient
            colors={[colors.primary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.cta, !acknowledged && styles.ctaDisabled]}
          >
            <Text style={styles.ctaLabel}>Start Verification</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 54 : 24,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '600' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  blurb: { color: colors.textSecondary, fontSize: 14, lineHeight: 20, marginTop: 4, marginBottom: 22 },
  sectionTitle: { color: colors.textPrimary, fontSize: 15.5, fontWeight: '700', marginBottom: 10 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTitle: { color: colors.textPrimary, fontSize: 14.5, fontWeight: '600' },
  rowSub: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  ackRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 24 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  ackText: { flex: 1, color: colors.textSecondary, fontSize: 13, lineHeight: 18 },
  cta: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaDisabled: { opacity: 0.4 },
  ctaLabel: { color: '#fff', fontSize: 15.5, fontWeight: '700' },
});
