// src/components/statements/StatementsHeader.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function StatementsHeader() {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.iconBtn, styles.left, { borderColor: themeColors.primary }]}
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>Statements & Documents</Text>
        <TouchableOpacity style={[styles.iconBtn, styles.right, { borderColor: themeColors.primary }]}>
          <Ionicons name="help-circle-outline" size={19} color={themeColors.primaryLight} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
        View, download and share your account statements and important documents.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconBtn: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: { left: 0 },
  right: { right: 0 },
  title: { fontSize: 16, fontWeight: '700' },
  subtitle: {
    fontSize: 11.5,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 8,
    paddingHorizontal: 20,
  },
});