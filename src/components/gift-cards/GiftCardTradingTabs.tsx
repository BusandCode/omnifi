// src/components/gift-cards/GiftCardTradingTabs.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export type TradeTab = 'buy' | 'sell';

type Props = {
  active: TradeTab;
  onChange: (t: TradeTab) => void;
};

export function GiftCardTradingTabs({ active, onChange }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.row, { backgroundColor: themeColors.surface }]}>
      <TouchableOpacity
        style={[styles.tab, active === 'buy' && { backgroundColor: themeColors.primary }]}
        onPress={() => onChange('buy')}
      >
        <Text
          style={[
            styles.label,
            { color: themeColors.textSecondary },
            active === 'buy' && { color: '#fff' },
          ]}
        >
          Buy Gift Card
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, active === 'sell' && { backgroundColor: themeColors.primary }]}
        onPress={() => onChange('sell')}
      >
        <Text
          style={[
            styles.label,
            { color: themeColors.textSecondary },
            active === 'sell' && { color: '#fff' },
          ]}
        >
          Sell Gift Card
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: 'center',
  },
  label: { fontSize: 12.5, fontWeight: '600' },
});