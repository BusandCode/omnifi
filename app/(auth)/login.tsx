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

import { colors } from "../../src/theme/colors";
import { useAuthStore } from "../../src/store/authStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuthenticated } = useAuthStore();

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
        "Unable to log in. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
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
        {/* Centered main content */}
        <View style={styles.mainContent}>
          {/* Header with Logo and Welcome */}
          <View style={styles.header}>
            <View style={styles.headerCol}>
              {/* Logo */}
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
                <Text style={styles.title}>Welcome back! 👋</Text>
                <Text style={styles.subtitle}>
                  Login to your account to continue{"\n"}
                  enjoying seamless payments.
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

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Feather
                name="mail"
                size={20}
                color={colors.primaryLight}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor={colors.textSecondary}
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
              <Feather
                name="lock"
                size={20}
                color={colors.primaryLight}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={colors.textSecondary}
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
                  color={colors.primaryLight}
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
            style={[
              styles.loginButton,
              loading && styles.loginButtonDisabled,
            ]}
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
              <Feather
                name="shield"
                size={30}
                color={colors.primaryLight}
              />
            </View>
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>
                Secure & Protected
              </Text>
              <Text style={styles.securityText}>
                Your data and transactions are protected{"\n"}
                with bank-level encryption.
              </Text>
            </View>
          </View>

          {/* Sign Up */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>
              Don't have an account?{" "}
            </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 20,
  },

  mainContent: {
    flex: 1,
    justifyContent: "center",
  },

  logoContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 4,
  },

  logoIcon: {
    width: 60,
    height: 60,
    marginLeft: -10,
  },

  logoText: {
    width: 120,
    height: 40,
    marginTop: 8,
    marginLeft: -24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    minHeight: 160,
  },

  headerCol: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerText: {
    flex: 1,
    paddingRight: 10,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    marginBottom: 4,
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  illustration: {
    width: 100,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  lockShackle: {
    position: "absolute",
    top: 4,
    width: 48,
    height: 50,
    borderRadius: 24,
    borderWidth: 7,
    borderColor: colors.primaryLight,
    borderBottomColor: "transparent",
  },

  lockBody: {
    width: 72,
    height: 66,
    borderRadius: 11,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  keyhole: {
    width: 14,
    height: 21,
    borderRadius: 7,
    backgroundColor: colors.background,
  },

  glowCircle: {
    position: "absolute",
    bottom: 2,
    width: 88,
    height: 16,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    opacity: 0.4,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 6,
  },

  inputContainer: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 11,
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    color: colors.textPrimary,
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
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: "600",
  },

  loginButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primary,
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 13,
    marginBottom: 16,
  },

  securityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(91, 33, 182, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 3,
  },

  securityText: {
    color: colors.textSecondary,
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
    color: colors.textSecondary,
    fontSize: 12,
  },

  signupLink: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: "600",
  },
});