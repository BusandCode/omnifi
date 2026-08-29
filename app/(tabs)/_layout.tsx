// app/(tabs)/_layout.tsx
import { View, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme/colors';

type IoniconName = keyof typeof Ionicons.glyphMap;

const ICONS: Record<string, { outline: IoniconName; filled: IoniconName }> = {
  home: { outline: 'home-outline', filled: 'home' },
  invest: { outline: 'bar-chart-outline', filled: 'bar-chart' },
  cards: { outline: 'card-outline', filled: 'card' },
  lifestyle: { outline: 'grid-outline', filled: 'grid' },
};

function TabIcon({
  tab,
  color,
  focused,
}: {
  tab: keyof typeof ICONS;
  color: string;
  focused: boolean;
}) {
  const { outline, filled } = ICONS[tab];
  return (
    <View style={styles.iconWrap}>
      {focused && <View style={styles.iconGlow} />}
      <Ionicons name={focused ? filled : outline} size={22} color={color} />
    </View>
  );
}

function PayButton({ focused }: { focused: boolean }) {
  return (
    <View style={styles.payWrap}>
      {focused && <View style={styles.payGlow} />}
      <Ionicons
        name={focused ? 'arrow-up-circle' : 'arrow-up-circle-outline'}
        size={24}
        color={focused ? colors.primaryLight : colors.textSecondary}
      />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            height: 56 + (Platform.OS === 'ios' ? insets.bottom : insets.bottom + 12),
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : insets.bottom + 8,
          },
        ],
        tabBarActiveTintColor: colors.primaryLight,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <TabIcon tab="home" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          title: 'Invest',
          tabBarIcon: ({ color, focused }) => <TabIcon tab="invest" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="pay"
        options={{
          title: 'Pay',
          tabBarIcon: ({ focused }) => <PayButton focused={focused} />,
          tabBarLabelStyle: styles.label,
          tabBarItemStyle: styles.item,
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, focused }) => <TabIcon tab="cards" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          title: 'Lifestyle',
          tabBarIcon: ({ color, focused }) => <TabIcon tab="lifestyle" color={color} focused={focused} />,
        }}
      />
      {/* <Tabs.Screen
        name="notifications"
        options={{
          href: null,
        }}
      /> */}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 0.5,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: 'transparent',
    overflow: 'hidden',
  },
  item: {
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlow: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    opacity: 0.1,
    shadowColor: colors.primary,
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  payWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  payGlow: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    opacity: 0.4,
    shadowColor: colors.primary,
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
});