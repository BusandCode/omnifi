// app/food/index.tsx
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { FoodHeader } from '../../src/components/food/FoodHeader';
import { SearchBar } from '../../src/components/food/SearchBar';
import { PromoBanner } from '../../src/components/food/PromoBanner';
import { CategoryTabs } from '../../src/components/food/CategoryTabs';
import { NearbyPartners } from '../../src/components/food/NearbyPartners';
import { TodaysMenu } from '../../src/components/food/TodaysMenu';
import { ViewOrderBar } from '../../src/components/food/ViewOrderBar';
import { FoodTabBar } from '../../src/components/food/FoodTabBar';
import { foodColors } from '../../src/constants/foodColors';
import { FoodCategory } from '../../src/constants/foodData';

export default function FoodScreen() {
  const router = useRouter();
  const [category, setCategory] = useState<FoodCategory>('All');
  const [order, setOrder] = useState<{ count: number; total: number }>({ count: 2, total: 7700 });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FoodHeader 
          location="Lokoja, Kogi" 
          notificationCount={1} 
          cartCount={2} 
          onPressProfile={() => router.push('/food/profile')}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar />
        <PromoBanner />
        <CategoryTabs active={category} onSelect={setCategory} />
        <NearbyPartners />
        <TodaysMenu />
      </ScrollView>

      <View style={styles.footer}>
        <ViewOrderBar itemCount={order.count} total={order.total} />
        <FoodTabBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: foodColors.background },
  header: { paddingHorizontal: 20, paddingTop: 46, paddingBottom: 12 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 16, gap: 18 },
  footer: { 
    backgroundColor: foodColors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.03)',
  },
});