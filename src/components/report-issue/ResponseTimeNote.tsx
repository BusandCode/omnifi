import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function ResponseTimeNote() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconBox}>
        <Ionicons name="information-circle" size={16} color={colors.primaryLight} />
      </View>
      <Text style={styles.text}>
        Our support team usually responds within 24 hours (Excluding weekends and public holidays).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom:-2
  },
  iconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  text: { flex: 1, color: colors.textSecondary, fontSize: 11, lineHeight: 15.5 },
});