// app/(auth)/reset-password.tsx
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';

export default function ResetPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reset Password Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 18,
  },
});