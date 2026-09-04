// app/gift-cards.tsx
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftCardsHeader } from '../src/components/gift-cards/GiftCardsHeader';
import { GiftWalletCard } from '../src/components/gift-cards/GiftWalletCard';
import { GiftSearchBar } from '../src/components/gift-cards/GiftSearchBar';
import { CategoryTabs, GiftCategory } from '../src/components/gift-cards/CategoryTabs';
import { PopularGiftCards } from '../src/components/gift-cards/PopularGiftCards';
import { AllGiftCardsList } from '../src/components/gift-cards/AllGiftCardsList';
import { SafeSecureBanner } from '../src/components/gift-cards/SafeSecureBanner';
import { useTheme } from '../src/theme/ThemeContext';

export default function GiftCardsScreen() {
  const [category, setCategory] = useState<GiftCategory>('all');
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.fixedHeader, { backgroundColor: themeColors.background }]}>
        <GiftCardsHeader />
        <GiftWalletCard />
        <GiftSearchBar />
        <CategoryTabs active={category} onChange={setCategory} />
      </View>

      <View style={styles.content}>
        <PopularGiftCards />
        <AllGiftCardsList category={category} />
        <SafeSecureBanner />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    gap: 12,
  },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 4, paddingBottom: 30, gap: 18 },
});