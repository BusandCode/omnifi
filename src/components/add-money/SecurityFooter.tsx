import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function SecurityFooter() {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="shield-checkmark" size={16} color={colors.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Your money is secure</Text>
        <Text style={styles.sub}>All transactions are protected with bank-level security.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface, borderRadius: 16, padding: 14,
  },
  iconBox: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 12, fontWeight: '600' },
  sub: { color: colors.textSecondary, fontSize: 10.5, marginTop: 2 },
  textContainer: { flex: 1 },
});