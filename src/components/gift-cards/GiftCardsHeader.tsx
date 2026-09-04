// src/components/gift-cards/GiftCardsHeader.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function GiftCardsHeader() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.iconBtn, { borderColor: themeColors.primary }]}
        hitSlop={8}
      >
        <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>Gift Cards</Text>
      <TouchableOpacity style={[styles.iconBtn, { borderColor: themeColors.primary }]}>
        <Ionicons name="help-circle-outline" size={19} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 1.2,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 16, fontWeight: '700' },
});