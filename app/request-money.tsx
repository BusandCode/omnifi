import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { RequestMoneyHeader } from "../src/components/request-money/RequestMoneyHeader";
import { AccountSourceCard } from "../src/components/request-money/AccountSourceCard";
import { RecipientSelector, RecipientMode } from "../src/components/request-money/RecipientSelector";
import { AmountEntrySection } from "../src/components/request-money/AmountEntrySection";
import { NoteField } from "../src/components/request-money/NoteField";
import { HowItWorksRow } from "../src/components/request-money/HowItWorksRow";
import { RecentRequestsList } from "../src/components/request-money/RecentRequestsList";
import { colors } from "../src/theme/colors";
import { CurrencyCode } from "../src/constants/currencies";
import { useBalances } from "../src/store/BalanceContext";

export default function RequestMoneyScreen() {
  const insets = useSafeAreaInsets();
  const { currency } = useLocalSearchParams<{ currency?: string }>();
  const activeCurrency: CurrencyCode =
    currency === "USD" || currency === "EUR" ? currency : "NGN";

  const { balances } = useBalances();
  const balance = balances[activeCurrency];

  const [recipientMode, setRecipientMode] = useState<RecipientMode>("omnifi");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleRequestMoney = () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) return;

    router.push({
      pathname: "/request-success",
      params: {
        amount: numericAmount.toString(),
        currency: activeCurrency,
        note,
        recipientName: recipientMode === "omnifi" ? "John Michael Smith" : "Recipient",
        recipientSub: recipientMode === "omnifi" ? "OmniFi User • johnsmith@gmail.com" : "",
      },
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <RequestMoneyHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AccountSourceCard currency={activeCurrency} balance={balance} />
        <RecipientSelector value={recipientMode} onChange={setRecipientMode} />
        <AmountEntrySection
          currency={activeCurrency}
          balance={balance}
          amount={amount}
          onChangeAmount={setAmount}
        />
        <NoteField value={note} onChangeText={setNote} />
        <HowItWorksRow />

        <TouchableOpacity style={styles.submitBtn} onPress={handleRequestMoney}>
          <Text style={styles.submitText}>Request Money</Text>
          <Feather name="arrow-right" size={16} color="#fff" />
        </TouchableOpacity>

        <RecentRequestsList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 20,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
  },
  submitText: { color: '#fff', fontSize: 14.5, fontWeight: '700' },
});