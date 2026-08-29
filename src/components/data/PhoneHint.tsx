import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function PhoneHint() {
  return (
    <View style={styles.row}>
      <Feather name="info" size={11} color={colors.primaryLight} />
      <Text style={styles.text}>Ensure the number is correct to avoid failed transactions.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  text: { color: colors.primaryLight, fontSize: 9.5, flex: 1 },
});