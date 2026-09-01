// app/_layout.tsx
import { Stack } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../src/theme/colors';
import { BalanceProvider } from '../src/store/BalanceContext';

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
      <BalanceProvider>
        <View style={styles.root}>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          />
        </View>
      </BalanceProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});