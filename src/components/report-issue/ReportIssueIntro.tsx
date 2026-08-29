import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';

export function ReportIssueIntro() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>We're here to help</Text>
          <Text style={styles.sub}>
            Let us know what's going on and our team will get back to you as soon as possible.
          </Text>
        </View>

        <View style={styles.illustration}>
          <LinearGradient
            colors={['#A78BFA', '#6D28D9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bubble}
          >
            <Ionicons name="chatbubble-ellipses" size={22} color="#fff" />
          </LinearGradient>
          <View style={styles.alertBadge}>
            <Text style={styles.alertText}>!</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  textContainer: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 17, fontWeight: '700', marginBottom: 8 },
  sub: { color: colors.textSecondary, fontSize: 12, lineHeight: 17 },
  illustration: {
    width: 68,
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  alertText: { color: '#fff', fontSize: 12, fontWeight: '800' },
});