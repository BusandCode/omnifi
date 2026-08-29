import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

type GiftCard = {
  id: string;
  name: string;
  from: string;
  bg: string;
  icon: React.ReactNode;
};

const giftCards: GiftCard[] = [
  { id: 'amazon', name: 'Amazon', from: '₦480 / $1', bg: '#1A1A1A', icon: <FontAwesome5 name="amazon" size={18} color="#fff" /> },
  { id: 'apple', name: 'Apple', from: '₦500 / $1', bg: '#4A1F8C', icon: <Ionicons name="logo-apple" size={20} color="#fff" /> },
  { id: 'steam', name: 'Steam', from: '₦450 / $1', bg: '#1B2838', icon: <FontAwesome5 name="steam" size={16} color="#fff" /> },
  { id: 'googleplay', name: 'Google Play', from: '₦470 / $1', bg: '#0F3D2E', icon: <Ionicons name="logo-google-playstore" size={16} color="#fff" /> },
];

export function GiftCardsSection() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(12),
      styles: StyleSheet.create({
        header: { 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: s(10) 
        },
        title: { color: colors.textPrimary, fontSize: f(13.5), fontWeight: '700' },
        sub: { color: colors.textSecondary, fontSize: f(10), marginTop: s(2) },
        viewAll: { flexDirection: 'row', alignItems: 'center', gap: s(2) },
        viewAllText: { color: colors.primaryLight, fontSize: f(10.5), fontWeight: '600' },
        row: { gap: s(8) },
        card: { 
          width: s(108), 
          height: s(128), 
          borderRadius: s(14), 
          padding: s(10), 
          justifyContent: 'space-between' 
        },
        iconWrap: { alignSelf: 'flex-start' },
        cardName: { color: colors.textPrimary, fontSize: f(11.5), fontWeight: '700', marginBottom: s(3) },
        cardFromLabel: { color: 'rgba(255,255,255,0.5)', fontSize: f(8) },
        cardFrom: { color: colors.textPrimary, fontSize: f(10), fontWeight: '600', marginTop: s(1) },
        textContainer: { flex: 1 },
      }),
    };
  }, [layoutScale]);

  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Gift Cards</Text>
          <Text style={styles.sub}>Buy, sell and trade gift cards instantly</Text>
        </View>
        <TouchableOpacity style={styles.viewAll}>
          <Text style={styles.viewAllText}>View All</Text>
          <Feather name="chevron-right" size={iconSize} color={colors.primaryLight} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {giftCards.map((g) => (
          <TouchableOpacity key={g.id} style={[styles.card, { backgroundColor: g.bg }]}>
            <View style={styles.iconWrap}>{g.icon}</View>
            <View>
              <Text style={styles.cardName}>{g.name}</Text>
              <Text style={styles.cardFromLabel}>From</Text>
              <Text style={styles.cardFrom}>{g.from}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}