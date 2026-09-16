// src/components/wash/WashTabBar.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { washColors } from '../../constants/washColors';

type TabItem = {
  key: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
};

const tabs: TabItem[] = [
  { key: 'home', label: 'Home', icon: 'home-outline', route: '/' },
  { key: 'echop', label: 'E-Chop', icon: 'room-service-outline', route: '/food' },
  { key: 'ewash', label: 'E-Wash', icon: 'washing-machine', route: '/wash' },
  { key: 'profile', label: 'Profile', icon: 'account-outline', route: '/food/profile' },
];

export function WashTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === '/wash') return pathname === '/wash';
    return pathname === route;
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = isActive(tab.route);
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
          >
            <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
              <MaterialCommunityIcons
                name={tab.icon}
                size={active ? 20 : 22}
                color={active ? '#fff' : washColors.textMuted}
              />
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: washColors.surface,
    paddingVertical: 8,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: washColors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconWrapActive: {
    backgroundColor: washColors.redDark,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: washColors.textMuted,
  },
  labelActive: {
    color: washColors.red,
    fontWeight: '700',
  },
});