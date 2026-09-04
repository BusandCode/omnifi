import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../theme/ThemeContext';

export function NotificationsHeader() {
  const router = useRouter();
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <TouchableOpacity
          style={[styles.iconBtn, { backgroundColor: themeColors.surface }]}
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Notifications</Text>
      </View>
      <TouchableOpacity style={[styles.iconBtn, { backgroundColor: themeColors.surface }]}>
        <Feather name="settings" size={18} color={themeColors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10, marginBottom: 12 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { fontSize: 20, fontWeight: '500' },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19,
    justifyContent: 'center', alignItems: 'center',
  },
});