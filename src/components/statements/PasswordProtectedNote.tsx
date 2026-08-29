import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function PasswordProtectedNote() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconBox}>
        <Ionicons name="shield-checkmark" size={14} color={colors.primaryLight} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>All documents are password protected for your security.</Text>
        <Text style={styles.sub}>Your password is your date of birth (DDMMYYYY).</Text>
      </View>
      <View style={styles.lockBox}>
        <Ionicons name="lock-closed" size={14} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: colors.surface,
    borderRadius: 13,
    padding: 10,
    marginBottom:-20
  },
  iconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 9.5, fontWeight: '600', lineHeight: 13 },
  sub: { color: colors.textSecondary, fontSize: 8.5, marginTop: 2 },
  lockBox: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});