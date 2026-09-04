// app/(auth)/forgot-password.tsx

import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../src/theme/colors";
import { useTheme } from "../../src/theme/ThemeContext";

export default function ForgotPasswordScreen() {
  const { colors: themeColors, mode } = useTheme();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email address is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleSendResetLink = async () => {
    if (!validateEmail(email)) {
      return;
    }

    try {
      setLoading(true);

      // TODO: Implement actual reset link sending
      // await sendResetLink({ email });

      Alert.alert(
        "Reset Link Sent",
        "We've sent a password reset link to your email address. Please check your inbox.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(auth)/reset-password"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to send reset link. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetWithPhone = () => {
    Alert.alert(
      "Coming Soon",
      "Phone number reset will be available soon."
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      "Contact Support",
      "Support contact information will be available soon."
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: themeColors.background },
      ]}
      edges={["top", "bottom"]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Feather
                name="arrow-left"
                size={24}
                color={themeColors.textPrimary}
              />
            </Pressable>

            <Text
              style={[
                styles.title,
                { color: themeColors.textPrimary },
              ]}
            >
              Forgot Password
            </Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            {/* Text */}
            <View style={styles.descriptionContainer}>
              <Text
                style={[
                  styles.description,
                  { color: themeColors.textPrimary },
                ]}
              >
                Reset your password securely
              </Text>

              <Text
                style={[
                  styles.subDescription,
                  { color: themeColors.textSecondary },
                ]}
              >
                No worries! Enter the email address linked to your Aurelius
                account and we'll send you a link to reset your password.
              </Text>
            </View>

            {/* Password Illustration */}
            <View style={styles.illustration}>
              <Image
                source={
                  mode === "light"
                    ? require("../../assets/password-light.png")
                    : require("../../assets/password.png")
                }
                style={styles.passwordImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text
              style={[
                styles.label,
                { color: themeColors.textPrimary },
              ]}
            >
              Email Address
            </Text>

            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: themeColors.surface,
                  borderColor: emailError
                    ? "#FF3B30"
                    : themeColors.border,
                },
              ]}
            >
              <Feather
                name="mail"
                size={20}
                color={
                  emailError
                    ? "#FF3B30"
                    : themeColors.primaryLight
                }
              />

              <TextInput
                style={[
                  styles.input,
                  { color: themeColors.textPrimary },
                ]}
                placeholder="Enter your email address"
                placeholderTextColor={themeColors.textSecondary}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);

                  if (emailError) {
                    validateEmail(text);
                  }
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="send"
                onSubmitEditing={handleSendResetLink}
              />
            </View>

            {emailError && (
              <Text style={styles.errorText}>
                {emailError}
              </Text>
            )}
          </View>

          {/* Security Card */}
          <View
            style={[
              styles.securityCard,
              {
                backgroundColor:
                  mode === "light"
                    ? "rgba(91, 33, 182, 0.04)"
                    : "rgba(91, 33, 182, 0.05)",
                borderColor:
                  mode === "light"
                    ? "rgba(91, 33, 182, 0.12)"
                    : "rgba(91, 33, 182, 0.1)",
              },
            ]}
          >
            <View
              style={[
                styles.securityIcon,
                {
                  backgroundColor: "rgba(91, 33, 182, 0.08)",
                },
              ]}
            >
              <Feather
                name="shield"
                size={24}
                color={themeColors.primaryLight}
              />
            </View>

            <View style={styles.securityContent}>
              <Text
                style={[
                  styles.securityTitle,
                  { color: themeColors.textPrimary },
                ]}
              >
                Your security is our priority
              </Text>

              <Text
                style={[
                  styles.securityText,
                  { color: themeColors.textSecondary },
                ]}
              >
                We'll send a secure password reset link to help you
                regain access to your account.
              </Text>
            </View>
          </View>

          {/* Send Reset Link Button */}
          <Pressable
            style={({ pressed }) => [
              styles.sendButton,
              { backgroundColor: themeColors.primary },
              (!email || loading) && styles.sendButtonDisabled,
              pressed && !loading && styles.sendButtonPressed,
            ]}
            onPress={handleSendResetLink}
            disabled={loading || !email}
          >
            <Text style={styles.sendButtonText}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Text>
          </Pressable>

          {/* OR Divider */}
          <View style={styles.dividerContainer}>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: themeColors.border },
              ]}
            />

            <Text
              style={[
                styles.dividerText,
                { color: themeColors.textSecondary },
              ]}
            >
              OR
            </Text>

            <View
              style={[
                styles.dividerLine,
                { backgroundColor: themeColors.border },
              ]}
            />
          </View>

          {/* Alternative Options */}
          <View style={styles.optionsContainer}>
            {/* Reset Using Phone */}
            <Pressable
              style={({ pressed }) => [
                styles.optionButton,
                {
                  backgroundColor: themeColors.surface,
                  borderColor: themeColors.border,
                },
                pressed && styles.optionButtonPressed,
              ]}
              onPress={handleResetWithPhone}
            >
              <View style={styles.optionIcon}>
                <Feather
                  name="phone"
                  size={20}
                  color={themeColors.primary}
                />
              </View>

              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionTitle,
                    { color: themeColors.textPrimary },
                  ]}
                >
                  Reset using Phone Number
                </Text>

                <Text
                  style={[
                    styles.optionSubtext,
                    { color: themeColors.textSecondary },
                  ]}
                >
                  Receive a reset link via SMS
                </Text>
              </View>

              <Feather
                name="chevron-right"
                size={18}
                color={themeColors.textSecondary}
              />
            </Pressable>

            {/* Contact Support */}
            <Pressable
              style={({ pressed }) => [
                styles.optionButton,
                {
                  backgroundColor: themeColors.surface,
                  borderColor: themeColors.border,
                },
                pressed && styles.optionButtonPressed,
              ]}
              onPress={handleContactSupport}
            >
              <View style={styles.optionIcon}>
                <Feather
                  name="headphones"
                  size={20}
                  color={themeColors.primary}
                />
              </View>

              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionTitle,
                    { color: themeColors.textPrimary },
                  ]}
                >
                  Contact Support
                </Text>

                <Text
                  style={[
                    styles.optionSubtext,
                    { color: themeColors.textSecondary },
                  ]}
                >
                  Get help from our support team
                </Text>
              </View>

              <Feather
                name="chevron-right"
                size={18}
                color={themeColors.textSecondary}
              />
            </Pressable>
          </View>

          {/* Back to Login */}
          <View style={styles.loginRow}>
            <Text
              style={[
                styles.loginText,
                { color: themeColors.textSecondary },
              ]}
            >
              Remember your password?{" "}
            </Text>

            <Pressable
              onPress={() => router.replace("/(auth)/login")}
            >
              <Text
                style={[
                  styles.loginLink,
                  { color: themeColors.primaryLight },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    justifyContent: "space-between",
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  backButton: {
    padding: 4,
    marginRight: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  /* Hero Section */
  heroSection: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 100,
  },

  descriptionContainer: {
    flex: 1,
    paddingRight: 8,
  },

  description: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 24,
  },

  subDescription: {
    fontSize: 13,
    lineHeight: 19,
  },

  /* Password Illustration */
  illustration: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  passwordImage: {
    width: 120,
    height: 110,
  },

  /* Email Input */
  inputGroup: {
    marginTop: 4,
  },

  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
  },

  inputContainer: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    fontSize: 14,
    height: 52,
  },

  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
  },

  /* Security Card */
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
  },

  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },

  securityText: {
    fontSize: 11,
    lineHeight: 15,
  },

  /* Send Button */
  sendButton: {
    height: 52,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  sendButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  sendButtonDisabled: {
    opacity: 0.6,
  },

  sendButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  /* Divider */
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dividerLine: {
    flex: 1,
    height: 1,
  },

  dividerText: {
    fontSize: 12,
    fontWeight: "500",
    paddingHorizontal: 16,
  },

  /* Options */
  optionsContainer: {
    gap: 8,
  },

  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },

  optionButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  optionIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(91, 33, 182, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  optionContent: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },

  optionSubtext: {
    fontSize: 11,
  },

  /* Login */
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    fontSize: 14,
  },

  loginLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});