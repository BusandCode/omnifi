import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftCardsHeader } from '../src/components/gift-cards/GiftCardsHeader';
import { GiftWalletCard } from '../src/components/gift-cards/GiftWalletCard';
import { GiftSearchBar } from '../src/components/gift-cards/GiftSearchBar';
import { CategoryTabs, GiftCategory } from '../src/components/gift-cards/CategoryTabs';
import { PopularGiftCards } from '../src/components/gift-cards/PopularGiftCards';
import { AllGiftCardsList } from '../src/components/gift-cards/AllGiftCardsList';
import { SafeSecureBanner } from '../src/components/gift-cards/SafeSecureBanner';
import { colors } from '../src/theme/colors';

export default function GiftCardsScreen() {
  const [category, setCategory] = useState<GiftCategory>('all');

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
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
  container: { flex: 1, backgroundColor: colors.background },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: colors.background,
  },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 4, paddingBottom: 30, gap: 18 },
});