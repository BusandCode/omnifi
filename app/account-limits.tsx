// app/account-limits.tsx — Expo Router screen composing the account-limits components
import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors } from '../src/theme/colors';
import { TIER_CONFIGS, TierNumber } from '../src/config/tierConfig';
import AccountLimitsHeader from '../src/components/account-limits/AccountLimitsHeader';
import VerificationLevelCard from '../src/components/account-limits/VerificationLevelCard';
import LimitsListCard from '../src/components/account-limits/LimitsListCard';
import UnlockTierCard from '../src/components/account-limits/UnlockTierCard';
import AccountLimitsFooter from '../src/components/account-limits/AccountLimitsFooter';
import TierDevSwitcher from '../src/components/account-limits/TierDevSwitcher';

export default function AccountLimitsScreen() {
  const router = useRouter();
  const { tier } = useLocalSearchParams<{ tier?: string }>();

  const parsedTier = Number(tier);
  const initialTier: TierNumber =
    parsedTier === 1 || parsedTier === 2 || parsedTier === 3 ? parsedTier : 1;

  const [activeTier, setActiveTier] = useState<TierNumber>(initialTier);
  const config = useMemo(() => TIER_CONFIGS[activeTier], [activeTier]);

  return (
    <View style={styles.screen}>
      <AccountLimitsHeader
        onBack={() => router.back()}
        filledShield={config.tier === 3}
      />

      {__DEV__ && <TierDevSwitcher activeTier={activeTier} onChange={setActiveTier} />}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
                    pathname: '/kyc/upgrade',
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 2,
    paddingBottom: 16,
  },
});