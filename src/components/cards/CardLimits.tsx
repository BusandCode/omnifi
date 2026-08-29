import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const used = 200000;
const limit = 500000;
const progress = used / limit;

export function CardLimits() {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="credit-card" size={16} color={colors.primaryLight} />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>Card limits</Text>
        <View style={styles.subRow}>
          <Text style={styles.sub}>Daily ATM limit</Text>
          <Text style={styles.subValue}>
            NGN {used.toLocaleString()}.00 / NGN {limit.toLocaleString()}.00
          </Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <Feather name="chevron-right" size={18} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  iconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  textBlock: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 13, fontWeight: '600', marginBottom: 6 },
  subRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  sub: { color: colors.textSecondary, fontSize: 10 },
  subValue: { color: colors.textSecondary, fontSize: 10 },
  track: { height: 4, borderRadius: 2, backgroundColor: '#2C2C2E', overflow: 'hidden' },
  fill: { height: 4, borderRadius: 2, backgroundColor: colors.primary },
});