import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

export type TradeTab = 'buy' | 'sell';

type Props = {
  active: TradeTab;
  onChange: (t: TradeTab) => void;
};

export function GiftCardTradingTabs({ active, onChange }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.tab, active === 'buy' && styles.tabActive]}
        onPress={() => onChange('buy')}
      >
        <Text style={[styles.label, active === 'buy' && styles.labelActive]}>Buy Gift Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, active === 'sell' && styles.tabActive]}
        onPress={() => onChange('sell')}
      >
        <Text style={[styles.label, active === 'sell' && styles.labelActive]}>Sell Gift Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
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
  tabActive: { backgroundColor: colors.primary },
  label: { color: colors.textSecondary, fontSize: 12.5, fontWeight: '600' },
  labelActive: { color: '#fff' },
});