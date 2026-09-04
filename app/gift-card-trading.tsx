// app/gift-card-trading.tsx
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GiftCardTradingHeader } from '../src/components/gift-cards/GiftCardTradingHeader';
import { GiftCardTradingTabs, TradeTab } from '../src/components/gift-cards/GiftCardTradingTabs';
import { BuyGiftCardTab } from '../src/components/gift-cards/BuyGiftCardTab';
import { SellGiftCardTab } from '../src/components/gift-cards/SellGiftCardTab';
import { useTheme } from '../src/theme/ThemeContext';

export default function GiftCardTradingScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();
  const [tab, setTab] = useState<TradeTab>('buy');

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { backgroundColor: themeColors.background, paddingTop: insets.top + 8 }]}>
        <GiftCardTradingHeader />
        <GiftCardTradingTabs active={tab} onChange={setTab} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'buy' ? <BuyGiftCardTab /> : <SellGiftCardTab />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 10,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 2,
    paddingBottom: 20,
  },
});