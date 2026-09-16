// src/components/food/ViewOrderBar.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { foodColors } from '../../constants/foodColors';

export function ViewOrderBar({
  itemCount,
  total,
  onPress,
}: {
  itemCount: number;
  total: number;
  onPress?: () => void;
}) {
  if (itemCount === 0) return null;
  const totalFmt = `₦${total.toLocaleString('en-US')}`;

  return (
    <TouchableOpacity style={styles.bar} onPress={onPress}>
      <View style={styles.countBadge}>
        <Text style={styles.countText}>{itemCount}</Text>
      </View>
      <Text style={styles.label}>View Order</Text>
      <Text style={styles.total}>{totalFmt}</Text>
      <Feather name="chevron-right" size={16} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: foodColors.primaryDark, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 16,
  },
  countBadge: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
  },
  countText: { fontSize: 11, fontWeight: '700', color: foodColors.primaryDark },
  label: { flex: 1, fontSize: 13, fontWeight: '600', color: '#fff' },
  total: { fontSize: 13, fontWeight: '700', color: '#fff' },
});