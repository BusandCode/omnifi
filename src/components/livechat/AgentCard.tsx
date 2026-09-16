import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function AgentCard() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: themeColors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: themeColors.border,
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: themeColors.primary,
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
    backgroundColor: themeColors.success,
    borderWidth: 2,
    borderColor: themeColors.surface,
  },
  name: { color: themeColors.textPrimary, fontSize: 14, fontWeight: '700' },
  role: { color: themeColors.textSecondary, fontSize: 11, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  ratingText: { color: themeColors.textSecondary, fontSize: 10.5 },
}),
    [themeColors]
  );

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
          <Ionicons name="star" size={11} color={themeColors.primaryLight} />
          <Text style={styles.ratingText}>4.9 (1200+ chats)</Text>
        </View>
      </View>
    </View>
  );
}

