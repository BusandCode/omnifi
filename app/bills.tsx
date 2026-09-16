import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BillsHeader } from "../src/components/bills/BillsHeader";
import { TotalBillsCard } from "../src/components/bills/TotalBillsCard";
import { QuickPayRow } from "../src/components/bills/QuickPayRow";
import { BillCategories } from "../src/components/bills/BillCategories";
import { RecentPayments } from "../src/components/bills/RecentPayments";
import { SecurePaymentsFooter } from "../src/components/bills/SecurePaymentsFooter";
import { useTheme } from "../src/theme/ThemeContext";

export default function BillsScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: themeColors.background }]}>
      <View
        style={[styles.fixedHeader, { paddingTop: insets.top + 8, backgroundColor: themeColors.background }]}
      >
        <BillsHeader />
        <TotalBillsCard />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 16 }}>
          <QuickPayRow />
        </View>

        <View style={{ marginBottom: 16 }}>
          <BillCategories />
        </View>

        <View style={{ marginBottom: 16 }}>
          <RecentPayments />
        </View>

        <SecurePaymentsFooter />
      </ScrollView>
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
    gap: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingTop: 4,
    paddingBottom: 24,
  },
});