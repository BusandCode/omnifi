// TierDevSwitcher.tsx — dev-only floating pill to preview Tier 1/2/3 states.
// Remove or hide behind __DEV__ before shipping to production.
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { TierNumber } from '../../config/tierConfig';

interface Props {
  activeTier: TierNumber;
  onChange: (tier: TierNumber) => void;
}

export default function TierDevSwitcher({ activeTier, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      {([1, 2, 3] as TierNumber[]).map((t) => {
        const active = t === activeTier;
        return (
          <Pressable
            key={t}
            onPress={() => onChange(t)}
            style={[styles.pill, active && styles.pillActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>Tier {t}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 4,
  },
  pill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 9,
    alignItems: 'center',
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12.5,
    fontWeight: '600',
  },
  labelActive: {
    color: '#fff',
  },
});