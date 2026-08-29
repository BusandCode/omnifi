import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PayHeader } from "@/src/components/pay/PayHeader";
import { BillsGrid } from "../../src/components/pay/BillsGrid";
import { PayAgainRow } from "../../src/components/pay/PayAgainRow";
import { PayQuickActions } from "../../src/components/pay/PayQuickActions";
import { PaySearchBar } from "../../src/components/pay/PaySearchBar";
import { RecentPayments } from "../../src/components/pay/RecentPayments";
import { colors } from "../../src/theme/colors";

export default function PayScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedTop, { paddingTop: insets.top + 8 }]}>
        <PayHeader />
        <PaySearchBar />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <PayQuickActions />
        <PayAgainRow />
        <BillsGrid />
        <RecentPayments />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fixedTop: {
    paddingHorizontal: 20,
    paddingBottom: 4,
    gap: 4,
  },
  scroll: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
    gap: 8,
  },
});