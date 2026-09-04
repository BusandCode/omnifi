import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function ReferEarnHeader() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.iconBtn, { borderColor: themeColors.border }]}
        hitSlop={8}
      >
        <Ionicons name="chevron-back" size={18} color={themeColors.textPrimary} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>Refer & Earn</Text>
      <TouchableOpacity style={[styles.iconBtn, { borderColor: themeColors.border }]}>
        <Ionicons name="information-circle-outline" size={18} color={themeColors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 34, height: 34, borderRadius: 17,
    borderWidth: 1.2,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 15.5, fontWeight: '700' },
});