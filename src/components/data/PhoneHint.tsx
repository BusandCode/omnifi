import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function PhoneHint() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  text: { color: themeColors.primaryLight, fontSize: 9.5, flex: 1 },
}),
    [themeColors]
  );

  return (
    <View style={styles.row}>
      <Feather name="info" size={11} color={themeColors.primaryLight} />
      <Text style={styles.text}>Ensure the number is correct to avoid failed transactions.</Text>
    </View>
  );
}

