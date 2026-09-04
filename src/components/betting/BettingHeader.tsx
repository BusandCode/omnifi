// src/components/betting/BettingHeader.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function BettingHeader({ subtitle }: { subtitle: string }) {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backBtn, { backgroundColor: themeColors.surface }]}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerCol}>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>Betting</Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>{subtitle}</Text>
        </View>
        <TouchableOpacity style={[styles.infoBtn, { borderColor: themeColors.border }]} hitSlop={8}>
          <Feather name="info" size={15} color={themeColors.primaryLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  left: { width: 36 },
  centerCol: { flex: 1, alignItems: 'center' },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  infoBtn: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1,
  },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { fontSize: 12, marginTop: 4, textAlign: 'center' },
});