import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatementsHeader } from "../src/components/statements/StatementsHeader";
import { AccountSelectorCard } from "../src/components/statements/AccountSelectorCard";
import { StatementsTabs, StatementsTab } from "../src/components/statements/StatementsTabs";
import { FiltersRow } from "../src/components/statements/FiltersRow";
import { AccountStatementsList } from "../src/components/statements/AccountStatementsList";
import { OtherDocumentsGrid } from "../src/components/statements/OtherDocumentsGrid";
import { PasswordProtectedNote } from "../src/components/statements/PasswordProtectedNote";
import { colors } from "../src/theme/colors";

export default function StatementsScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<StatementsTab>("statements");

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <StatementsHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AccountSelectorCard />
        <StatementsTabs active={tab} onChange={setTab} />

        {tab === "statements" ? (
          <>
            <FiltersRow />
            <AccountStatementsList />
          </>
        ) : (
          <OtherDocumentsGrid />
        )}
      </ScrollView>

      <View style={styles.fixedBottom}>
        <PasswordProtectedNote />
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 18,
  },
  fixedBottom: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
});