import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NotificationsHeader } from '../src/components/notifications/NotificationsHeader';
import { FilterTabs } from '../src/components/notifications/FilterTabs';
import { PushBanner } from '../src/components/notifications/PushBanner';
import { NotificationSection } from '../src/components/notifications/NotificationSection';
import { useTheme } from '../src/theme/ThemeContext';

export default function NotificationsScreen() {
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');
  const { colors: themeColors } = useTheme();

  const { todayItems, yesterdayItems, thisWeekItems } = useMemo(
    () => ({
      todayItems: [
        {
          icon: 'arrow-down-left' as const,
          iconBg: '#1DB954',
          title: 'Money received',
          sub: 'Oluwaseun O. sent you',
          highlight: '+ NGN 15,000.00',
          highlightColor: themeColors.success,
          time: '9:26 AM',
          unread: true,
        },
        {
          icon: 'arrow-up-right' as const,
          iconBg: themeColors.primary,
          title: 'Transfer successful',
          sub: 'You sent NGN 25,000.00 to Ibrahim S.',
          time: '9:15 AM',
          unread: true,
        },
        {
          icon: 'credit-card' as const,
          iconBg: '#3D5AFE',
          title: 'Card payment',
          sub: 'Spotify P12A6K  •  NGN 2,500.00',
          time: '8:21 AM',
          unread: true,
        },
        {
          icon: 'bell' as const,
          iconBg: '#C77B1E',
          title: 'Security alert',
          sub: 'New login detected on iPhone 15 Pro\nLagos, Nigeria',
          time: '7:48 AM',
          unread: true,
        },
      ],
      yesterdayItems: [
        {
          icon: 'file-text' as const,
          iconBg: '#3D5AFE',
          title: 'Bill payment successful',
          sub: 'You paid NGN 12,500.00 to PHCN Prepaid',
          time: '9:15 PM',
          unread: false,
        },
        {
          icon: 'gift' as const,
          iconBg: themeColors.primary,
          title: 'Cashback earned',
          sub: 'You earned NGN 450.00 from your\nJumia purchase',
          time: '6:32 PM',
          unread: false,
        },
        {
          icon: 'users' as const,
          iconBg: themeColors.primary,
          title: 'Refer & earn update',
          sub: 'Aisha M. joined using your link\nYou earned NGN 1,000.00',
          time: '2:11 PM',
          unread: false,
        },
      ],
      thisWeekItems: [
        {
          icon: 'bar-chart-2' as const,
          iconBg: '#0F9B8E',
          title: 'Investment update',
          sub: 'Your portfolio is up 3.21% this week',
          time: 'Mon, 10:30 AM',
          unread: false,
        },
      ],
    }),
    [themeColors]
  );

  const filterItems = <T extends { unread?: boolean }>(items: T[]) =>
    filter === 'Unread' ? items.filter((i) => i.unread) : items;

  const sections = [
    { title: 'Today', items: filterItems(todayItems), chevron: false },
    { title: 'Yesterday', items: filterItems(yesterdayItems), chevron: true },
    { title: 'This week', items: filterItems(thisWeekItems), chevron: true },
  ].filter((s) => s.items.length > 0);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <NotificationsHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topGroup}>
          <FilterTabs active={filter} onChange={setFilter} />
          {filter === 'All' && <PushBanner />}
        </View>

        {sections.map((s) => (
          <NotificationSection key={s.title} title={s.title} items={s.items} chevron={s.chevron} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 55 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 30, gap: 20 },
  topGroup: { gap: 8 },
});