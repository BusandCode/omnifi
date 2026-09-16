import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AmountInput } from "../src/components/send/AmountInput";
import {
  Beneficiary,
  RecentBeneficiaries,
} from "../src/components/send/RecentBeneficiaries";
import { RecipientSearch } from "../src/components/send/RecipientSearch";
import { ReviewSummary } from "../src/components/send/ReviewSummary";
import { SendHeader } from "../src/components/send/SendHeader";
import {
  SendMethod,
  SendMethodsGrid,
} from "../src/components/send/SendMethodsGrid";
import { ForeignSendContent } from "../src/components/send/ForeignSendContent";
import { ForeignCurrency } from "../src/constants/foreignSendData";
import { colors } from "../src/theme/colors";
import { useBalances } from "../src/store/BalanceContext";
import { useTheme } from "../src/theme/ThemeContext";

const MOCK_BENEFICIARIES: Beneficiary[] = [
  {
    id: "1",
    initials: "IS",
    name: "Ibrahim S.",
    bank: "Kuda Bank",
    avatarColor: "#C4B5FD",
  },
  {
    id: "2",
    initials: "OA",
    name: "Oluwaseun A.",
    bank: "GTBank",
    avatarColor: "#FCA5A5",
  },
  {
    id: "3",
    initials: "MM",
    name: "Maryam M.",
    bank: "Access Bank",
    avatarColor: "#6EE7B7",
  },
  {
    id: "4",
    initials: "AS",
    name: "Aisha S.",
    bank: "Zenith Bank",
    avatarColor: "#93C5FD",
  },
];

const METHOD_LABELS: Record<SendMethod, string> = {
  bank: "Bank Transfer",
  phone: "Phone Transfer",
  wallet: "Wallet Transfer",
  qr: "QR Payment",
};

export default function SendScreen() {
  const { currency } = useLocalSearchParams<{ currency?: string }>();
  const insets = useSafeAreaInsets();

  if (currency === "USD" || currency === "EUR") {
    return (
      <ForeignSendScreen
        currency={currency as ForeignCurrency}
        insets={insets}
      />
    );
  }

  return <NgnSendContent insets={insets} />;
}

function ForeignSendScreen({
  currency,
  insets,
}: {
  currency: ForeignCurrency;
  insets: { top: number; bottom: number };
}) {
  const { colors: themeColors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: themeColors.background,
        },
      ]}
    >
      <View
        style={[
          styles.fixedHeader,
          {
            paddingTop: insets.top + 8,
            backgroundColor: themeColors.background,
          },
        ]}
      >
        <SendHeader subtitle={`${currency} Account`} showDot rightIcon="help" />
      </View>
      <ScrollView
        contentContainerStyle={styles.foreignScrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ForeignSendContent currency={currency} />
      </ScrollView>
    </View>
  );
}

function NgnSendContent({
  insets,
}: {
  insets: { top: number; bottom: number };
}) {
  const { colors: themeColors } = useTheme();
  const [recipient, setRecipient] = useState("");
  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<Beneficiary | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<SendMethod>("bank");
  const [amount, setAmount] = useState("25000");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { debit } = useBalances();

  const numericAmount = parseFloat(amount.replace(/,/g, "")) || 0;

  const handleMethodSelect = (method: SendMethod) => setSelectedMethod(method);

  const handleBeneficiarySelect = (b: Beneficiary) => {
    setRecipient(b.name);
    setSelectedBeneficiary(b);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      debit("NGN", numericAmount);
      router.replace({
        pathname: "/transfer-success",
        params: {
          amount: numericAmount.toString(),
          currency: "NGN",
          recipientName: selectedBeneficiary?.name ?? recipient ?? "",
          recipientBank: selectedBeneficiary?.bank ?? "",
          recipientInitials: selectedBeneficiary?.initials ?? "",
          paymentMethod: METHOD_LABELS[selectedMethod],
          note,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: themeColors.background,
        },
      ]}
    >
      <View
        style={[
          styles.fixedHeader,
          {
            paddingTop: insets.top + 8,
            backgroundColor: themeColors.background,
          },
        ]}
      >
        <SendHeader />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>
            Who are you sending to?
          </Text>
          <RecipientSearch value={recipient} onChangeText={setRecipient} />
        </View>

        <View style={styles.section}>
          <SendMethodsGrid onSelect={handleMethodSelect} />
        </View>

        <View style={styles.section}>
          <RecentBeneficiaries
            beneficiaries={MOCK_BENEFICIARIES}
            onSelect={handleBeneficiarySelect}
            onViewAll={() => {}}
            onAddNew={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>
            Enter amount
          </Text>
          <AmountInput
            amount={amount}
            onChangeAmount={setAmount}
            note={note}
            onChangeNote={setNote}
          />
        </View>

        <View style={styles.section}>
          <ReviewSummary
            amount={numericAmount}
            fee={0}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  fixedHeader: {
    paddingHorizontal: 16,
    paddingBottom: 4,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
    gap: 24,
  },
  foreignScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  section: { gap: 10 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
  },
});