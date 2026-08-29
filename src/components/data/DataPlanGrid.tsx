import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { DataPlan } from '../../../app/data';

type Props = {
  plans: DataPlan[];
  selected: DataPlan | null;
  onSelect: (p: DataPlan) => void;
};

export function DataPlanGrid({ plans, selected, onSelect }: Props) {
  return (
    <View style={styles.grid}>
      {plans.map((p) => {
        const active = !!selected && p.size === selected.size && p.price === selected.price;
        return (
          <TouchableOpacity
            key={p.size + p.price}
            style={[styles.card, active && styles.cardActive]}
            onPress={() => onSelect(p)}
            activeOpacity={0.8}
          >
            {p.popular && (
              <View style={styles.popularTag}>
                <Text style={styles.popularText}>Popular</Text>
              </View>
            )}
            {active && (
              <View style={styles.checkBadge}>
                <Feather name="check" size={9} color="#fff" />
              </View>
            )}
            <Text style={styles.size} numberOfLines={1} adjustsFontSizeToFit>{p.size}</Text>
            <Text style={styles.validity} numberOfLines={1}>Validity: {p.validity}</Text>
            <Text style={[styles.price, active && styles.priceActive]}>₦{p.price.toLocaleString()}.00</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const CARD_GAP = 8;

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: CARD_GAP, marginBottom: 4 },
  card: {
    width: `${(100 - 2 * (CARD_GAP / 3.5)) / 3}%`,
    backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', position: 'relative',
  },
  cardActive: { borderColor: colors.primary, backgroundColor: 'rgba(167,139,250,0.15)' },
  popularTag: {
    position: 'absolute', top: -8, right: 6,
    backgroundColor: colors.primary, paddingHorizontal: 5, paddingVertical: 1.5, borderRadius: 5,
  },
  popularText: { color: '#fff', fontSize: 7, fontWeight: '700' },
  checkBadge: {
    position: 'absolute', top: 6, right: 6,
    width: 16, height: 16, borderRadius: 8, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  size: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700', marginBottom: 4 },
  validity: { color: colors.textSecondary, fontSize: 8.5, marginBottom: 4 },
  price: { color: colors.textPrimary, fontSize: 10.5, fontWeight: '600' },
  priceActive: { color: colors.primaryLight },
});