import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function HistoryHeader() {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Transaction History</Text>
      <TouchableOpacity style={styles.iconBtn} hitSlop={8}>
        <Feather name="filter" size={16} color={colors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 1.2, borderColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 17, fontWeight: '700' },
});