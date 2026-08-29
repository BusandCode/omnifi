import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function PersonalDetailsHeader() {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
        <Ionicons name="chevron-back" size={18} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={styles.title}>Personal Details</Text>
        <Text style={styles.subtitle}>View and manage your personal information and account settings.</Text>
      </View>

      <TouchableOpacity style={styles.iconBtn}>
        <Feather name="help-circle" size={16} color={colors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  iconBtn: {
    width: 34, height: 34, borderRadius: 17,
    borderWidth: 1.2, borderColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  center: { flex: 1, alignItems: 'center', paddingTop: 6 },
  title: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: 10.5, textAlign: 'center', marginTop: 4, lineHeight: 14 },
});