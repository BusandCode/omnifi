import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function ReviewHeader() {
  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Review Swap</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={() => router.back()}>
          <Feather name="edit-2" size={13} color={colors.primaryLight} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Please review the details before you confirm</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 17, fontWeight: '600' },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  editText: { color: colors.primaryLight, fontSize: 13, fontWeight: '600' },
  subtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 6, marginLeft: 48 },
});