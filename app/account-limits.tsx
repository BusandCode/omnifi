// app/account-limits.tsx — Expo Router screen composing the account-limits components
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AccountLimitsFooter from "../src/components/account-limits/AccountLimitsFooter";
import AccountLimitsHeader from "../src/components/account-limits/AccountLimitsHeader";
import LimitsListCard from "../src/components/account-limits/LimitsListCard";
import UnlockTierCard from "../src/components/account-limits/UnlockTierCard";
import VerificationLevelCard from "../src/components/account-limits/VerificationLevelCard";
import { TIER_CONFIGS } from "../src/config/tierConfig";
import { useAuthStore } from "../src/store/authStore";
import { useTheme } from "../src/theme/ThemeContext";

export default function AccountLimitsScreen() {
  const router = useRouter();
  const { colors: themeColors } = useTheme();
  const accountTier = useAuthStore((state) => state.accountTier);
  const config = useMemo(() => TIER_CONFIGS[accountTier], [accountTier]);

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <AccountLimitsHeader
        onBack={() => router.back()}
        filledShield={config.tier === 3}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <VerificationLevelCard config={config} />
        <LimitsListCard title="Transfer Limits" rows={config.transferLimits} />
        <LimitsListCard title="Wallet Limits" rows={config.walletLimits} />
        <UnlockTierCard config={config} />
        <AccountLimitsFooter
          ctaLabel={config.ctaLabel}
          showFooterHelp={config.showFooterHelp}
          onCtaPress={
            config.tier < 3
              ? () =>
                  router.push({
                    pathname: "/kyc/upgrade",
                    params: { target: String(config.tier + 1) },
                  })
              : undefined
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 2,
    paddingBottom: 16,
  },
});