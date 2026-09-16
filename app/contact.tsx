import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContactHeader } from '../src/components/contact/ContactHeader';
import { ContactIntro } from '../src/components/contact/ContactIntro';
import { SupportChannelsCard } from '../src/components/contact/SupportChannelsCard';
import { OfficeCard } from '../src/components/contact/OfficeCard';
import { SupportHoursCard } from '../src/components/contact/SupportHoursCard';
import { FollowUsSection } from '../src/components/contact/FollowUsSection';
import { SatisfactionBanner } from '../src/components/contact/SatisfactionBanner';
import { useTheme } from '../src/theme/ThemeContext';

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: themeColors.background,
        },
        fixedHeader: {
          paddingHorizontal: 20,
          paddingBottom: 12,
          backgroundColor: themeColors.background,
        },
        scroll: {
          flex: 1,
        },
        content: {
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
          gap: 22,
        },
      }),
    [themeColors],
  );

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 8 }]}>
        <ContactHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ContactIntro />
        <SupportChannelsCard />
        <OfficeCard />
        <SupportHoursCard />
        <FollowUsSection />
        <SatisfactionBanner />
      </ScrollView>
    </View>
  );
}