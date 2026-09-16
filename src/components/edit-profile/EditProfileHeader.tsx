import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function EditProfileHeader() {
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
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Edit Profile</Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          Update your personal information below.
        </Text>
      </View>

      {/* Spacer to keep the title centered, mirrors the back button's width */}
      <View style={styles.iconBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  iconBtn: {
    width: 34, height: 34, borderRadius: 17,
    borderWidth: 1.2,
    justifyContent: 'center', alignItems: 'center',
    borderColor: 'transparent',
  },
  center: { flex: 1, alignItems: 'center', paddingTop: 6 },
  title: { fontSize: 16, fontWeight: '700' },
  subtitle: { fontSize: 10.5, textAlign: 'center', marginTop: 4, lineHeight: 14 },
});