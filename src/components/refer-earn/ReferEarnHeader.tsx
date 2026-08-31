import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function ReferEarnHeader() {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
        <Ionicons name="chevron-back" size={18} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Refer & Earn</Text>
      <TouchableOpacity style={styles.iconBtn}>
        <Ionicons name="information-circle-outline" size={18} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 34, height: 34, borderRadius: 17,
    borderWidth: 1.2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 15.5, fontWeight: '700' },
});
