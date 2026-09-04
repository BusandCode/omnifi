// src/components/betting/BettingFooter.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function BettingFooter() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Feather name="lock" size={10} color={themeColors.textSecondary} />
      <Text style={[styles.text, { color: themeColors.textSecondary }]}>
        {'  '}Secure and encrypted transactions
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  text: { fontSize: 10.5 },
});