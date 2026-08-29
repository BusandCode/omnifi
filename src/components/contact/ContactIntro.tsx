import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';

export function ContactIntro() {
  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>We're here to help</Text>
        <Text style={styles.sub}>
          Reach out to us through any of the channels below. We're happy to assist you.
        </Text>
      </View>

      <View style={styles.illustration}>
        <LinearGradient
          colors={['#A78BFA', '#6D28D9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.envelope}
        >
          <Ionicons name="headset" size={22} color="#fff" />
        </LinearGradient>
        <View style={styles.bubble}>
          <Ionicons name="ellipsis-horizontal" size={13} color="#fff" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  textContainer: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 22, fontWeight: '700', marginBottom: 8 },
  sub: { color: colors.textSecondary, fontSize: 12.5, lineHeight: 18 },
  illustration: {
    width: 84,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  envelope: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-6deg' }],
  },
  bubble: {
    position: 'absolute',
    bottom: 4,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
});