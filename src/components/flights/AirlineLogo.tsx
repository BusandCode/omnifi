// AirlineLogo.tsx — colored code badge standing in for an airline logo
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AIRLINES, AirlineCode } from '../../config/flightMockData';

interface Props {
  code: AirlineCode;
  size?: number;
}

export default function AirlineLogo({ code, size = 40 }: Props) {
  const airline = AIRLINES[code];
  return (
    <View
      style={[
        styles.badge,
        { width: size, height: size, borderRadius: size * 0.28, backgroundColor: airline.color },
      ]}
    >
      <Text style={[styles.code, { fontSize: size * 0.32 }]}>{code}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  code: {
    color: '#fff',
    fontWeight: '800',
  },
});
