import { Stack } from 'expo-router';

export default function WithdrawLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="bank-details" />
      <Stack.Screen name="review" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}