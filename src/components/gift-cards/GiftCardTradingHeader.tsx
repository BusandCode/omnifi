import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function GiftCardTradingHeader() {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Gift Card Trading</Text>
      <TouchableOpacity style={styles.iconBtn}>
        <Ionicons name="help-circle-outline" size={19} color={colors.primaryLight} />
      </TouchableOpacity>
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
  title: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
});