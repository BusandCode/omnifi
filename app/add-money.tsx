import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddMoneyHeader } from '../src/components/add-money/AddMoneyHeader';
import { AddMoneyTabs } from '../src/components/add-money/AddMoneyTabs';
import { VirtualAccountCard } from '../src/components/add-money/VirtualAccountCard';
import { HowItWorks } from '../src/components/add-money/HowItWorks';
import { ImportantInfo } from '../src/components/add-money/ImportantInfo';
import { RecentTopUps } from '../src/components/add-money/RecentTopUps';
import { SecurityFooter } from '../src/components/add-money/SecurityFooter';
import { AmountEntryCard } from '../src/components/add-money/AmountEntryCard';
import { PaymentMethodsList } from '../src/components/add-money/PaymentMethodsList';
import { OtherMethodsFooter } from '../src/components/add-money/OtherMethodsFooter';
import { AccountHeader } from '../src/components/account/AccountHeader';
import { ForeignAccountContent } from '../src/components/account/ForeignAccountContent';
import { getForeignAccount } from '../src/constants/accountData';
import { useTheme } from '../src/theme/ThemeContext';
import { useBalances } from '../src/store/BalanceContext';

export default function AddMoneyScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();
  const { currency } = useLocalSearchParams<{ currency?: string }>();
  const activeCurrency = currency === 'USD' || currency === 'EUR' ? currency : 'NGN';
  const { credit } = useBalances();

  const [tab, setTab] = useState<'virtual' | 'other'>('virtual');
  const [amount, setAmount] = useState('');

  const formattedAmount = amount ? Number(amount).toLocaleString() : null;
  const ctaLabel = formattedAmount ? `Add NGN ${formattedAmount}` : 'Add money';

  const handleAddMoney = () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) return;

    credit('NGN', numericAmount);

    router.replace({
      pathname: "/transfer-success",
      params: {
        amount: numericAmount.toString(),
        currency: 'NGN',
        recipientName: "",
        recipientBank: "",
        recipientInitials: "",
        paymentMethod: "Add Money",
        note: "",
      },
    });
  };

  if (activeCurrency !== 'NGN') {
    const account = getForeignAccount(activeCurrency);

    return (
      <View style={[styles.container, { backgroundColor: themeColors.background, paddingBottom: insets.bottom }]}>
        <View style={[styles.fixedHeader, { backgroundColor: themeColors.background, paddingTop: insets.top + 8 }]}>
          <AccountHeader code={account.code} fullName={account.fullName} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ForeignAccountContent currency={activeCurrency} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { backgroundColor: themeColors.background, paddingTop: insets.top + 8 }]}>
        <AddMoneyHeader
          subtitle={tab === 'virtual' ? 'Fund your account via your Virtual Account' : 'Fund your account instantly'}
        />
        <AddMoneyTabs active={tab} onChange={setTab} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'virtual' ? (
          <>
            <VirtualAccountCard />
            <HowItWorks />
            <ImportantInfo />
            <RecentTopUps />
          </>
        ) : (
          <>
            <AmountEntryCard amount={amount} onChangeAmount={setAmount} />
            <PaymentMethodsList />
          </>
        )}
      </ScrollView>

      <View style={[styles.fixedBottom, { backgroundColor: themeColors.background }]}>
        {tab === 'virtual' ? (
          <SecurityFooter />
        ) : (
          <>
            <TouchableOpacity style={[styles.cta, { backgroundColor: themeColors.primary }]} onPress={handleAddMoney}>
              <Text style={styles.ctaText}>{ctaLabel}</Text>
            </TouchableOpacity>
            <OtherMethodsFooter />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    gap: 8,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 16,
  },
  fixedBottom: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 0,
    gap: 8,
  },
  cta: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});