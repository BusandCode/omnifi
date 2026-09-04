// DestinationCard.tsx — photo card for a popular destination, used in a horizontal scroller
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Destination } from '../../config/flightMockData';

interface Props {
  destination: Destination;
  onPress?: () => void;
}

export default function DestinationCard({ destination, onPress }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <Pressable style={[styles.card, { backgroundColor: themeColors.surface }]} onPress={onPress}>
      <Image source={{ uri: destination.image }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.textWrap}>
        <Text style={styles.city}>{destination.city}</Text>
        <Text style={styles.price}>
          from <Text style={styles.priceValue}>{destination.fromPrice}</Text>
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    height: 90,
    borderRadius: 14,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 8, 18, 0.45)',
  },
  textWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 8,
  },
  city: {
    color: '#fff',
    fontSize: 12.5,
    fontWeight: '700',
  },
  price: {
    color: '#E7E1F5',
    fontSize: 9.5,
    marginTop: 2,
  },
  priceValue: {
    color: '#C9A9FF',
    fontWeight: '700',
  },
});