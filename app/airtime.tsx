import { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AirtimeHeader } from '../src/components/airtime/AirtimeHeader';
import { WalletBalanceCard } from '../src/components/airtime/WalletBalanceCard';
import { NetworkSelector, Network } from '../src/components/airtime/NetworkSelector';
import { PhoneNumberInput } from '../src/components/airtime/PhoneNumberInput';
import { AmountSelector } from '../src/components/airtime/AmountSelector';
import { PromoBanner } from '../src/components/airtime/PromoBanner';
import { TransactionSummary } from '../src/components/airtime/TransactionSummary';
import { useTheme } from '../src/theme/ThemeContext';
import { clamp } from '../src/theme/scale';
import { ScaleProvider } from '../src/theme/ScaleContext';

const BODY_ITEM_KEYS = ["wallet", "network", "phone", "amount", "promo", "summary"] as const;
type BodyItemKey = (typeof BODY_ITEM_KEYS)[number];

const MIN_GAP = 2;
const MAX_GAP = 8;
const BOTTOM_GAP = 4;

// How far content is allowed to shrink/grow from its designed size.
const MIN_FACTOR = 0.65;
const MAX_FACTOR = 1.15;

const CONVERGENCE_EPSILON = 0.02;

const savings: Record<number, number> = {
  100: 0, 200: 0, 500: 5, 1000: 15, 2000: 40, 5000: 125, 10000: 300,
};

export default function AirtimeScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();
  const [network, setNetwork] = useState<Network>('mtn');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<number | null>(null);

  const [bodyContainerHeight, setBodyContainerHeight] = useState(0);
  const [topHeight, setTopHeight] = useState(0);
  const [itemHeights, setItemHeights] = useState<Record<BodyItemKey, number>>({
    wallet: 0,
    network: 0,
    phone: 0,
    amount: 0,
    promo: 0,
    summary: 0,
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
      setItemHeights((prev) => (prev[key] === h ? prev : { ...prev, [key]: h }));
    },
    [],
  );

  // Convergence loop: each time measured heights change, check whether the
  // current factor would make content fit exactly. If not, nudge factor.
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

  // Calculate gap AFTER factor is applied
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

  const save = amount != null ? savings[amount] ?? 0 : 0;
  const total = amount != null ? amount - save : 0;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingBottom: insets.bottom }]}>
      <View
        style={[styles.fixedHeader, { backgroundColor: themeColors.background, paddingTop: insets.top + 8 }]}
        onLayout={onTopLayout}
      >
        <AirtimeHeader />
      </View>

      <ScaleProvider factor={factor}>
        <View
          style={[
            styles.content,
            {
              rowGap: gap,
              paddingBottom: BOTTOM_GAP,
              paddingTop: 4,
            }
          ]}
          onLayout={onBodyContainerLayout}
        >
          <View onLayout={makeItemLayoutHandler("wallet")}>
            <WalletBalanceCard />
          </View>

          <View onLayout={makeItemLayoutHandler("network")}>
            <NetworkSelector selected={network} onSelect={setNetwork} />
          </View>

          <View onLayout={makeItemLayoutHandler("phone")}>
            <PhoneNumberInput value={phone} onChangeText={setPhone} />
          </View>

          <View onLayout={makeItemLayoutHandler("amount")}>
            <AmountSelector amount={amount} onSelect={setAmount} savings={savings} />
          </View>

          <View onLayout={makeItemLayoutHandler("promo")}>
            <PromoBanner />
          </View>

          <View onLayout={makeItemLayoutHandler("summary")}>
            <TransactionSummary
              network={network}
              phone={phone || '0803 123 4567'}
              amount={amount ?? 0}
              save={save}
              total={total}
            />
          </View>
        </View>
      </ScaleProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});