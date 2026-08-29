import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../theme/colors';

export function NotificationsHeader() {
  const router = useRouter();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <TouchableOpacity style={styles.iconBtn}>
        <Feather name="settings" size={18} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10,marginRight: 10, marginBottom: 12 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: '500' },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
    // opacity: 0.8,
  },
});