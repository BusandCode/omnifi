import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeContext';
import StepProgress from './StepProgress';
import WithdrawHeader from './WithdrawHeader';
import DetailIcon from './DetailIcon';
import { WalletGraphic } from './illustrations';

export default function WithdrawAmount() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();
  const [amount, setAmount] = useState('25,000');
  const [selectedAmount, setSelectedAmount] = useState('25,000');

  const quickAmounts = ['1,000', '5,000', '10,000', '20,000', 'Max'];

  const handleAmountPress = (value: string) => {
    if (value === 'Max') {
      setAmount('52,600');
      setSelectedAmount('52,600');
    } else {
      setAmount(value);
      setSelectedAmount(value);
    }
  };

  const handleContinue = () => {
    router.push('/withdraw/bank-details');
  };

  const numericAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  const fee = numericAmount * 0.015;
  const receiveAmount = numericAmount - fee;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: themeColors.background,
        },
        content: {
          paddingHorizontal: 16,
          paddingBottom: 12,
        },
        balanceCard: {
          backgroundColor: themeColors.surface,
          borderRadius: 12,
          padding: 12,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: themeColors.border,
        },
        balanceTop: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        },
        balanceLabel: {
          color: themeColors.textSecondary,
          fontSize: 10,
        },
        balanceAmount: {
          color: themeColors.textPrimary,
          fontSize: 20,
          fontWeight: '700',
          marginVertical: 2,
        },
        balanceSubtext: {
          color: themeColors.textSecondary,
          fontSize: 10,
        },
        balanceDivider: {
          height: 1,
          backgroundColor: themeColors.border,
          marginBottom: 6,
        },
        detailRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 2,
        },
        detailLabel: {
          color: themeColors.textSecondary,
          fontSize: 12,
        },
        detailValue: {
          color: themeColors.textPrimary,
          fontSize: 12,
          fontWeight: '500',
        },
        amountSection: {
          marginBottom: 10,
        },
        sectionLabel: {
          color: themeColors.textPrimary,
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 5,
        },
        amountInputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: themeColors.surface,
          borderWidth: 1,
          borderColor: themeColors.primary,
          borderRadius: 10,
          paddingHorizontal: 12,
          height: 42,
        },
        currencySymbol: {
          color: themeColors.textPrimary,
          fontSize: 16,
          fontWeight: '600',
          marginRight: 6,
        },
        amountInput: {
          flex: 1,
          color: themeColors.textPrimary,
          fontSize: 17,
          fontWeight: '700',
          height: 42,
          padding: 0,
        },
        maxButton: {
          backgroundColor: themeColors.primaryTint,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 6,
        },
        maxButtonText: {
          color: themeColors.primary,
          fontSize: 11,
          fontWeight: '600',
        },
        minAmountText: {
          color: themeColors.textSecondary,
          fontSize: 10,
          marginTop: 4,
        },
        quickAmounts: {
          flexDirection: 'row',
          gap: 6,
          marginBottom: 10,
        },
        quickAmountButton: {
          flex: 1,
          paddingVertical: 6,
          borderRadius: 7,
          borderWidth: 1,
          borderColor: themeColors.border,
          alignItems: 'center',
        },
        quickAmountButtonActive: {
          borderColor: themeColors.primary,
          backgroundColor: themeColors.primaryTint,
        },
        quickAmountText: {
          color: themeColors.textSecondary,
          fontSize: 10,
          fontWeight: '500',
        },
        quickAmountTextActive: {
          color: themeColors.primary,
        },
        receiveCard: {
          backgroundColor: themeColors.surface,
          borderRadius: 10,
          padding: 12,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: themeColors.border,
        },
        receiveTitle: {
          color: themeColors.textPrimary,
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 6,
        },
        receiveRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 2,
        },
        receiveLabel: {
          color: themeColors.textSecondary,
          fontSize: 11,
        },
        receiveValue: {
          color: themeColors.textPrimary,
          fontSize: 11,
          fontWeight: '500',
        },
        receiveValueFee: {
          color: themeColors.danger,
          fontSize: 11,
          fontWeight: '500',
        },
        receiveTotalLabel: {
          color: themeColors.textPrimary,
          fontSize: 12,
          fontWeight: '600',
        },
        receiveTotalValue: {
          color: themeColors.success,
          fontSize: 13,
          fontWeight: '700',
        },
        divider: {
          height: 1,
          backgroundColor: themeColors.border,
          marginVertical: 5,
        },
        infoNote: {
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 5,
          marginBottom: 10,
        },
        infoText: {
          color: themeColors.textSecondary,
          fontSize: 10,
          flex: 1,
        },
        learnMore: {
          color: themeColors.primary,
          fontSize: 10,
          fontWeight: '500',
        },
        bankCard: {
          backgroundColor: themeColors.surface,
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: themeColors.border,
        },
        bankCardTitle: {
          color: themeColors.textPrimary,
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 8,
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
          fontSize: 12,
          fontWeight: '500',
        },
        bankAccount: {
          color: themeColors.textSecondary,
          fontSize: 11,
          marginTop: 1,
        },
        bankHolder: {
          color: themeColors.textSecondary,
          fontSize: 11,
          marginTop: 1,
        },
        chevronRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        },
        changeBank: {
          color: themeColors.primary,
          fontSize: 11,
          fontWeight: '500',
        },
        addBankButton: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginTop: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: themeColors.border,
        },
        addBankText: {
          color: themeColors.primary,
          fontSize: 11,
          fontWeight: '500',
        },
        continueButton: {
          backgroundColor: themeColors.primary,
          borderRadius: 10,
          paddingVertical: 12,
          alignItems: 'center',
        },
        continueButtonText: {
          color: '#fff',
          fontSize: 14,
          fontWeight: '700',
        },
      }),
    [themeColors]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
      >
        <WithdrawHeader />
        <StepProgress currentStep={1} />

        <View style={styles.balanceCard}>
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceAmount}>₦52,600.00</Text>
              <Text style={styles.balanceSubtext}>Ready to withdraw</Text>
            </View>
            <WalletGraphic size={50} />
          </View>
          <View style={styles.balanceDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pending Balance</Text>
            <Text style={styles.detailValue}>₦76,000.00</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Earnings</Text>
            <Text style={styles.detailValue}>₦128,600.00</Text>
          </View>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.sectionLabel}>Enter Amount</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₦</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor={themeColors.textSecondary}
            />
            <Pressable style={styles.maxButton} onPress={() => handleAmountPress('Max')}>
              <Text style={styles.maxButtonText}>Max</Text>
            </Pressable>
          </View>
          <Text style={styles.minAmountText}>Minimum withdrawal is ₦1,000.00</Text>
        </View>

        <View style={styles.quickAmounts}>
          {quickAmounts.map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.quickAmountButton,
                selectedAmount === value && styles.quickAmountButtonActive,
              ]}
              onPress={() => handleAmountPress(value)}
            >
              <Text
                style={[
                  styles.quickAmountText,
                  selectedAmount === value && styles.quickAmountTextActive,
                ]}
              >
                {value === 'Max' ? 'Max' : `₦${value}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.receiveCard}>
          <Text style={styles.receiveTitle}>You will receive</Text>
          <View style={styles.receiveRow}>
            <Text style={styles.receiveLabel}>Withdrawal Amount</Text>
            <Text style={styles.receiveValue}>₦{amount}</Text>
          </View>
          <View style={styles.receiveRow}>
            <Text style={styles.receiveLabel}>Processing Fee (1.5%)</Text>
            <Text style={styles.receiveValueFee}>- ₦{fee.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.receiveRow}>
            <Text style={styles.receiveTotalLabel}>You will receive</Text>
            <Text style={styles.receiveTotalValue}>₦{receiveAmount.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.infoNote}>
          <Feather name="info" size={13} color={themeColors.textSecondary} />
          <Text style={styles.infoText}>
            Withdrawals are processed within 1-24 hours on business days.
          </Text>
          <Pressable>
            <Text style={styles.learnMore}>Learn more</Text>
          </Pressable>
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
              <Feather name="chevron-right" size={13} color={themeColors.primary} />
            </Pressable>
          </View>
          <Pressable style={styles.addBankButton}>
            <Feather name="plus" size={13} color={themeColors.primary} />
            <Text style={styles.addBankText}>Add New Bank Account</Text>
            <Feather name="chevron-right" size={13} color={themeColors.primary} style={{ marginLeft: 'auto' }} />
          </Pressable>
        </View>

        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}