// src/components/withdraw/WithdrawComplete.tsx
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import StepProgress from './StepProgress';
import WithdrawHeader from './WithdrawHeader';
import DetailIcon from './DetailIcon';
import { SuccessGraphic, ShieldGraphic } from './illustrations';

export default function WithdrawComplete() {
  const insets = useSafeAreaInsets();

  const handleGoToDashboard = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}
      >
        <WithdrawHeader onBack={handleGoToDashboard} />
        <StepProgress currentStep={4} />

        <View style={styles.successCard}>
          <View style={styles.successLeft}>
            <View style={styles.successTitleRow}>
              <View style={styles.successBadge}>
                <Feather name="check" size={16} color="#fff" />
              </View>
              <Text style={styles.title}>Withdrawal Request Submitted!</Text>
            </View>
            <Text style={styles.subtitle}>
              Your withdrawal request has been received and is being processed.
            </Text>
          </View>
          <SuccessGraphic size={70} />
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Transaction Details</Text>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <DetailIcon name="credit-card" tone="purple" />
              <Text style={styles.detailLabel}>Withdrawal Amount</Text>
            </View>
            <Text style={styles.detailValue}>₦25,000.00</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <DetailIcon name="percent" tone="red" />
              <Text style={styles.detailLabel}>Processing Fee (1.5%)</Text>
            </View>
            <Text style={styles.detailValueFee}>- ₦375.00</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <DetailIcon name="home" tone="purple" />
              <Text style={styles.detailLabel}>You will receive</Text>
            </View>
            <Text style={styles.detailValueHighlight}>₦24,625.00</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <DetailIcon name="home" tone="purple" />
              <Text style={styles.detailLabel}>Withdraw to</Text>
            </View>
            <Text style={styles.detailValue}>Monnify (Opay) Bank</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <DetailIcon name="home" tone="purple" />
              <Text style={styles.detailLabel}>Account</Text>
            </View>
            <Text style={styles.detailValue}>**** **** **** 7890</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <DetailIcon name="calendar" tone="purple" />
              <Text style={styles.detailLabel}>Request Time</Text>
            </View>
            <Text style={styles.detailValue}>21 Jul 2026, 09:41 AM</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <DetailIcon name="clock" tone="purple" />
              <Text style={styles.detailLabel}>Estimated Arrival</Text>
            </View>
            <View style={styles.chevronRow}>
              <Text style={styles.detailValue}>Within 1 - 24 hours</Text>
              <Feather name="info" size={13} color={colors.textSecondary} />
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconWrap}>
            <Feather name="info" size={16} color={colors.primary} />
          </View>
          <Text style={styles.infoTitle}>What happens next?</Text>
          <Text style={styles.infoText}>
            We are processing your request. You will receive a notification once the funds have
            been sent to your bank account.
          </Text>
        </View>

        <View style={styles.securityCard}>
          <ShieldGraphic size={44} />
          <View style={styles.securityTextWrap}>
            <Text style={styles.securityTitle}>Secure &amp; Reliable</Text>
            <Text style={styles.securityText}>
              Your transactions are protected with bank-level security.
            </Text>
            <Pressable>
              <Text style={styles.learnMore}>Learn more {'>'}</Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.dashboardButton} onPress={handleGoToDashboard}>
          <Feather name="grid" size={16} color="#fff" />
          <Text style={styles.dashboardButtonText}>Go to Dashboard</Text>
        </Pressable>

        <Pressable style={styles.receiptButton}>
          <Feather name="download" size={16} color={colors.textPrimary} />
          <Text style={styles.receiptButtonText}>Download Receipt</Text>
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
  successCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  successLeft: {
    flex: 1,
    paddingRight: 12,
  },
  successTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  successBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailsTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  detailValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
  },
  detailValueFee: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '500',
  },
  detailValueHighlight: {
    color: colors.success,
    fontSize: 16,
    fontWeight: '700',
  },
  chevronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoCard: {
    backgroundColor: colors.primaryTint,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primaryTint,
  },
  infoIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  securityTextWrap: {
    flex: 1,
  },
  securityTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  securityText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  learnMore: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  dashboardButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dashboardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  receiptButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  receiptButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});