// app/(auth)/verify-otp.tsx
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';

export default function VerifyOtpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verify OTP Screen</Text>
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