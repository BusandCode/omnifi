// app/(auth)/reset-password.tsx
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../src/theme/colors";
import { useTheme } from "../../src/theme/ThemeContext";

export default function ResetPasswordScreen() {
  const { colors: themeColors } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Text style={[styles.text, { color: themeColors.textPrimary }]}>
        Reset Password Screen
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
