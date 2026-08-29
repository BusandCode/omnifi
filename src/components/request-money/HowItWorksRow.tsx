import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function HowItWorksRow() {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <View style={styles.iconBox}>
        <Ionicons name="mail" size={17} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>How it works</Text>
        <Text style={styles.sub}>
          We'll send a request and notify the recipient. You'll be notified when they send the money.
        </Text>
      </View>
      <Feather name="chevron-right" size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  textContainer: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  sub: { color: colors.textSecondary, fontSize: 10.5, marginTop: 3, lineHeight: 14.5 },
});