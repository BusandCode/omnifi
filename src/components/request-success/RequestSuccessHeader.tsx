import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function RequestSuccessHeader() {
  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Request Money</Text>
        <View style={styles.iconBtn}>
          <Ionicons name="shield-checkmark-outline" size={18} color={colors.primaryLight} />
        </View>
      </View>
      <Text style={styles.subtitle}>Review your request</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { flex: 1, color: colors.textPrimary, fontSize: 17, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: colors.textSecondary, fontSize: 12, textAlign: 'center', marginTop: 6 },
});