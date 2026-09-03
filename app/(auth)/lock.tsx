// app/(auth)/lock.tsx
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { useTheme } from "../../src/theme/ThemeContext";

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
  const { colors: themeColors, mode } = useTheme();
  const styles = getStyles(themeColors);

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
            color={isLocked ? themeColors.textSecondary : themeColors.textPrimary}
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
          style={[styles.keypadKeyText, isLocked && styles.keypadKeyDisabled]}
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
      style={[styles.container, { backgroundColor: themeColors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        bounces={false}
      >
        {/* Secure Login badge */}
        <View style={styles.secureLoginRow}>
          <Feather name="shield" size={12} color={themeColors.primary} />
          <Text style={styles.secureLoginText}>Secure Login</Text>
        </View>

        {/* Logo, Welcome text & Lock Illustration */}
        <View style={styles.header}>
          <View style={styles.headerCol}>
            <View style={styles.logoContainer}>
              <Image
                source={
                  mode === "light"
                    ? require("../../assets/logo-white.png")
                    : require("../../assets/logo.png")
                }
                style={styles.logoIcon}
                resizeMode="contain"
              />
              <Image
                source={
                  mode === "light"
                    ? require("../../assets/logo-text-white.png")
                    : require("../../assets/logo-text.png")
                }
                style={styles.logoText}
                resizeMode="contain"
              />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Welcome back! 👋</Text>
              <Text style={styles.subtitle}>
                Login securely with your PIN{"\n"}to continue
              </Text>
            </View>
          </View>

          {/* Lock Illustration */}
          <View style={styles.illustration}>
            <Image
              source={
                mode === "light"
                  ? require("../../assets/lock-light.png")
                  : require("../../assets/lock.png")
              }
              style={styles.lockImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* PIN Input */}
        <View style={styles.pinContainer}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Text style={styles.pinHint}>
              {isLocked ? `Locked for ${lockTimer}s` : "Enter your 4-digit PIN"}
            </Text>
          )}
          <View style={styles.pinDotsContainer}>{renderPinDots()}</View>
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
          <View style={styles.biometricIconBubble}>
            <MaterialCommunityIcons
              name="fingerprint"
              size={22}
              color={isLocked ? themeColors.textSecondary : themeColors.primary}
            />
          </View>
          <View style={styles.biometricTextCol}>
            <Text
              style={[
                styles.biometricText,
                isLocked && styles.biometricTextDisabled,
              ]}
            >
              Login with Biometrics
            </Text>
            <Text
              style={[
                styles.biometricSubtext,
                isLocked && styles.biometricTextDisabled,
              ]}
            >
              Use fingerprint or face ID
            </Text>
          </View>
          <Feather
            name="chevron-right"
            size={18}
            color={themeColors.textSecondary}
          />
        </Pressable>

        {/* Sign Up Link */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don&apos;t have an account? </Text>
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

function getStyles(themeColors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
    },

    content: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingTop: Platform.OS === "ios" ? 16 : 12,
      paddingBottom: 20,
      alignItems: "center",
      justifyContent: "space-between",
    },

    /* Secure Login badge */
    secureLoginRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      alignSelf: "flex-end",
      marginBottom: 4,
    },

    secureLoginText: {
      color: themeColors.primary,
      fontSize: 11,
      fontWeight: "600",
    },

    /* Header */
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingTop: 10,
      marginTop: 20,
      minHeight: 130,
    },

    headerCol: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      flex: 1,
    },

    headerText: {
      paddingRight: 10,
    },

    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },

    logoIcon: {
      width: 44,
      height: 44,
      marginBottom: 2,
    },

    logoText: {
      width: 110,
      height: 30,
      marginLeft: -23,
      marginTop: 7,
    },

    welcomeText: {
      color: themeColors.textPrimary,
      fontSize: 21,
      fontWeight: "700",
      marginBottom: 6,
      textAlign: "left",
    },

    subtitle: {
      color: themeColors.textSecondary,
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

    lockImage: {
      width: 150,
      height: 140,
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
      paddingVertical: 10,
    },

    pinDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      borderWidth: 2.5,
      borderColor: themeColors.border,
      backgroundColor: "transparent",
    },

    pinDotFilled: {
      borderColor: themeColors.primary,
      backgroundColor: themeColors.primary,
    },

    pinDotError: {
      borderColor: "#FF3B30",
    },

    pinHint: {
      color: themeColors.textPrimary,
      fontSize: 14,
      fontWeight: "600",
    },

    errorText: {
      color: "#FF3B30",
      fontSize: 13,
      fontWeight: "600",
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
      color: themeColors.primaryLight,
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
      backgroundColor: themeColors.surface,
      borderWidth: 1,
      borderColor: themeColors.border,
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
      backgroundColor: themeColors.border,
      transform: [{ scale: 0.92 }],
    },

    keypadKeyText: {
      color: themeColors.textPrimary,
      fontSize: 24,
      fontWeight: "600",
      includeFontPadding: false,
    },

    keypadKeyLetters: {
      color: themeColors.textSecondary,
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
      backgroundColor: themeColors.border,
    },

    dividerText: {
      color: themeColors.textSecondary,
      fontSize: 11,
      paddingHorizontal: 10,
      fontWeight: "500",
    },

    /* Biometric */
    biometricButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      width: "100%",
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 14,
      backgroundColor: themeColors.surface,
      borderWidth: 1,
      borderColor: themeColors.border,
      marginBottom: 20,
    },

    biometricButtonPressed: {
      backgroundColor: themeColors.border,
      transform: [{ scale: 0.98 }],
    },

    biometricIconBubble: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(91, 33, 182, 0.15)",
    },

    biometricTextCol: {
      flex: 1,
    },

    biometricText: {
      color: themeColors.textPrimary,
      fontSize: 13,
      fontWeight: "700",
    },

    biometricSubtext: {
      color: themeColors.textSecondary,
      fontSize: 10.5,
      marginTop: 2,
    },

    biometricTextDisabled: {
      opacity: 0.4,
    },

    /* Sign Up */
    signupRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 4,
    },

    signupText: {
      color: themeColors.textSecondary,
      fontSize: 11,
    },

    signupLink: {
      color: themeColors.primaryLight,
      fontSize: 11,
      fontWeight: "600",
    },
  });
}