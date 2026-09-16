import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function ResponseTimeNote() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: themeColors.surface,
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
  text: { flex: 1, color: themeColors.textSecondary, fontSize: 11, lineHeight: 15.5 },
}),
    [themeColors]
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconBox}>
        <Ionicons name="information-circle" size={16} color={themeColors.primaryLight} />
      </View>
      <Text style={styles.text}>
        Our support team usually responds within 24 hours (Excluding weekends and public holidays).
      </Text>
    </View>
  );
}

