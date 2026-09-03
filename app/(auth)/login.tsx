import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from "react-native";

import { useAuthStore } from "../../src/store/authStore";
import { useTheme } from "../../src/theme/ThemeContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuthenticated } = useAuthStore();
  const { colors: themeColors, mode } = useTheme();
  const styles = getStyles(themeColors);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Missing information", "Please enter your email address.");
      return;
    }

    if (!password) {
      Alert.alert("Missing information", "Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // TODO:
      // Connect your login API here.
      //
      // const response = await login({
      //   email,
      //   password,
      // });

      console.log({
        email,
        password,
      });

      // After successful login, set authenticated
      setAuthenticated({ email, name: "User" });

      // Navigate to LockScreen
      router.replace("/(auth)/lock");
    } catch (error) {
      Alert.alert(
        "Login failed",
        "Unable to log in. Please check your details and try again.",
      );
    } finally {
      setLoading(false);
    }
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

        {/* Centered main content */}
        <View style={styles.mainContent}>
          {/* Header with Logo and Welcome */}
          <View style={styles.header}>
            <View style={styles.headerCol}>
              {/* Logo */}
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
                <Text style={styles.title}>Welcome back! 👋</Text>
                <Text style={styles.subtitle}>
                  Login to your account to continue{"\n"}
                  enjoying seamless payments.
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

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={20} color={themeColors.primaryLight} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor={themeColors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color={themeColors.primaryLight} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={themeColors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                returnKeyType="go"
                onSubmitEditing={handleLogin}
              />
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={10}
                disabled={loading}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={themeColors.primaryLight}
                />
              </Pressable>
            </View>
          </View>

          {/* Forgot Password */}
          <Pressable
            style={styles.forgotButton}
            onPress={() => router.push("/forgot-password")}
            disabled={loading}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>

          {/* Login Button */}
          <Pressable
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </Pressable>
        </View>

        {/* Bottom Section - stays pinned to the bottom */}
        <View style={styles.bottomSection}>
          {/* Security Card */}
          <View style={styles.securityCard}>
            <View style={styles.securityIcon}>
              <Feather name="shield" size={20} color={themeColors.primary} />
            </View>
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Secure & Protected</Text>
              <Text style={styles.securityText}>
                Your data and transactions are protected{"\n"}
                with bank-level encryption.
              </Text>
            </View>
          </View>

          {/* Sign Up */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don&apos;t have an account? </Text>
            <Pressable
              onPress={() => router.push("/create-account")}
              disabled={loading}
            >
              <Text style={styles.signupLink}>Sign up</Text>
            </Pressable>
          </View>
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
      paddingHorizontal: 20,
      paddingTop: Platform.OS === "ios" ? 16 : 14,
      paddingBottom: 20,
    },

    /* Secure Login badge */
    secureLoginRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      alignSelf: "flex-end",
      marginBottom: 12,
    },

    secureLoginText: {
      color: themeColors.primary,
      fontSize: 11,
      fontWeight: "600",
    },

    mainContent: {
      flex: 1,
      justifyContent: "center",
    },

    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },

    logoIcon: {
      width: 44,
      height: 44,
    },

    logoText: {
      width: 110,
      height: 30,
      marginLeft: -23,
      marginTop: 7,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
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

    title: {
      color: themeColors.textPrimary,
      fontSize: 21,
      fontWeight: "700",
      marginBottom: 6,
    },

    subtitle: {
      color: themeColors.textSecondary,
      fontSize: 12,
      lineHeight: 16,
    },

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

    inputGroup: {
      marginBottom: 16,
    },

    label: {
      color: themeColors.textPrimary,
      fontSize: 12,
      fontWeight: "500",
      marginBottom: 6,
    },

    inputContainer: {
      minHeight: 52,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: themeColors.surface,
      borderWidth: 1,
      borderColor: themeColors.border,
      borderRadius: 11,
      paddingHorizontal: 14,
    },

    input: {
      flex: 1,
      color: themeColors.textPrimary,
      fontSize: 13,
      minHeight: 50,
      padding: 0,
    },

    forgotButton: {
      alignSelf: "flex-end",
      marginTop: -2,
      marginBottom: 18,
    },

    forgotText: {
      color: themeColors.primaryLight,
      fontSize: 12,
      fontWeight: "600",
    },

    loginButton: {
      height: 52,
      borderRadius: 12,
      backgroundColor: themeColors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18,
    },

    loginButtonDisabled: {
      opacity: 0.6,
    },

    loginButtonText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
    },

    bottomSection: {
      justifyContent: "flex-end",
    },

    securityCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: themeColors.surface,
      borderWidth: 1,
      borderColor: themeColors.border,
      borderRadius: 14,
      padding: 13,
      marginBottom: 16,
    },

    securityIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(91, 33, 182, 0.15)",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },

    securityContent: {
      flex: 1,
    },

    securityTitle: {
      color: themeColors.textPrimary,
      fontSize: 12,
      fontWeight: "700",
      marginBottom: 3,
    },

    securityText: {
      color: themeColors.textSecondary,
      fontSize: 10,
      lineHeight: 15,
    },

    signupRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 8,
    },

    signupText: {
      color: themeColors.textSecondary,
      fontSize: 12,
    },

    signupLink: {
      color: themeColors.primaryLight,
      fontSize: 12,
      fontWeight: "600",
    },
  });
}