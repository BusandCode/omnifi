import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function ReportIssueHeader() {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()} style={[styles.iconBtn, styles.left]} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.title}>Report an Issue</Text>
      <TouchableOpacity style={[styles.iconBtn, styles.right]}>
        <Ionicons name="headset-outline" size={19} color={colors.primaryLight} />
      </TouchableOpacity>
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
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: { left: 0 },
  right: { right: 0 },
  title: { color: colors.textPrimary, fontSize: 17, fontWeight: '700' },
});