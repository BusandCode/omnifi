import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function RequestMoneyHeader() {
  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.iconBtn, styles.left]} hitSlop={8}>
          <Ionicons name="chevron-back" size={18} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Request Money</Text>
        <TouchableOpacity style={[styles.iconBtn, styles.right]}>
          <Ionicons name="help-circle-outline" size={17} color={colors.primaryLight} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Request money from anyone</Text>
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
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: { left: 0 },
  right: { right: 0 },
  title: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: 11, textAlign: 'center', marginTop: 3 },
});