// src/components/transfer-success/SuccessHeader.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function SuccessHeader() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      <View />
      <TouchableOpacity style={styles.shareBtn}>
        <Feather name="share" size={14} color={themeColors.primaryLight} />
        <Text style={[styles.shareText, { color: themeColors.primaryLight }]}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  shareBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  shareText: { fontSize: 13, fontWeight: '600' },
});