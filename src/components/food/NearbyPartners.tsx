// src/components/food/NearbyPartners.tsx
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { foodColors } from '../../constants/foodColors';
import { partners } from '../../constants/foodData';
import { PartnerCard } from './PartnerCard';

export function NearbyPartners() {
  return (
    <View>
      <Text style={styles.heading}>NEARBY PARTNERS</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {partners.map((p) => (
          <PartnerCard key={p.id} partner={p} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 11, fontWeight: '700', color: foodColors.textMuted, letterSpacing: 0.5, marginBottom: 10 },
  row: { gap: 14, paddingRight: 20 },
});