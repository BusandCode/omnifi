// src/components/food/FoodTabBar.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { foodColors } from '../../constants/foodColors';

type TabItem = {
  key: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
  route: string;
};

const tabs: TabItem[] = [
  { key: 'home', label: 'Home', icon: 'home', route: '/' },
  { key: 'echop', label: 'E-Chop', icon: 'coffee', route: '/food' },
  { key: 'ewash', label: 'E-Wash', icon: 'droplet', route: '/wash' },
  { key: 'profile', label: 'Profile', icon: 'user', route: '/food/profile' },
];

export function FoodTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === '/food' && pathname === '/food') return true;
    if (route === '/food/profile' && pathname === '/food/profile') return true;
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
            <Feather
              name={tab.icon}
              size={22}
              color={active ? foodColors.primary : foodColors.textMuted}
            />
            <Text
              style={[
                styles.label,
                active ? styles.labelActive : styles.labelInactive,
              ]}
            >
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
    backgroundColor: foodColors.surface,
    paddingVertical: 8,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
  },
  labelActive: {
    color: foodColors.primary,
  },
  labelInactive: {
    color: foodColors.textMuted,
  },
});