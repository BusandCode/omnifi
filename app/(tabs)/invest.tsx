import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InsightsCard } from "../../src/components/invest/InsightsCard";
import { InvestCategories } from "../../src/components/invest/InvestCategories";
import { InvestHeader } from "../../src/components/invest/InvestHeader";
import { PortfolioChart } from "../../src/components/invest/PortfolioChart";
import { RecurringBanner } from "../../src/components/invest/RecurringBanner";
import { Watchlist } from "../../src/components/invest/Watchlist";
import { colors } from "../../src/theme/colors";
import { useTheme } from "../../src/theme/ThemeContext";

export default function InvestScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View style={[styles.fixedTop, { paddingTop: insets.top + 8 }]}>
        <InvestHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <PortfolioChart />
        <InvestCategories />
        <Watchlist />
        <InsightsCard />
        <RecurringBanner />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  fixedTop: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  scroll: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
    gap: 16,
  },
});
