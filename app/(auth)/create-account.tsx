import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "../../src/theme/ThemeContext";

type AuthMethod = "email" | "phone";

export default function CreateAccountScreen() {
  const { colors: themeColors, mode } = useTheme();
  const styles = getStyles(themeColors);

  const [authMethod, setAuthMethod] = useState<AuthMethod>("email");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (!fullName.trim()) {
      Alert.alert("Missing information", "Please enter your full name.");
      return;
    }

    if (authMethod === "email" && !email.trim()) {
      Alert.alert("Missing information", "Please enter your email address.");
      return;
    }

    if (authMethod === "phone" && !phone.trim()) {
      Alert.alert("Missing information", "Please enter your phone number.");
      return;
    }

    if (!password) {
      Alert.alert("Missing information", "Please create a password.");
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Weak password",
        "Your password must be at least 8 characters long.",
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords don't match",
        "Please make sure your passwords match.",
      );
      return;
    }

    if (!agreedToTerms) {
      Alert.alert(
        "Terms required",
        "Please agree to the Terms of Service and Privacy Policy.",
      );
      return;
    }

    try {
      setLoading(true);

      // TODO:
      // Call your signup API here.
      //
      // Example:
      // await register({
      //   fullName,
      //   email,
      //   phone,
      //   password,
      // });

      console.log({
        fullName,
        email: authMethod === "email" ? email : undefined,
        phone: authMethod === "phone" ? phone : undefined,
        password,
      });

      Alert.alert(
        "Account created",
        "Your account has been created successfully.",
      );

      // router.replace("/login");
    } catch (error) {
      Alert.alert(
        "Something went wrong",
        "We couldn't create your account. Please try again.",
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
        {/* Secure Signup badge */}
        {/* <View style={styles.secureLoginRow}>
          <Feather name="shield" size={12} color={themeColors.primary} />
          <Text style={styles.secureLoginText}>Secure Signup</Text>
        </View> */}

        {/* Header: Logo + Heading beside Illustration */}
        <View style={styles.hero}>
          <View style={styles.heroText}>
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

            <Text style={styles.heading}>Create your account</Text>
            <Text style={styles.description}>
              Join Omnifi and experience{"\n"}seamless payments.
            </Text>
          </View>

          <View style={styles.illustration}>
            <Image
              source={
                mode === "light"
                  ? require("../../assets/create-light.png")
                  : require("../../assets/create.png")
              }
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Auth Method */}
        <View style={styles.methodContainer}>
          <Pressable
            onPress={() => setAuthMethod("email")}
            style={[
              styles.methodButton,
              authMethod === "email" && styles.methodButtonActive,
            ]}
          >
            <Feather
              name="mail"
              size={15}
              color={
                authMethod === "email"
                  ? themeColors.primaryLight
                  : themeColors.textSecondary
              }
            />

            <Text
              style={[
                styles.methodText,
                authMethod === "email" && styles.methodTextActive,
              ]}
            >
              Email
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setAuthMethod("phone")}
            style={[
              styles.methodButton,
              authMethod === "phone" && styles.methodButtonActive,
            ]}
          >
            <Feather
              name="phone"
              size={15}
              color={
                authMethod === "phone"
                  ? themeColors.primaryLight
                  : themeColors.textSecondary
              }
            />

            <Text
              style={[
                styles.methodText,
                authMethod === "phone" && styles.methodTextActive,
              ]}
            >
              Phone Number
            </Text>
          </Pressable>
        </View>

        {/* Full Name */}
        <InputField
          themeColors={themeColors}
          label="Full Name"
          icon="user"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

        {/* Email / Phone */}
        {authMethod === "email" ? (
          <InputField
            themeColors={themeColors}
            label="Email Address"
            icon="mail"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        ) : (
          <InputField
            themeColors={themeColors}
            label="Phone Number"
            icon="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        )}

        {/* Password */}
        <InputField
          themeColors={themeColors}
          label="Create Password"
          icon="lock"
          placeholder="Create a strong password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          rightIcon={showPassword ? "eye-off" : "eye"}
          onRightIconPress={() => setShowPassword(!showPassword)}
          autoCapitalize="none"
        />

        {/* Confirm Password */}
        <InputField
          themeColors={themeColors}
          label="Confirm Password"
          icon="lock"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          rightIcon={showConfirmPassword ? "eye-off" : "eye"}
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          autoCapitalize="none"
        />

        {/* Terms */}
        <Pressable
          style={styles.termsRow}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
        >
          <View
            style={[styles.checkbox, agreedToTerms && styles.checkboxActive]}
          >
            {agreedToTerms && <Feather name="check" size={12} color="#fff" />}
          </View>

          <Text style={styles.termsText}>
            I agree to the{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </Pressable>

        {/* Create Account */}
        <Pressable
          style={[styles.createButton, loading && styles.createButtonDisabled]}
          onPress={handleCreateAccount}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>
            {loading ? "Creating Account..." : "Create Account"}
          </Text>
        </Pressable>

        {/* Login */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>

          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}>Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* --------------------------------
   Reusable Input Component
--------------------------------- */

type InputFieldProps = {
  themeColors: any;
  label: string;
  icon: keyof typeof Feather.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
  rightIcon?: keyof typeof Feather.glyphMap;
  onRightIconPress?: () => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
};

function InputField({
  themeColors,
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  rightIcon,
  onRightIconPress,
  autoCapitalize = "sentences",
  autoCorrect = true,
}: InputFieldProps) {
  const styles = getStyles(themeColors);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.inputContainer}>
        <Feather name={icon} size={16} color={themeColors.textSecondary} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={themeColors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />

        {rightIcon && (
          <Pressable onPress={onRightIconPress} hitSlop={10}>
            <Feather
              name={rightIcon}
              size={17}
              color={themeColors.textSecondary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

/* --------------------------------
   Styles
--------------------------------- */

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
      paddingBottom: Platform.OS === "ios" ? 14 : 12,
      justifyContent: "center",
    },

    /* Secure Signup badge */
    secureLoginRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      alignSelf: "flex-end",
      marginBottom: 8,
    },

    secureLoginText: {
      color: themeColors.primary,
      fontSize: 12,
      fontWeight: "600",
    },

    hero: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },

    heroText: {
      flex: 1,
      paddingRight: 10,
    },

    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },

    logoIcon: {
      width: 50,
      height: 50,
    },

    logoText: {
      width: 124,
      height: 34,
      marginLeft: -26,
      marginTop: 8,
    },

    heading: {
      color: themeColors.textPrimary,
      fontSize: 23,
      fontWeight: "700",
      marginBottom: 6,
    },

    description: {
      color: themeColors.textSecondary,
      fontSize: 13,
      lineHeight: 18,
    },

    illustration: {
      width: 145,
      height: 155,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },

    illustrationImage: {
      width: 145,
      height: 155,
    },

    methodContainer: {
      flexDirection: "row",
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      padding: 2,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: themeColors.border,
    },

    methodButton: {
      flex: 1,
      height: 44,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
    },

    methodButtonActive: {
      backgroundColor: "rgba(91, 33, 182, 0.22)",
      borderWidth: 1,
      borderColor: themeColors.primaryLight,
    },

    methodText: {
      color: themeColors.textSecondary,
      fontSize: 13,
      fontWeight: "500",
    },

    methodTextActive: {
      color: themeColors.textPrimary,
      fontWeight: "600",
    },

    inputGroup: {
      marginBottom: 10,
    },

    inputLabel: {
      color: themeColors.textPrimary,
      fontSize: 12,
      fontWeight: "500",
      marginBottom: 5,
    },

    inputContainer: {
      minHeight: 48,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: themeColors.surface,
      borderWidth: 1,
      borderColor: themeColors.border,
      borderRadius: 10,
      paddingHorizontal: 12,
    },

    input: {
      flex: 1,
      color: themeColors.textPrimary,
      fontSize: 13.5,
      minHeight: 46,
    },

    termsRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 2,
      marginBottom: 12,
    },

    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: themeColors.border,
      backgroundColor: themeColors.surface,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },

    checkboxActive: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
    },

    termsText: {
      flex: 1,
      color: themeColors.textSecondary,
      fontSize: 11,
      lineHeight: 16,
    },

    termsLink: {
      color: themeColors.primaryLight,
      fontWeight: "500",
    },

    createButton: {
      height: 52,
      borderRadius: 12,
      backgroundColor: themeColors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },

    createButtonDisabled: {
      opacity: 0.6,
    },

    createButtonText: {
      color: "#fff",
      fontSize: 14.5,
      fontWeight: "700",
    },

    loginRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    loginText: {
      color: themeColors.textSecondary,
      fontSize: 12,
    },

    loginLink: {
      color: themeColors.primaryLight,
      fontSize: 12,
      fontWeight: "600",
    },
  });
}