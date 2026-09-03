import React, { useState } from "react";
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
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
// import { colors } from "../../theme/colors";
import { colors } from "../../src/theme/colors";
import { useTheme } from "../../src/theme/ThemeContext";

type AuthMethod = "email" | "phone";

export default function CreateAccountScreen() {
  const { colors: themeColors } = useTheme();
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
      <View style={styles.content}>
        {/* Header: Logo + Heading beside Illustration */}
        <View style={styles.hero}>
          <View style={styles.heroText}>
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

            <Text style={styles.heading}>Create your account</Text>
            <Text style={styles.description}>
              Join Aurelius and experience{"\n"}seamless payments.
            </Text>
          </View>

          <View style={styles.illustration}>
            <View style={styles.document}>
              <View style={styles.profileCircle}>
                <Feather name="user" size={22} color={colors.primaryLight} />
              </View>

              <View style={styles.illustrationLine} />
              <View style={[styles.illustrationLine, { width: 34 }]} />
              <View style={[styles.illustrationLine, { width: 25 }]} />
            </View>

            <View style={styles.shield}>
              <Feather name="check" size={22} color={colors.primaryLight} />
            </View>
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
                  ? colors.primaryLight
                  : colors.textSecondary
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
                  ? colors.primaryLight
                  : colors.textSecondary
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
      </View>
    </KeyboardAvoidingView>
  );
}

/* --------------------------------
   Reusable Input Component
--------------------------------- */

type InputFieldProps = {
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
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.inputContainer}>
        <Feather name={icon} size={16} color={colors.textSecondary} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />

        {rightIcon && (
          <Pressable onPress={onRightIconPress} hitSlop={10}>
            <Feather name={rightIcon} size={17} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

/* --------------------------------
   Styles
--------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 16 : 14,
    paddingBottom: Platform.OS === "ios" ? 14 : 12,
    justifyContent: "center",
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
    gap: 4,
  },

  logoIcon: {
    width: 46,
    height: 46,
  },

  logoText: {
    width: 120,
    height: 40,
    marginLeft: -14,
  },

  heading: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 24,
    marginBottom: 4,
  },

  description: {
    color: colors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },

  illustration: {
    width: 130,
    height: 140,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  document: {
    width: 88,
    height: 112,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    backgroundColor: "rgba(91, 33, 182, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "5deg" }],
  },

  profileCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(139, 92, 246, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  illustrationLine: {
    width: 50,
    height: 6,
    borderRadius: 5,
    backgroundColor: colors.primaryLight,
    opacity: 0.8,
    marginTop: 5,
  },

  shield: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 60,
    height: 64,
    borderRadius: 17,
    backgroundColor: "rgba(91, 33, 182, 0.9)",
    borderWidth: 2,
    borderColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "5deg" }],
  },

  methodContainer: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 2,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  methodButton: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  methodButtonActive: {
    backgroundColor: "rgba(91, 33, 182, 0.22)",
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },

  methodText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },

  methodTextActive: {
    color: colors.textPrimary,
    fontWeight: "600",
  },

  inputGroup: {
    marginBottom: 10,
  },

  inputLabel: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 5,
  },

  inputContainer: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 12,
    minHeight: 40,
  },

  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 12,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  termsText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 10,
    lineHeight: 15,
  },

  termsLink: {
    color: colors.primaryLight,
    fontWeight: "500",
  },

  createButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  createButtonDisabled: {
    opacity: 0.6,
  },

  createButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  loginLink: {
    color: colors.primaryLight,
    fontSize: 11,
    fontWeight: "600",
  },
});
