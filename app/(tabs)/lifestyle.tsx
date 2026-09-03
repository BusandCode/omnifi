import { ScrollView, StyleSheet, View } from "react-native";
import { CategoriesRow } from "../../src/components/lifestyle/CategoriesRow";
import { ExclusiveOffers } from "../../src/components/lifestyle/ExclusiveOffers";
import { FeaturedCarousel } from "../../src/components/lifestyle/FeaturedCarousel";
import { LifestyleBalanceCard } from "../../src/components/lifestyle/LifestyleBalanceCard";
import { LifestyleHeader } from "../../src/components/lifestyle/LifestyleHeader";
import { ReferEarnCard } from "../../src/components/lifestyle/ReferEarnCard";
import { colors } from "../../src/theme/colors";
import { useTheme } from "../../src/theme/ThemeContext";

export default function LifestyleScreen() {
  const { colors: themeColors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View style={styles.header}>
        <LifestyleHeader />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LifestyleBalanceCard />
        <CategoriesRow />
        <FeaturedCarousel />
        <ExclusiveOffers />
        <ReferEarnCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: 20,
    paddingTop: 46,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 32,
    gap: 10,
  },
});
