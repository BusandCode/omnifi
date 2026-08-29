import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const hours = [
  { id: 'weekday', label: 'Monday - Friday', time: '8:00 AM - 8:00 PM' },
  { id: 'weekend', label: 'Saturday - Sunday', time: '9:00 AM - 5:00 PM' },
];

export function SupportHoursCard() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Support Hours</Text>
      <Text style={styles.sectionSub}>We're available to assist you during these hours.</Text>

      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Ionicons name="time" size={17} color={colors.primaryLight} />
        </View>
        <View style={styles.textContainer}>
          {hours.map((h) => (
            <View key={h.id} style={styles.row}>
              <Text style={styles.label}>{h.label}</Text>
              <Text style={styles.time}>{h.time}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { color: colors.textPrimary, fontSize: 14.5, fontWeight: '700', marginBottom: 3 },
  sectionSub: { color: colors.textSecondary, fontSize: 11.5, marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: { flex: 1, gap: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  time: { color: colors.textSecondary, fontSize: 12 },
});