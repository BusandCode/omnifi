import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import { clamp } from "../src/theme/scale";
import { ScaleProvider } from "../src/theme/ScaleContext";
import { useBalances } from "../src/store/BalanceContext";
import { useTheme } from "../src/theme/ThemeContext";

const BODY_ITEM_KEYS = [
  "recipient",
  "methods",
  "beneficiaries",
  "amount",
  "review",
] as const;
type BodyItemKey = (typeof BODY_ITEM_KEYS)[number];

const MIN_GAP = 2;
const MAX_GAP = 8;
const BOTTOM_GAP = 4;
const MIN_FACTOR = 0.65;
const MAX_FACTOR = 1.15;
const CONVERGENCE_EPSILON = 0.02;

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

  const [bodyContainerHeight, setBodyContainerHeight] = useState(0);
  const [topHeight, setTopHeight] = useState(0);
  const [itemHeights, setItemHeights] = useState<Record<BodyItemKey, number>>({
    recipient: 0,
    methods: 0,
    beneficiaries: 0,
    amount: 0,
    review: 0,
  });
  const [factor, setFactor] = useState(1);

  const onTopLayout = useCallback((e: LayoutChangeEvent) => {
    setTopHeight(e.nativeEvent.layout.height);
  }, []);

  const onBodyContainerLayout = useCallback((e: LayoutChangeEvent) => {
    setBodyContainerHeight(e.nativeEvent.layout.height);
  }, []);

  const makeItemLayoutHandler = useCallback(
    (key: BodyItemKey) => (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      setItemHeights((prev) =>
        prev[key] === h ? prev : { ...prev, [key]: h },
      );
    },
    [],
  );

  useEffect(() => {
    const allMeasured =
      bodyContainerHeight > 0 &&
      topHeight > 0 &&
      BODY_ITEM_KEYS.every((k) => itemHeights[k] > 0);
    if (!allMeasured) return;

    const totalItemHeight = BODY_ITEM_KEYS.reduce(
      (sum, k) => sum + itemHeights[k],
      0,
    );
    const totalGaps = MIN_GAP * (BODY_ITEM_KEYS.length - 1);
    const availableForItems = bodyContainerHeight - BOTTOM_GAP - totalGaps;
    const idealFactor = factor * (availableForItems / totalItemHeight);
    const nextFactor = clamp(idealFactor, MIN_FACTOR, MAX_FACTOR);

    if (Math.abs(nextFactor - factor) > CONVERGENCE_EPSILON) {
      setFactor(nextFactor);
    }
  }, [bodyContainerHeight, topHeight, itemHeights]);

  const totalItemHeight = BODY_ITEM_KEYS.reduce(
    (sum, k) => sum + itemHeights[k],
    0,
  );
  let gap = MIN_GAP;
  if (bodyContainerHeight > 0) {
    const leftover = bodyContainerHeight - BOTTOM_GAP - totalItemHeight;
    if (leftover > 0) {
      const calculatedGap = leftover / (BODY_ITEM_KEYS.length - 1);
      gap = clamp(calculatedGap, MIN_GAP, MAX_GAP);
    }
  }

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

  const numericAmount = parseFloat(amount.replace(/,/g, "")) || 0;

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
        onLayout={onTopLayout}
      >
        <SendHeader />
      </View>

      <ScaleProvider factor={factor}>
        <View
          style={[
            styles.content,
            { rowGap: gap, paddingBottom: BOTTOM_GAP, paddingTop: 4 },
          ]}
          onLayout={onBodyContainerLayout}
        >
          <View
            style={styles.section}
            onLayout={makeItemLayoutHandler("recipient")}
          >
            <Text
              style={[styles.sectionTitle, { color: themeColors.textPrimary }]}
            >
              Who are you sending to?
            </Text>
            <RecipientSearch value={recipient} onChangeText={setRecipient} />
          </View>

          <View
            style={styles.section}
            onLayout={makeItemLayoutHandler("methods")}
          >
            <SendMethodsGrid onSelect={handleMethodSelect} />
          </View>

          <View
            style={styles.section}
            onLayout={makeItemLayoutHandler("beneficiaries")}
          >
            <RecentBeneficiaries
              beneficiaries={MOCK_BENEFICIARIES}
              onSelect={handleBeneficiarySelect}
              onViewAll={() => {}}
              onAddNew={() => {}}
            />
          </View>

          <View
            style={styles.section}
            onLayout={makeItemLayoutHandler("amount")}
          >
            <Text
              style={[styles.sectionTitle, { color: themeColors.textPrimary }]}
            >
              Enter amount
            </Text>
            <AmountInput
              amount={amount}
              onChangeAmount={setAmount}
              note={note}
              onChangeNote={setNote}
            />
          </View>

          <View
            style={styles.section}
            onLayout={makeItemLayoutHandler("review")}
          >
            <ReviewSummary
              amount={numericAmount}
              fee={0}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </View>
        </View>
      </ScaleProvider>
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
  content: { flex: 1, paddingHorizontal: 16 },
  foreignScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  section: { gap: 8 },
  sectionTitle: {
    fontSize: 11.5,
    fontWeight: "700",
    color: colors.textPrimary,
  },
});
