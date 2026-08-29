import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HelpHeader } from "../src/components/help/HelpHeader";
import { HelpSearchBar } from "../src/components/help/HelpSearchBar";
import { HelpCategoriesGrid } from "../src/components/help/HelpCategoriesGrid";
import { PopularTopics } from "../src/components/help/PopularTopics";
import { NeedMoreHelp } from "../src/components/help/NeedMoreHelp";
import { OtherWaysToGetHelp } from "../src/components/help/OtherWaysToGetHelp";
import { CantFindFooter } from "../src/components/help/CantFindFooter";
import { colors } from "../src/theme/colors";

export default function HelpScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <HelpHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <HelpSearchBar />
        <HelpCategoriesGrid />
        <PopularTopics />
        <NeedMoreHelp />
        <OtherWaysToGetHelp />
      </ScrollView>

      <View style={[styles.fixedFooter, { paddingBottom: insets.bottom }]}>
        <CantFindFooter />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 8,
    gap: 20,
  },
  fixedFooter: {
    paddingHorizontal: 10,
    paddingTop: 12,
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});