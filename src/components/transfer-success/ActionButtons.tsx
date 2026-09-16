// src/components/transfer-success/ActionButtons.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function ActionButtons({ onBackHome }: { onBackHome: () => void }) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={{ gap: 8 }}>
      <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: themeColors.primary }]} onPress={onBackHome}>
        <Feather name="home" size={14} color="#fff" />
        <Text style={styles.primaryText}>Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.secondaryBtn, { borderColor: themeColors.primary }]}>
          <Feather name="grid" size={12} color={themeColors.primaryLight} />
          <Text style={[styles.secondaryText, { color: themeColors.primaryLight }]}>View Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.secondaryBtn, { borderColor: themeColors.primary }]}>
          <Feather name="send" size={12} color={themeColors.primaryLight} />
          <Text style={[styles.secondaryText, { color: themeColors.primaryLight }]}>Send Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  primaryBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6,
    borderRadius: 14, paddingVertical: 12,
  },
  primaryText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 8 },
  secondaryBtn: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5,
    borderWidth: 1.2, borderRadius: 12, paddingVertical: 10,
  },
  secondaryText: { fontSize: 11.5, fontWeight: '600' },
});