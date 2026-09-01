// app/index.tsx
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { colors } from "../src/theme/colors";
import { useAuthStore } from "../src/store/authStore";

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const { isAuthenticated, loadPersistedState, checkLockStatus } = useAuthStore();

  useEffect(() => {
    loadPersistedState().then(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isAuthenticated) {
    if (checkLockStatus()) {
      return <Redirect href="/(auth)/lock" />;
    }
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}