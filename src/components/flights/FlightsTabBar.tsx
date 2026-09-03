// FlightsTabBar.tsx — bottom nav shared across the Flights browse screens
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Home, Ticket, Briefcase, Tag, Headphones } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export type FlightsTab = 'home' | 'bookings' | 'trips' | 'offers' | 'support';

const TABS: { key: FlightsTab; label: string; icon: React.ComponentType<any> }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'bookings', label: 'Bookings', icon: Ticket },
  { key: 'trips', label: 'Trips', icon: Briefcase },
  { key: 'offers', label: 'Offers', icon: Tag },
  { key: 'support', label: 'Support', icon: Headphones },
];

interface Props {
  active: FlightsTab;
  onChange?: (tab: FlightsTab) => void;
}

export default function FlightsTabBar({ active, onChange }: Props) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const Icon = tab.icon;
        return (
          <Pressable key={tab.key} style={styles.item} onPress={() => onChange?.(tab.key)}>
            <Icon color={isActive ? colors.primary : colors.textSecondary} size={20} />
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    paddingTop: 10,
    paddingBottom: 6,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.primary,
  },
});
