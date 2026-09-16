// src/components/withdraw/WithdrawReview.tsx
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import StepProgress from './StepProgress';
import WithdrawHeader from './WithdrawHeader';
import DetailIcon from './DetailIcon';
import { ClipboardGraphic } from './illustrations';

export default function WithdrawReview() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  const handleConfirm = () => {
    router.push('/withdraw/complete');
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: themeColors.background,
        },
        content: {
          paddingHorizontal: 20,
          paddingBottom: 40,
        },
        introRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        },
        introText: {
          flex: 1,
          paddingRight: 12,
        },
        reviewTitle: {
          color: themeColors.textPrimary,
          fontSize: 20,
          fontWeight: '700',
          marginBottom: 4,
        },
        reviewSubtext: {
          color: themeColors.textSecondary,
          fontSize: 13,
        },
        summaryCard: {
          backgroundColor: themeColors.surface,
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: themeColors.border,
        },
        summaryTitle: {
          color: themeColors.textPrimary,
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 16,
        },
        summaryRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 4,
        },
        feeLabelRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        summaryLabel: {
          color: themeColors.textSecondary,
          fontSize: 14,
        },
        summaryValue: {
          color: themeColors.textPrimary,
          fontSize: 14,
          fontWeight: '500',
        },
        summaryValueFee: {
          color: themeColors.danger,
          fontSize: 14,
          fontWeight: '500',
        },
        summaryTotalLabel: {
          color: themeColors.textPrimary,
          fontSize: 15,
          fontWeight: '600',
        },
        summaryTotalValue: {
          color: themeColors.success,
          fontSize: 18,
          fontWeight: '700',
        },
        summarySubtext: {
          color: themeColors.textSecondary,
          fontSize: 12,
          marginTop: 4,
        },
        divider: {
          height: 1,
          backgroundColor: themeColors.border,
          marginVertical: 8,
        },
        bankCard: {
          backgroundColor: themeColors.surface,
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: themeColors.border,
        },
        bankCardTitle: {
          color: themeColors.textPrimary,
          fontSize: 14,
          fontWeight: '600',
          marginBottom: 12,
        },
        bankInfo: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        },
        bankInfoLeft: {
          flexDirection: 'row',
          alignItems: 'flex-start',
        },
        bankName: {
          color: themeColors.textPrimary,
          fontSize: 14,
          fontWeight: '500',
        },
        bankAccount: {
          color: themeColors.textSecondary,
          fontSize: 13,
          marginTop: 2,
        },
        bankHolder: {
          color: themeColors.textSecondary,
          fontSize: 13,
          marginTop: 2,
        },
        chevronRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        },
        changeBank: {
          color: themeColors.primary,
          fontSize: 13,
          fontWeight: '500',
        },
        infoCard: {
          backgroundColor: themeColors.primaryTint,
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: themeColors.primaryTint,
        },
        infoIconWrap: {
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: themeColors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        },
        infoTitle: {
          color: themeColors.textPrimary,
          fontSize: 14,
          fontWeight: '600',
        },
        infoText: {
          color: themeColors.textSecondary,
          fontSize: 13,
          marginTop: 4,
          lineHeight: 20,
        },
        confirmButton: {
          flexDirection: 'row',
          backgroundColor: themeColors.primary,
          borderRadius: 12,
          paddingVertical: 16,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        },
        confirmButtonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '700',
        },
      }),
    [themeColors]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}
      >
        <WithdrawHeader />
        <StepProgress currentStep={3} />

        <View style={styles.introRow}>
          <View style={styles.introText}>
            <Text style={styles.reviewTitle}>Review Withdrawal</Text>
            <Text style={styles.reviewSubtext}>
              Please review the details below before confirming your withdrawal.
            </Text>
          </View>
          <ClipboardGraphic size={72} />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Withdrawal Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Available Balance</Text>
            <Text style={styles.summaryValue}>₦52,600.00</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Withdrawal Amount</Text>
            <Text style={styles.summaryValue}>₦25,000.00</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.feeLabelRow}>
              <Text style={styles.summaryLabel}>Processing Fee (1.5%)</Text>
              <Feather name="info" size={12} color={themeColors.textSecondary} />
            </View>
            <Text style={styles.summaryValueFee}>- ₦375.00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>You will receive</Text>
            <Text style={styles.summaryTotalValue}>₦24,625.00</Text>
          </View>
          <Text style={styles.summarySubtext}>Amount will be sent to your bank account</Text>
        </View>

        <View style={styles.bankCard}>
          <Text style={styles.bankCardTitle}>Withdraw to</Text>
          <View style={styles.bankInfo}>
            <View style={styles.bankInfoLeft}>
              <DetailIcon name="home" tone="purple" />
              <View>
                <Text style={styles.bankName}>Monnify (Opay) Bank</Text>
                <Text style={styles.bankAccount}>**** **** **** 7890</Text>
                <Text style={styles.bankHolder}>Silver Abdul</Text>
              </View>
            </View>
            <Pressable style={styles.chevronRow}>
              <Text style={styles.changeBank}>Change</Text>
              <Feather name="chevron-right" size={16} color={themeColors.primary} />
            </Pressable>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconWrap}>
            <Feather name="info" size={16} color={themeColors.primary} />
          </View>
          <Text style={styles.infoTitle}>Important Information</Text>
          <Text style={styles.infoText}>
            • Withdrawals are processed within 1-24 hours on business days.{'\n'}
            • Weekends and public holidays may cause delays.{'\n'}
            • Ensure your bank details are correct to avoid failed transfers.
          </Text>
        </View>

        <Pressable style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Next</Text>
          <Feather name="chevron-right" size={18} color="#fff" />
        </Pressable>
      </ScrollView>
    </View>
  );
}