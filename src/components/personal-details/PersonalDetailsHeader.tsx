import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function PersonalDetailsHeader() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.iconBtn, { borderColor: themeColors.primary }]}
        hitSlop={8}
      >
        <Ionicons name="chevron-back" size={18} color={themeColors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Personal Details</Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          View and manage your personal information and account settings.
        </Text>
      </View>

      <TouchableOpacity style={[styles.iconBtn, { borderColor: themeColors.primary }]}>
        <Feather name="help-circle" size={16} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  iconBtn: {
    width: 34, height: 34, borderRadius: 17,
    borderWidth: 1.2,
    justifyContent: 'center', alignItems: 'center',
  },
  center: { flex: 1, alignItems: 'center', paddingTop: 6 },
  title: { fontSize: 16, fontWeight: '700' },
  subtitle: { fontSize: 10.5, textAlign: 'center', marginTop: 4, lineHeight: 14 },
});