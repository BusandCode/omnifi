import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function SecurityInfoCard() {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={[styles.row, styles.rowDivider]}>
        <View style={styles.iconBox}>
          <Ionicons name="shield-checkmark" size={16} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Secure & Encrypted</Text>
          <Text style={styles.sub}>Your transfer is protected with bank-level security.</Text>
        </View>
        <Feather name="chevron-right" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.row}>
        <View style={styles.iconBox}>
          <Feather name="clock" size={15} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Estimated Arrival</Text>
          <Text style={styles.subSuccess}>Within a few minutes</Text>
        </View>
        <Feather name="chevron-right" size={16} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 18, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  iconBox: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  sub: { color: colors.textSecondary, fontSize: 10.5, marginTop: 2, lineHeight: 14 },
  subSuccess: { color: colors.success, fontSize: 11, fontWeight: '600', marginTop: 2 },
});