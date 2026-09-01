// src/components/withdraw/WithdrawBankDetails.tsx
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import StepProgress from './StepProgress';
import WithdrawHeader from './WithdrawHeader';

export default function WithdrawBankDetails() {
  const insets = useSafeAreaInsets();
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const banks = [
    'Monnify (Opay) Bank',
    'GTBank',
    'Access Bank',
    'First Bank',
    'UBA',
    'Zenith Bank',
    'Other',
  ];

  const handleContinue = () => {
    router.push('/withdraw/review');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}
      >
        <WithdrawHeader />
        <StepProgress currentStep={2} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Bank</Text>
          <View style={styles.bankList}>
            {banks.map((bank) => (
              <Pressable
                key={bank}
                style={[styles.bankOption, selectedBank === bank && styles.bankOptionActive]}
                onPress={() => setSelectedBank(bank)}
              >
                <Feather
                  name={selectedBank === bank ? 'check-circle' : 'circle'}
                  size={20}
                  color={selectedBank === bank ? colors.primary : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.bankOptionText,
                    selectedBank === bank && styles.bankOptionTextActive,
                  ]}
                >
                  {bank}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Account Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter account number"
              placeholderTextColor={colors.textSecondary}
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Account Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter account name"
              placeholderTextColor={colors.textSecondary}
              value={accountName}
              onChangeText={setAccountName}
            />
          </View>
        </View>

        {/* <Pressable style={styles.verifyButton}>
          <Feather name="check" size={18} color="#fff" />
          <Text style={styles.verifyButtonText}>Verify Account</Text>
        </Pressable> */}

        <Pressable
          style={[
            styles.continueButton,
            (!selectedBank || !accountNumber || !accountName) && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedBank || !accountNumber || !accountName}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  bankList: {
    gap: 8,
  },
  bankOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  bankOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryTint,
  },
  bankOptionText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  bankOptionTextActive: {
    color: colors.primary,
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 52,
    justifyContent: 'center',
  },
  input: {
    color: colors.textPrimary,
    fontSize: 14,
    height: 52,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primaryTint,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 24,
  },
  verifyButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});