import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useTheme } from "../../theme/ThemeContext";
import {
  FOREIGN_ACCOUNTS,
  ForeignCurrency,
  MOCK_BANK_VALUES,
  SendMethodId,
} from "../../constants/foreignSendData";
import { SendAccountCard } from "./SendAccountCard";
import { SendMethodIcons } from "./SendMethodIcons";
import { RecipientDetailsForm } from "./RecipientDetailsForm";
import { ForeignAmountCard, ForeignNoteCard } from "./ForeignAmountInput";
import { ForeignSendSummary } from "./ForeignSendSummary";

function SectionHeader({ number, title }: { number: number; title: string }) {
  const { colors: themeColors } = useTheme();
  return (
    <Text style={[styles.sectionHeader, { color: themeColors.textPrimary }]}>
      {number}. {title}
    </Text>
  );
}

type Props = {
  currency: ForeignCurrency;
};

export function ForeignSendContent({ currency }: Props) {
  const account = FOREIGN_ACCOUNTS[currency];

  const [method, setMethod] = useState<SendMethodId>("bank");
  const [fields, setFields] = useState<Record<string, string>>(MOCK_BANK_VALUES[currency]);
  const [amount, setAmount] = useState("250");
  const [note, setNote] = useState("");

  const numericAmount = parseFloat(amount.replace(/,/g, "")) || 0;

  const handleReview = () => {
    const recipientName = fields.recipientName || "";

    const idLabel = currency === "USD" ? "Account Number" : "IBAN";
    const idValue = currency === "USD" ? fields.accountNumber || "" : fields.iban || "";
    const refLabel = currency === "USD" ? "Routing Number (ABA)" : "BIC / SWIFT";
    const refValue = currency === "USD" ? fields.routingNumber || "" : fields.bic || "";

    router.push({
      pathname: "/review-transfer",
      params: {
        currency,
        amount: numericAmount.toString(),
        recipientName,
        idLabel,
        idValue,
        refLabel,
        refValue,
        note,
      },
    });
  };

  return (
    <View style={styles.container}>
      <SendAccountCard account={account} />

      <View style={styles.section}>
        <SectionHeader number={1} title="Recipient" />
        <SendMethodIcons currency={currency} selected={method} onSelect={setMethod} />
      </View>

      <View style={styles.section}>
        <SectionHeader number={2} title="Recipient Details" />
        <RecipientDetailsForm
          currency={currency}
          account={account}
          values={fields}
          onChangeField={(key, val) => setFields((prev) => ({ ...prev, [key]: val }))}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader number={3} title="Amount" />
        <ForeignAmountCard account={account} amount={amount} onChangeAmount={setAmount} />
      </View>

      <View style={styles.section}>
        <SectionHeader number={4} title="Add a Note (Optional)" />
        <ForeignNoteCard note={note} onChangeNote={setNote} />
      </View>

      <ForeignSendSummary
        symbol={account.symbol}
        amount={numericAmount}
        fee={0}
        onReview={handleReview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 22 },
  section: { gap: 10 },
  sectionHeader: { fontSize: 13, fontWeight: "700" },
});