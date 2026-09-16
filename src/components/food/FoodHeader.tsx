// src/components/food/FoodHeader.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { foodColors } from '../../constants/foodColors';

export function FoodHeader({
  location,
  notificationCount,
  cartCount,
  onPressLocation,
  onPressNotifications,
  onPressCart,
  onPressProfile,
}: {
  location: string;
  notificationCount: number;
  cartCount: number;
  onPressLocation?: () => void;
  onPressNotifications?: () => void;
  onPressCart?: () => void;
  onPressProfile?: () => void;
}) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.locationBlock} onPress={onPressLocation}>
        <Text style={styles.label}>DELIVERING TO</Text>
        <View style={styles.locationRow}>
          <Text style={styles.locationText}>{location}</Text>
          <Feather name="chevron-down" size={14} color={foodColors.textPrimary} />
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBtn} onPress={onPressProfile}>
          <Feather name="user" size={18} color={foodColors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={onPressNotifications}>
          <Feather name="bell" size={18} color={foodColors.textPrimary} />
          {notificationCount > 0 && (
            <View style={[styles.badge, { backgroundColor: foodColors.badgeBlue }]}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={onPressCart}>
          <Feather name="shopping-cart" size={18} color={foodColors.textPrimary} />
          {cartCount > 0 && (
            <View style={[styles.badge, { backgroundColor: foodColors.primary }]}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  locationBlock: {},
  label: { fontSize: 10, fontWeight: '700', color: foodColors.textMuted, letterSpacing: 0.5 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  locationText: { fontSize: 15, fontWeight: '700', color: foodColors.textPrimary },
  actions: { flexDirection: 'row', gap: 10 },
  iconBtn: {
    width: 38, height: 38, borderRadius: 12, backgroundColor: foodColors.surface,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  badge: {
    position: 'absolute', top: -3, right: -3, minWidth: 16, height: 16, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3,
    borderWidth: 1.5, borderColor: foodColors.background,
  },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#fff' },
});