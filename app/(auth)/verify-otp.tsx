// app/(auth)/verify-otp.tsx
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../src/theme/colors";
import { useTheme } from "../../src/theme/ThemeContext";

export default function VerifyOtpScreen() {
  const { colors: themeColors } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Text style={[styles.text, { color: themeColors.textPrimary }]}>
        Verify OTP Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 18,
  },
});
