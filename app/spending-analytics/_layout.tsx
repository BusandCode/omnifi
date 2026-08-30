import { Stack } from 'expo-router';

export default function SpendingAnalyticsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[period]" />
    </Stack>
  );
}