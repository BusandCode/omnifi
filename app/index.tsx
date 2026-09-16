// app/index.tsx
import { Redirect } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RefreshCw, ShieldCheck, TrendingUp, Wallet } from "lucide-react-native";
import { useTheme } from "../src/theme/ThemeContext";
import { useAuthStore } from "../src/store/authStore";

const { width, height } = Dimensions.get("window");

// Splash stays visible at least this long so the brand doesn't just flash by,
// even if auth state resolves instantly.
const MIN_DISPLAY_MS = 7000;

export default function Index() {
  const { colors: themeColors, mode } = useTheme();
  const { isAuthenticated, loadPersistedState, checkLockStatus } = useAuthStore();

  const [isReady, setIsReady] = useState(false);
  const isDark = mode === "dark";

  const splashBackground = isDark ? "#010010" : themeColors.background;

 const FEATURES = [
  { icon: Wallet, label: "PAY", color: themeColors.primary },
  { icon: TrendingUp, label: "INVEST", color: "#F97316" },
  { icon: RefreshCw, label: "TRADE", color: themeColors.primary },
  { icon: ShieldCheck, label: "SECURE", color: "#F97316" },
];

  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current; 
  const cityOpacity = useRef(new Animated.Value(0)).current;
  const cityTranslate = useRef(new Animated.Value(16)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const minDelay = new Promise((resolve) => setTimeout(resolve, MIN_DISPLAY_MS));
    Promise.all([loadPersistedState(), minDelay]).then(() => setIsReady(true));
  }, []);

  useEffect(() => {

    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(cityOpacity, {
          toValue: 1,
          duration: 550,
          useNativeDriver: true,
        }),
        Animated.timing(cityTranslate, {
          toValue: 0,
          duration: 550,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.timing(progress, {
      toValue: 1,
      duration: MIN_DISPLAY_MS,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  if (isReady) {
    if (isAuthenticated) {
      if (checkLockStatus()) {
        return <Redirect href="/(auth)/lock" />;
      }
      return <Redirect href="/(tabs)" />;
    }
    return <Redirect href="/(auth)/login" />;
  }

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.container, { backgroundColor: splashBackground }]}>
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Image
          source={
            isDark
              ? require("../assets/logo.png")
              : require("../assets/logo-white.png")
          }
          style={styles.logoMark}
          resizeMode="contain"
        />
        <Animated.View style={{ opacity: contentOpacity }}>
          <Image
            source={
              isDark
                ? require("../assets/logo-text.png")
                : require("../assets/logo-text-white.png")
            }
            style={styles.wordmark}
            resizeMode="contain"
          />
        </Animated.View>
      </Animated.View>

      <Animated.Text
        style={[styles.tagline, { opacity: contentOpacity, color: themeColors.textSecondary }]}
      >
        One App. Every Money Move.
      </Animated.Text>

      <Animated.View style={[styles.featureRow, { opacity: contentOpacity }]}>
        {FEATURES.map(({ icon: Icon, label, color }) => (
          <View key={label} style={styles.featureItem}>
            <View style={[styles.featureIconWrap, { backgroundColor: themeColors.primaryTint }]}>
              <Icon size={24} color={color} strokeWidth={2} />
            </View>
            <Text style={[styles.featureLabel, { color: themeColors.textSecondary }]}>
              {label}
            </Text>
          </View>
        ))}
      </Animated.View>

      <Animated.View
        style={[
          styles.cityWrap,
          { opacity: cityOpacity, transform: [{ translateY: cityTranslate }] },
        ]}
        pointerEvents="none"
      >
        <Image
          source={
            isDark
              ? require("../assets/logo-splash.jpeg")
              : require("../assets/logo-splash-light.png")
          }
          style={styles.cityImage}
          resizeMode={isDark ? "cover" : "contain"}
        />
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.securityRow}>
          <ShieldCheck size={16} color={themeColors.primary} strokeWidth={2} />
          <Text style={[styles.securityText, { color: themeColors.textSecondary }]}>
            Bank-level security for your peace of mind
          </Text>
        </View>

        <View style={[styles.loaderTrack, { backgroundColor: themeColors.border }]}>
          <Animated.View
            style={[styles.loaderBar, { width: barWidth, backgroundColor: themeColors.primary }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "18%",
    overflow: "hidden",

  },
  logoWrap: {
    alignItems: "center",
  },
  logoMark: {
    width: 84,
    height: 84,
    // marginBottom: -2,
    // marginBottom: 20,
  },
  wordmark: {
    width: 200,
    height: 58,
    marginTop:-10
  },
  tagline: {
    marginTop: 16,
    fontSize: 14,
  },
  featureRow: {
    flexDirection: "row",
    marginTop: 34,
    gap: 36,
  },
  featureItem: {
    alignItems: "center",
  },
  featureIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  featureLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },
  cityWrap: {
    marginTop: 16,
    width,
    height: height * 0.45,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  cityImage: {
    width: "100%",
    height: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 48,
    width: width * 0.8,
    alignItems: "center",
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 18,
  },
  securityText: {
    fontSize: 12,
  },
  loaderTrack: {
    width: "100%",
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  loaderBar: {
    height: "100%",
    borderRadius: 2,
  },
});