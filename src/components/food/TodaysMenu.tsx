// src/components/food/TodaysMenu.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { foodColors } from '../../constants/foodColors';
import { todaysMenu } from '../../constants/foodData';
import { MenuItemCard } from './MenuItemCard';

export function TodaysMenu({ onAddItem }: { onAddItem?: (itemId: string, qty: number) => void }) {
  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Today's Menu</Text>
          <Text style={styles.subtitle}>Fresh, hot and ready to order</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All →</Text>
        </TouchableOpacity>
      </View>

      <View style={{ gap: 12 }}>
        {todaysMenu.map((item) => (
          <MenuItemCard key={item.id} item={item} onAdd={(qty) => onAddItem?.(item.id, qty)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '700', color: foodColors.textPrimary },
  subtitle: { fontSize: 11, color: foodColors.textSecondary, marginTop: 2 },
  seeAll: { fontSize: 12, fontWeight: '600', color: foodColors.primary },
});