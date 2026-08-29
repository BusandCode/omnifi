import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function OfficeCard() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Our Office</Text>
      <Text style={styles.sectionSub}>Visit us at our headquarters.</Text>

      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Ionicons name="location" size={18} color={colors.primaryLight} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>OmniFi HQ</Text>
          <Text style={styles.sub}>
            Plot 1234, Finance Avenue, Central Business District, Abuja, FCT, Nigeria.
          </Text>
        </View>
        <TouchableOpacity style={styles.directionsBtn}>
          <Feather name="navigation" size={12} color={colors.textPrimary} />
          <Text style={styles.directionsText}>Get Directions</Text>
        </TouchableOpacity>
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
    marginTop: 2,
  },
  textContainer: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  sub: { color: colors.textSecondary, fontSize: 11, marginTop: 3, lineHeight: 15 },
  directionsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  directionsText: { color: colors.textPrimary, fontSize: 10.5, fontWeight: '600' },
});