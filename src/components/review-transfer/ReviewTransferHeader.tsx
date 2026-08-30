import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function ReviewTransferHeader() {
  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Review Transfer</Text>
        <View style={styles.iconBtn}>
          <Ionicons name="shield-checkmark-outline" size={18} color={colors.primaryLight} />
        </View>
      </View>
      <Text style={styles.subtitle}>Please confirm your transfer details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 1.2, borderColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { flex: 1, color: colors.textPrimary, fontSize: 16.5, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: colors.textSecondary, fontSize: 11.5, textAlign: 'center', marginTop: 5 },
});