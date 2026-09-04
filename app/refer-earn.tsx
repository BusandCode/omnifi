import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReferEarnHeader } from '../src/components/refer-earn/ReferEarnHeader';
import { ReferEarnHero } from '../src/components/refer-earn/ReferEarnHero';
import { EarningsStatsCard } from '../src/components/refer-earn/EarningsStatsCard';
import { HowItWorksReferral } from '../src/components/refer-earn/HowItWorksReferral';
import { ReferralLinkCard } from '../src/components/refer-earn/ReferralLinkCard';
import { RewardsYouEarn } from '../src/components/refer-earn/RewardsYouEarn';
import { TopReferrers } from '../src/components/refer-earn/TopReferrers';
import { useTheme } from '../src/theme/ThemeContext';

export default function ReferEarnScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.background, paddingTop: insets.top + 8, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.fixedHeader}>
        <ReferEarnHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ReferEarnHero />
        <EarningsStatsCard
          totalEarnings={128600}
          earningsThisMonth={18500}
          successfulReferrals={28}
          referralsThisMonth={6}
          availableBalance={52600}
          pendingBalance={76000}
        />
        <HowItWorksReferral />
        <ReferralLinkCard referralLink="https://omnifi.app/r/SILVERABDUL" />
        <RewardsYouEarn />
        <TopReferrers />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fixedHeader: { paddingHorizontal: 20, paddingBottom: 12 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 24, gap: 16 },
});