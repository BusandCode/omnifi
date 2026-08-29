import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type ExchangeRateRowProps = {
  label: string;
  onConvert?: () => void;
};

export function ExchangeRateRow({ label, onConvert }: ExchangeRateRowProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          <Feather name="refresh-cw" size={15} color={colors.primaryLight} />
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>{label}</Text>
          <Ionicons name="information-circle-outline" size={13} color={colors.textSecondary} />
        </View>
      </View>

      <TouchableOpacity style={styles.convertBtn} onPress={onConvert}>
        <Text style={styles.convertText}>Convert Now</Text>
        <Feather name="chevron-right" size={14} color={colors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  iconBox: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  textRow: { flexDirection: 'row', alignItems: 'center', gap: 5, flexShrink: 1 },
  label: { color: colors.textPrimary, fontSize: 12, fontWeight: '600' },
  convertBtn: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  convertText: { color: colors.primaryLight, fontSize: 11.5, fontWeight: '700' },
});