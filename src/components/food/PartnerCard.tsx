// src/components/food/PartnerCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { foodColors } from '../../constants/foodColors';
import { Partner } from '../../constants/foodData';

export function PartnerCard({ partner, onPress }: { partner: Partner; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: partner.image }} style={styles.image} />
        <View style={styles.logo}>
          <Image source={{ uri: partner.logo }} style={styles.logoImage} />
        </View>
      </View>
      <Text style={styles.name}>{partner.name}</Text>
      <View style={styles.metaRow}>
        <Feather name="star" size={11} color={foodColors.primary} />
        <Text style={styles.meta}>{partner.rating} • {partner.etaMinutes} min</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: 160 },
  imageWrap: { width: 160, height: 100, borderRadius: 14, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  logo: {
    position: 'absolute', bottom: -14, left: 10, width: 34, height: 34, borderRadius: 17,
    borderWidth: 2, borderColor: foodColors.background, overflow: 'hidden', backgroundColor: '#fff',
  },
  logoImage: { width: '100%', height: '100%' },
  name: { fontSize: 13, fontWeight: '700', color: foodColors.textPrimary, marginTop: 18 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  meta: { fontSize: 11, color: foodColors.textSecondary },
});