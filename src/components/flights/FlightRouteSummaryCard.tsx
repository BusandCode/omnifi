// FlightRouteSummaryCard.tsx — thumbnail + route + airline/date summary, reused across the checkout flow
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Pencil } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { AirlineCode, AIRLINES } from '../../config/flightMockData';

interface Props {
  image: string;
  from: string;
  to: string;
  airline: AirlineCode;
  tripType: string;
  cabin: string;
  dateRange: string;
  passengers: string;
  onEdit?: () => void;
}

export default function FlightRouteSummaryCard({
  image,
  from,
  to,
  airline,
  tripType,
  cabin,
  dateRange,
  passengers,
  onEdit,
}: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.thumb} />
      <View style={{ flex: 1 }}>
        <Text style={styles.route}>
          {from} → {to}
        </Text>
        <View style={styles.airlineRow}>
          <View style={[styles.airlineDot, { backgroundColor: AIRLINES[airline].color }]} />
          <Text style={styles.meta}>
            {AIRLINES[airline].name} • {tripType} • {cabin}
          </Text>
        </View>
        <Text style={styles.meta}>
          {dateRange} • {passengers}
        </Text>
      </View>
      {onEdit && (
        <Pressable style={styles.editBtn} onPress={onEdit}>
          <Text style={styles.editText}>Edit</Text>
          <Pencil color={colors.primary} size={12} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 14,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: colors.border,
  },
  route: {
    color: colors.textPrimary,
    fontSize: 13.5,
    fontWeight: '700',
    marginBottom: 3,
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  airlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 10,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  editText: {
    color: colors.primary,
    fontSize: 11.5,
    fontWeight: '700',
  },
});
