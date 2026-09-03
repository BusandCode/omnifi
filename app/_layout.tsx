// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BalanceProvider } from "../src/store/BalanceContext";
import { colors } from "../src/theme/colors";
import { ThemeProvider, useTheme } from "../src/theme/ThemeContext";

// Default props for Text and TextInput
(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.style = [
  { includeFontPadding: false },
  (Text as any).defaultProps.style,
];

(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.style = [
  { includeFontPadding: false },
  (TextInput as any).defaultProps.style,
];

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <BalanceProvider>
          <AppShell />
        </BalanceProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppShell() {
  const { colors, mode } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style={mode === "light" ? "dark" : "light"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
