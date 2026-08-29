import { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BillsHeader } from "../src/components/bills/BillsHeader";
import { TotalBillsCard } from "../src/components/bills/TotalBillsCard";
import { QuickPayRow } from "../src/components/bills/QuickPayRow";
import { BillCategories } from "../src/components/bills/BillCategories";
import { RecentPayments } from "../src/components/bills/RecentPayments";
import { SecurePaymentsFooter } from "../src/components/bills/SecurePaymentsFooter";
import { colors } from "../src/theme/colors";
import { clamp } from "../src/theme/scale";
import { ScaleProvider } from "../src/theme/ScaleContext";

const BODY_ITEM_KEYS = ["quickPay", "categories", "recent", "footer"] as const;
type BodyItemKey = (typeof BODY_ITEM_KEYS)[number];

const MIN_GAP = 2;
const MAX_GAP = 8;
const BOTTOM_GAP = 4;

// How far content is allowed to shrink/grow from its designed size.
const MIN_FACTOR = 0.65;
const MAX_FACTOR = 1.15;

const CONVERGENCE_EPSILON = 0.02;

export default function BillsScreen() {
  const insets = useSafeAreaInsets();

  const [bodyContainerHeight, setBodyContainerHeight] = useState(0);
  const [topHeight, setTopHeight] = useState(0);
  const [itemHeights, setItemHeights] = useState<Record<BodyItemKey, number>>({
    quickPay: 0,
    categories: 0,
    recent: 0,
    footer: 0,
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

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View
        style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}
        onLayout={onTopLayout}
      >
        <BillsHeader />
        <TotalBillsCard />
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
          <View onLayout={makeItemLayoutHandler("quickPay")}>
            <QuickPayRow />
          </View>
          
          <View onLayout={makeItemLayoutHandler("categories")}>
            <BillCategories />
          </View>
          
          <View onLayout={makeItemLayoutHandler("recent")}>
            <RecentPayments />
          </View>
          
          <View onLayout={makeItemLayoutHandler("footer")}>
            <SecurePaymentsFooter />
          </View>
        </View>
      </ScaleProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingBottom: 4,
    gap: 4,
    backgroundColor: colors.background,
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 20,
  },
});