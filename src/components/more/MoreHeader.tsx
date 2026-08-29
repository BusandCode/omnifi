import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function MoreHeader({ avatarUri }: { avatarUri: string }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
        <Ionicons name="chevron-back" size={18} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.left}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Manage your account and settings</Text>
      </View>

      <Image source={{ uri: avatarUri }} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  backBtn: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center', marginTop: 2,
  },
  left: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: 9.5, marginTop: 2 },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: colors.primary },
});