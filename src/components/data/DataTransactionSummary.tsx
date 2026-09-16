import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Network } from '../airtime/NetworkSelector';
import { DataPlan } from '../../../app/data';
import { useTheme } from '../../theme/ThemeContext';

const NETWORK_LABELS: Record<Network, string> = {
  mtn: 'MTN', airtel: 'Airtel', glo: 'Glo', '9mobile': '9mobile',
};

const PLAN_TYPE_LABELS: Record<string, string> = {
  daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', special: 'Special', night: 'Night Plans',
};

type Props = {
  network: Network;
  phone: string;
  plan: DataPlan | null;
  planTypeLabel: string;
};

export function DataTransactionSummary({ network, phone, plan, planTypeLabel }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: { backgroundColor: themeColors.surface, borderRadius: 16, padding: 15 },
  title: { color: themeColors.textPrimary, fontSize: 14, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  label: { color: themeColors.textSecondary, fontSize: 12.5 },
  value: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#2C2C2E', marginVertical: 8 },
  totalLabel: { color: themeColors.textPrimary, fontSize: 14.5, fontWeight: '700' },
  totalValue: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '700' },
  cta: { backgroundColor: themeColors.primary, borderRadius: 16, paddingVertical: 15, alignItems: 'center' },
  ctaDisabled: { backgroundColor: themeColors.surface, opacity: 0.5 },
  ctaText: { color: '#fff', fontSize: 15, fontWeight: '700' },
}),
    [themeColors]
  );

  return (
    <View style={{ gap: 10 }}>
      <View style={styles.card}>
        <Text style={styles.title}>Transaction Summary</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Network</Text>
          <Text style={styles.value}>{NETWORK_LABELS[network]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Plan</Text>
          <Text style={styles.value}>
            {plan ? `${plan.size} - ${PLAN_TYPE_LABELS[planTypeLabel]}` : 'Select a plan'}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            {plan ? `₦${plan.price.toLocaleString()}.00` : '—'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.cta, !plan && styles.ctaDisabled]}
        disabled={!plan}
      >
        <Text style={styles.ctaText}>Continue to Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

