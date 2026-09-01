import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default function WithdrawHeader({ onBack }: { onBack?: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack ?? (() => router.back())} style={styles.iconButton}>
        <Feather name="chevron-left" size={22} color={colors.textPrimary} />
      </Pressable>
      <Text style={styles.title}>Withdraw Funds</Text>
      <Pressable style={styles.iconButton}>
        <Feather name="shield" size={18} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
});