// app/(auth)/forgot-password.tsx
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
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
} from 'react-native';
import { colors } from '../../src/theme/colors';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email address is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
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
        'Reset Link Sent',
        'We\'ve sent a password reset link to your email address. Please check your inbox.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(auth)/reset-password'),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to send reset link. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetWithPhone = () => {
    // Navigate to phone reset
    Alert.alert('Coming Soon', 'Phone number reset will be available soon.');
  };

  const handleContactSupport = () => {
    // Navigate to support or open email
    Alert.alert('Contact Support', 'Support contact information will be available soon.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color={colors.textPrimary} />
          </Pressable>
          <Text style={styles.title}>Forgot Password</Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Reset your password securely 🛡️
          </Text>
          <Text style={styles.subDescription}>
            No worries! Enter the email address linked to your Aurelius account and we'll send you a link to reset your password.
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={[
            styles.inputContainer,
            emailError && styles.inputContainerError,
          ]}>
            <Feather
              name="mail"
              size={20}
              color={emailError ? '#FF3B30' : colors.primaryLight}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) validateEmail(text);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="send"
              onSubmitEditing={handleSendResetLink}
            />
          </View>
          {emailError && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
        </View>

        {/* Security Card */}
        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Feather name="shield" size={24} color={colors.primaryLight} />
          </View>
          <View style={styles.securityContent}>
            <Text style={styles.securityTitle}>
              Your security is our priority
            </Text>
            <Text style={styles.securityText}>
              We'll send a secure password reset link to help you regain access to your account.
            </Text>
          </View>
        </View>

        {/* Send Reset Link Button */}
        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            (!email || loading) && styles.sendButtonDisabled,
            pressed && !loading && styles.sendButtonPressed,
          ]}
          onPress={handleSendResetLink}
          disabled={loading || !email}
        >
          <Text style={styles.sendButtonText}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Text>
        </Pressable>

        {/* OR Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Alternative Options */}
        <View style={styles.optionsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.optionButton,
              pressed && styles.optionButtonPressed,
            ]}
            onPress={handleResetWithPhone}
          >
            <View style={styles.optionIcon}>
              <Feather name="phone" size={22} color={colors.primary} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Reset using Phone Number</Text>
              <Text style={styles.optionSubtext}>Receive a reset link via SMS</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.optionButton,
              pressed && styles.optionButtonPressed,
            ]}
            onPress={handleContactSupport}
          >
            <View style={styles.optionIcon}>
              <Feather name="headphones" size={22} color={colors.primary} />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Contact Support</Text>
              <Text style={styles.optionSubtext}>Get help from our support team</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>

        {/* Back to Login */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Remember your password? </Text>
          <Pressable onPress={() => router.replace('/(auth)/login')}>
            <Text style={styles.loginLink}>Login</Text>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 30,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  backButton: {
    padding: 4,
    marginRight: 16,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },

  /* Description */
  descriptionContainer: {
    marginBottom: 28,
  },

  description: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    lineHeight: 26,
  },

  subDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },

  /* Input */
  inputGroup: {
    marginBottom: 20,
  },

  label: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },

  inputContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
  },

  inputContainerError: {
    borderColor: '#FF3B30',
  },

  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    height: 56,
  },

  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },

  /* Security Card */
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(91, 33, 182, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(91, 33, 182, 0.1)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },

  securityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(91, 33, 182, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  securityContent: {
    flex: 1,
  },

  securityTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },

  securityText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },

  /* Send Button */
  sendButton: {
    height: 56,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  sendButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  sendButtonDisabled: {
    opacity: 0.6,
  },

  sendButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  /* Divider */
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  dividerText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 16,
  },

  /* Options */
  optionsContainer: {
    gap: 12,
    marginBottom: 32,
  },

  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
  },

  optionButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: 'rgba(91, 33, 182, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  optionContent: {
    flex: 1,
  },

  optionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },

  optionSubtext: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  /* Login */
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },

  loginText: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  loginLink: {
    color: colors.primaryLight,
    fontSize: 14,
    fontWeight: '600',
  },
});