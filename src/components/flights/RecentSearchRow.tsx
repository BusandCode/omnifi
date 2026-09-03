// RecentSearchRow.tsx — single row inside the "Recent searches" list
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronRight, Plane, Building2, Car } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { RecentSearch } from '../../config/flightMockData';

const ICONS = { flight: Plane, hotel: Building2, car: Car };

interface Props {
  search: RecentSearch;
  onPress?: () => void;
}

export default function RecentSearchRow({ search, onPress }: Props) {
  const Icon = ICONS[search.icon];
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.iconBubble}>
        <Icon color={colors.primary} size={15} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{search.title}</Text>
        <Text style={styles.subtitle}>{search.subtitle}</Text>
      </View>
      <ChevronRight color={colors.textSecondary} size={16} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 8,
  },
  iconBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 11.5,
    fontWeight: '600',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 9.5,
    marginTop: 2,
  },
});
