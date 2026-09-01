// app/(auth)/lock.tsx
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuthStore } from "../../src/store/authStore";
import { colors } from "../../src/theme/colors";

const PIN_LENGTH = 4;
const KEYPAD_MAX_WIDTH = 280;
const KEYPAD_GAP = 14;
const KEY_SIZE = (KEYPAD_MAX_WIDTH - KEYPAD_GAP * 2) / 3;
const CORRECT_PIN = "1234";

export default function LockScreen() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const { setLastActivity } = useAuthStore();

  // Auto-lock after 5 failed attempts
  const MAX_ATTEMPTS = 5;
  const LOCK_DURATION = 30; // seconds

  // Handle PIN input
  const handlePinPress = (value: string) => {
    if (isLocked) return;
    if (pin.length < PIN_LENGTH) {
      setPin((prev) => prev + value);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (isLocked) return;
    setPin((prev) => prev.slice(0, -1));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Handle PIN verification
  const handleVerifyPin = async () => {
    if (pin.length !== PIN_LENGTH) {
      setError("Please enter your 4-digit PIN");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    if (isLocked) {
      Alert.alert(
        "Account Locked",
        `Please wait ${lockTimer} seconds before trying again.`,
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Hardcoded PIN verification
      const isValid = pin === CORRECT_PIN;

      if (isValid) {
        // Success
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setAttempts(0);
        setLastActivity();
        router.replace("/(tabs)");
      } else {
        // Failed attempt
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setError(
          `Incorrect PIN. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`,
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setPin("");

        // Check if max attempts reached
        if (newAttempts >= MAX_ATTEMPTS) {
          setIsLocked(true);
          setLockTimer(LOCK_DURATION);
          Alert.alert(
            "Too Many Attempts",
            `Your account has been locked for ${LOCK_DURATION} seconds. Please try again later.`,
          );

          // Start countdown timer
          const timer = setInterval(() => {
            setLockTimer((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                setIsLocked(false);
                setAttempts(0);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    } catch (error) {
      Alert.alert(
        "Verification failed",
        "Unable to verify PIN. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Auto-verify when PIN reaches length
  useEffect(() => {
    if (pin.length === PIN_LENGTH && !isLocked) {
      handleVerifyPin();
    }
  }, [pin]);

  // Render PIN dots
  const renderPinDots = () => {
    const dots = [];
    for (let i = 0; i < PIN_LENGTH; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.pinDot,
            i < pin.length && styles.pinDotFilled,
            error && styles.pinDotError,
          ]}
        />,
      );
    }
    return dots;
  };

  // Keypad layout: 3x3 grid of digits, then a final row with just 0 and delete
  const numericKeys = [
    { key: "1", letters: "ABC" },
    { key: "2", letters: "DEF" },
    { key: "3", letters: "GHI" },
    { key: "4", letters: "JKL" },
    { key: "5", letters: "MNO" },
    { key: "6", letters: "PORS" },
    { key: "7", letters: "TUV" },
    { key: "8", letters: "WXYZ" },
    { key: "9", letters: "" },
  ];

  const renderKey = (item: { key: string; letters: string }) => {
    if (item.key === "") {
      return <View key="spacer" style={styles.keypadKeySpacer} />;
    }

    if (item.key === "delete") {
      return (
        <Pressable
          key="delete"
          style={({ pressed }) => [
            styles.keypadKey,
            styles.keypadKeyDelete,
            pressed && styles.keypadKeyPressed,
          ]}
          onPress={handleDelete}
          disabled={isLocked}
        >
          <Feather
            name="delete"
            size={20}
            color={isLocked ? colors.textSecondary : colors.textPrimary}
          />
        </Pressable>
      );
    }

    return (
      <Pressable
        key={item.key}
        style={({ pressed }) => [
          styles.keypadKey,
          pressed && styles.keypadKeyPressed,
        ]}
        onPress={() => handlePinPress(item.key)}
        disabled={isLocked}
      >
        <Text
          style={[
            styles.keypadKeyText,
            isLocked && styles.keypadKeyDisabled,
          ]}
        >
          {item.key}
        </Text>
        {item.letters && (
          <Text
            style={[
              styles.keypadKeyLetters,
              isLocked && styles.keypadKeyDisabled,
            ]}
          >
            {item.letters}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        bounces={false}
      >
        {/* Logo, Welcome text & Lock Illustration */}
        <View style={styles.header}>
          <View style={styles.headerCol}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logoIcon}
                resizeMode="contain"
              />
              <Image
                source={require("../../assets/logo-text.png")}
                style={styles.logoText}
                resizeMode="contain"
              />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Welcome back! 🎉</Text>
              <Text style={styles.subtitle}>
                Login securely with your PIN{"\n"}to continue
              </Text>
            </View>
          </View>

          {/* Lock Illustration */}
          <View style={styles.illustration}>
            <View style={styles.lockShackle} />
            <View style={styles.lockBody}>
              <View style={styles.keyhole} />
            </View>
            <View style={styles.glowCircle} />
          </View>
        </View>

        {/* PIN Input */}
        <View style={styles.pinContainer}>
          <View style={styles.pinDotsContainer}>{renderPinDots()}</View>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Text style={styles.pinHint}>
              {isLocked ? `Locked for ${lockTimer}s` : "Enter your 4-digit PIN"}
            </Text>
          )}
        </View>

        {/* Forgot PIN */}
        <Pressable
          style={({ pressed }) => [
            styles.forgotButton,
            pressed && styles.forgotButtonPressed,
          ]}
          onPress={() => router.push("/(auth)/forgot-pin")}
          disabled={isLocked}
        >
          <Text style={styles.forgotText}>Forgot PIN?</Text>
        </Pressable>

        {/* PIN Keypad */}
        <View style={styles.keypad}>
          <View style={styles.keypadRow}>
            {numericKeys.slice(0, 3).map(renderKey)}
          </View>
          <View style={styles.keypadRow}>
            {numericKeys.slice(3, 6).map(renderKey)}
          </View>
          <View style={styles.keypadRow}>
            {numericKeys.slice(6, 9).map(renderKey)}
          </View>
          <View style={styles.keypadRow}>
            {renderKey({ key: "", letters: "" })}
            {renderKey({ key: "0", letters: "" })}
            {renderKey({ key: "delete", letters: "" })}
          </View>
        </View>

        {/* Biometric Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Biometric Login */}
        <Pressable
          style={({ pressed }) => [
            styles.biometricButton,
            pressed && styles.biometricButtonPressed,
          ]}
          onPress={async () => {
            try {
              setLoading(true);
              Alert.alert(
                "Biometric",
                "Biometric authentication not implemented yet.",
              );
            } catch (error) {
              Alert.alert(
                "Biometric Error",
                "Unable to authenticate with biometrics.",
              );
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading || isLocked}
        >
          <Feather
            name="smartphone"
            size={20}
            color={isLocked ? colors.textSecondary : colors.primary}
          />
          <Text
            style={[
              styles.biometricText,
              isLocked && styles.biometricTextDisabled,
            ]}
          >
            Login with Biometrics
          </Text>
        </Pressable>

        <Text
          style={[
            styles.biometricSubtext,
            isLocked && styles.biometricTextDisabled,
          ]}
        >
          Use fingerprint or face ID
        </Text>

        {/* Sign Up Link */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Pressable
            onPress={() => router.push("/(auth)/create-account")}
            disabled={isLocked}
          >
            <Text style={styles.signupLink}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 10,
    // marginBottom: 8,
    marginTop:50,
    minHeight: 130,
  },

  headerCol: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft:10,
    flex: 1,
  },

  headerText: {
    paddingRight: 10,
  },

  logoContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    gap: 4,
  },

  logoIcon: {
    width: 40,
    height: 40,
    marginLeft: -8,
  },

  logoText: {
    width: 90,
    height: 32,
    marginTop: 6,
    marginLeft: -18,
  },

  welcomeText: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "left",
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: "left",
    lineHeight: 16,
  },


   /* Lock Illustration */
  illustration: {
    width: 150,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  lockShackle: {
    position: "absolute",
    top: 6,
    width: 64,
    height: 64,
    borderRadius: 27,
    borderWidth: 8,
    borderColor: colors.primaryLight,
    borderBottomColor: "transparent",
  },

  lockBody: {
    width: 90,
    height: 84,
    borderRadius: 13,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 34,
  },

  keyhole: {
    width: 16,
    height: 23,
    borderRadius: 8,
    backgroundColor: colors.background,
  },

  glowCircle: {
    position: "absolute",
    bottom: 2,
    width: 98,
    height: 18,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    opacity: 0.4,
  },

  /* PIN Input */
  pinContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 6,
  },

  pinDotsContainer: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 8,
  },

  pinDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2.5,
    borderColor: colors.border,
    backgroundColor: "transparent",
  },

  pinDotFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  pinDotError: {
    borderColor: "#FF3B30",
  },

  pinHint: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },

  errorText: {
    color: "#FF3B30",
    fontSize: 11,
    marginTop: 2,
    fontWeight: "500",
  },

  /* Forgot PIN */
  forgotButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 6,
  },

  forgotButtonPressed: {
    opacity: 0.7,
  },

  forgotText: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: "600",
  },

  /* Keypad - Smaller Circular */
  keypad: {
    width: "100%",
    maxWidth: KEYPAD_MAX_WIDTH,
    alignItems: "center",
    gap: KEYPAD_GAP,
    marginBottom: 6,
  },

  keypadRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: KEYPAD_GAP,
  },

  keypadKey: {
    width: KEY_SIZE,
    height: KEY_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: KEY_SIZE / 2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  keypadKeySpacer: {
    width: KEY_SIZE,
    height: KEY_SIZE,
  },

  keypadKeyDelete: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },

  keypadKeyPressed: {
    backgroundColor: colors.border,
    transform: [{ scale: 0.92 }],
  },

  keypadKeyText: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "600",
    includeFontPadding: false,
  },

  keypadKeyLetters: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: "500",
    marginTop: 1,
    includeFontPadding: false,
  },

  keypadKeyDisabled: {
    opacity: 0.4,
  },

  /* Divider */
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 180,
    marginBottom: 14,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  dividerText: {
    color: colors.textSecondary,
    fontSize: 11,
    paddingHorizontal: 10,
    fontWeight: "500",
  },

  /* Biometric */
  biometricButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "rgba(91, 33, 182, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(91, 33, 182, 0.15)",
    marginBottom: 2,
  },

  biometricButtonPressed: {
    backgroundColor: "rgba(91, 33, 182, 0.15)",
    transform: [{ scale: 0.97 }],
  },

  biometricText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  biometricTextDisabled: {
    opacity: 0.4,
  },

  biometricSubtext: {
    color: colors.textSecondary,
    fontSize: 10,
    marginBottom: 6,
  },

  /* Sign Up */
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },

  signupText: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  signupLink: {
    color: colors.primaryLight,
    fontSize: 11,
    fontWeight: "600",
  },
});