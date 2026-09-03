import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AccountsList } from "../../src/components/home/AccountsList";
import { BalanceCard } from "../../src/components/home/BalanceCard";
import { Header } from "../../src/components/home/Header";
import { QuickActions } from "../../src/components/home/QuickActions";
import { RecentTransactions } from "../../src/components/home/RecentTransactions";
import { CurrencyCode } from "../../src/constants/currencies";
import { colors } from "../../src/theme/colors";
import { useTheme } from "../../src/theme/ThemeContext";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>("NGN");

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View
        style={[
          styles.fixedTop,
          {
            paddingTop: insets.top + 8,
            backgroundColor: themeColors.background,
          },
        ]}
      >
        <Header name="Abdulsalam" avatarUri="https://i.pravatar.cc/300" />
        <BalanceCard
          visible={balanceVisible}
          onToggleVisible={() => setBalanceVisible((v) => !v)}
          currency={currency}
          onChangeCurrency={setCurrency}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AccountsList visible={balanceVisible} />
        <QuickActions currency={currency} />
        <RecentTransactions currency={currency} />
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
    paddingBottom: 8,
    backgroundColor: colors.background,
    gap: 8,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 8,
    gap: 14,
  },
});
