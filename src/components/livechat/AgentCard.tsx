import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function AgentCard() {
  return (
    <View style={styles.card}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Ionicons name="headset" size={20} color="#fff" />
        </View>
        <View style={styles.onlineDot} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>OmniFi Support</Text>
        <Text style={styles.role}>Customer Support Agent</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={11} color={colors.primaryLight} />
          <Text style={styles.ratingText}>4.9 (1200+ chats)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  name: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  role: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  ratingText: { color: colors.textSecondary, fontSize: 10.5 },
});