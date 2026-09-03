// TopDealCard.tsx — deal card with badge, photo, title, and strike-through price
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { TopDeal } from '../../config/flightMockData';

interface Props {
  deal: TopDeal;
  onPress?: () => void;
}

export default function TopDealCard({ deal, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: deal.image }} style={styles.image} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{deal.badge}</Text>
        </View>
        <View style={styles.heartBtn}>
          <Heart color="#fff" size={13} />
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{deal.title}</Text>
        <Text style={styles.subtitle}>{deal.subtitle}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{deal.price}</Text>
          {deal.originalPrice && <Text style={styles.originalPrice}>{deal.originalPrice}</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginRight: 10,
  },
  imageWrap: {
    height: 90,
    backgroundColor: colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.85)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(10, 8, 18, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: 10,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 11.5,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 9.5,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  price: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  originalPrice: {
    color: colors.textSecondary,
    fontSize: 9.5,
    textDecorationLine: 'line-through',
  },
});
