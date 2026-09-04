import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/ThemeContext';

export function PushBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { colors: themeColors } = useTheme();
  if (dismissed) return null;

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: themeColors.surface, borderColor: themeColors.border },
      ]}
    >
      <LinearGradient
        colors={[themeColors.primaryTint, 'rgba(167,139,250,0.05)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: themeColors.primaryTint }]}>
          <View style={[styles.dot, { backgroundColor: themeColors.primary }]} />
          <Feather name="bell" size={18} color={themeColors.primary} />
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>
            Enable push notifications
          </Text>
          <Text style={[styles.sub, { color: themeColors.textSecondary }]}>
            Stay updated with real-time alerts on transactions and more.
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.enableBtn, { backgroundColor: themeColors.primary }]}>
            <Text style={styles.enableText}>Enable</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDismissed(true)} hitSlop={8}>
            <Feather name="x" size={16} color={themeColors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    position: 'relative',
  },
  dot: {
    position: 'absolute', top: 4, right: 4,
    width: 6, height: 6, borderRadius: 3,
  },
  iconBox: {
    width: 38, height: 38, borderRadius: 19,
    justifyContent: 'center', alignItems: 'center',
  },
  textBlock: { flex: 1 },
  title: { fontSize: 13, fontWeight: '700' },
  sub: { fontSize: 11, marginTop: 3, lineHeight: 15 },
  actions: { alignItems: 'center', gap: 10, justifyContent: 'center', flexDirection: 'row' },
  enableBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  enableText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});