// app/wash/_layout.tsx
import { Stack } from 'expo-router';

export default function WashLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}