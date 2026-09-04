import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Network } from './NetworkSelector';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

const NETWORK_LABELS: Record<Network, string> = {
  mtn: 'MTN', airtel: 'Airtel', glo: 'Glo', '9mobile': '9mobile',
};

type Props = {
  network: Network;
  phone: string;
  amount: number;
  save: number;
  total: number;
};

export function TransactionSummary({ network, phone, amount, save, total }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      styles: StyleSheet.create({
        card: {
          backgroundColor: themeColors.surface,
          borderRadius: s(14),
          padding: s(12)
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: f(12),
          fontWeight: '700',
          marginBottom: s(8)
        },
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: s(4)
        },
        label: { color: themeColors.textSecondary, fontSize: f(10.5) },
        value: { color: themeColors.textPrimary, fontSize: f(10.5), fontWeight: '600' },
        saveLabel: { color: themeColors.primaryLight, fontSize: f(10.5) },
        saveValue: { color: themeColors.primaryLight, fontSize: f(10.5), fontWeight: '600' },
        divider: {
          height: 1,
          backgroundColor: themeColors.border,
          marginVertical: s(6)
        },
        totalLabel: { color: themeColors.textPrimary, fontSize: f(12.5), fontWeight: '700' },
        totalValue: { color: themeColors.textPrimary, fontSize: f(13), fontWeight: '700' },
        cta: {
          backgroundColor: themeColors.primary,
          borderRadius: s(14),
          paddingVertical: s(13),
          alignItems: 'center'
        },
        ctaText: { color: '#fff', fontSize: f(13.5), fontWeight: '700' },
        gap: { gap: s(8) },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.gap}>
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
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>₦{amount.toLocaleString()}.00</Text>
        </View>
        {save > 0 && (
          <View style={styles.row}>
            <Text style={styles.saveLabel}>You Save</Text>
            <Text style={styles.saveValue}>- ₦{save}.00</Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₦{total.toLocaleString()}.00</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cta}>
        <Text style={styles.ctaText}>Continue to Pay</Text>
      </TouchableOpacity>
    </View>
  );
}