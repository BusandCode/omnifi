// src/components/food/MenuItemCard.tsx
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { foodColors } from '../../constants/foodColors';
import { MenuItem } from '../../constants/foodData';

export function MenuItemCard({ item, onAdd }: { item: MenuItem; onAdd?: (qty: number) => void }) {
  const [qty, setQty] = useState(1);
  const priceFmt = `₦${item.price.toLocaleString('en-US')}`;

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.partnerName}>{item.partnerName}</Text>

        {item.isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>🔥 POPULAR</Text>
          </View>
        )}

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{priceFmt}</Text>
          <View style={styles.metaRow}>
            <Feather name="star" size={10} color={foodColors.primary} />
            <Text style={styles.meta}>{item.rating} • {item.etaMinutes} min</Text>
          </View>
        </View>
      </View>

      <View style={styles.imageWrap}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.stepper}>
          <TouchableOpacity onPress={() => setQty((q) => Math.max(1, q - 1))} style={styles.stepBtn}>
            <Feather name="minus" size={11} color={foodColors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.stepValue}>{qty}</Text>
          <TouchableOpacity onPress={() => setQty((q) => q + 1)} style={styles.stepBtn}>
            <Feather name="plus" size={11} color={foodColors.textPrimary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={() => onAdd?.(qty)}>
          <Feather name="plus" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: foodColors.surface, borderRadius: 16, padding: 14,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  info: { flex: 1, paddingRight: 10 },
  partnerName: { fontSize: 10, fontWeight: '700', color: foodColors.primary, letterSpacing: 0.3 },
  popularBadge: {
    alignSelf: 'flex-start', backgroundColor: foodColors.popularBg, borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2, marginTop: 4,
  },
  popularText: { fontSize: 9, fontWeight: '700', color: foodColors.popularText },
  name: { fontSize: 14, fontWeight: '700', color: foodColors.textPrimary, marginTop: 6 },
  description: { fontSize: 10.5, color: foodColors.textSecondary, marginTop: 2, lineHeight: 14 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  price: { fontSize: 14, fontWeight: '700', color: foodColors.textPrimary },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  meta: { fontSize: 10, color: foodColors.textSecondary },
  imageWrap: { width: 96, height: 96 },
  image: { width: '100%', height: '100%', borderRadius: 12 },
  stepper: {
    position: 'absolute', bottom: 6, left: 6, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 4, height: 22, gap: 6,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 3, elevation: 2,
  },
  stepBtn: { width: 16, height: 16, justifyContent: 'center', alignItems: 'center' },
  stepValue: { fontSize: 11, fontWeight: '700', color: foodColors.textPrimary },
  addBtn: {
    position: 'absolute', bottom: -8, right: -8, width: 30, height: 30, borderRadius: 15,
    backgroundColor: foodColors.primary, justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: foodColors.background,
  },
});