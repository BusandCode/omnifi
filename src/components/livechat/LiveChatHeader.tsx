import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '../../theme/colors';

export function LiveChatHeader() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Feather name="chevron-left" size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.title}>Live Chat</Text>

        <TouchableOpacity style={styles.iconBtn}>
          <Feather name="more-vertical" size={18} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.statusRow}>
        <View style={styles.dot} />
        <Text style={styles.statusText}>Support Agent is online</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', gap: 6 },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.success },
  statusText: { color: colors.textSecondary, fontSize: 11.5 },
});