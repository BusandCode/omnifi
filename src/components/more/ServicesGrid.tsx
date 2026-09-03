// ServicesGrid.tsx — 3-column wrap grid of ServiceGridCard tiles
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ServiceGridCard from './ServiceGridCard';
import { MoreService } from '../../config/moreServices';

interface Props {
  services: MoreService[];
  onServicePress?: (service: MoreService) => void;
}

export default function ServicesGrid({ services, onServicePress }: Props) {
  return (
    <View style={styles.grid}>
      {services.map((service) => (
        <ServiceGridCard
          key={service.key}
          service={service}
          onPress={() => onServicePress?.(service)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
