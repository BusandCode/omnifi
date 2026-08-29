import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Card = { id: string; name: string; from: string; bg: string; icon: React.ReactNode };

const cards: Card[] = [
  { id: 'amazon', name: 'Amazon', from: '₦480 / $1', bg: '#1A1A1A', icon: <FontAwesome5 name="amazon" size={20} color="#fff" /> },
  { id: 'apple', name: 'Apple', from: '₦500 / $1', bg: '#4A1F8C', icon: <Ionicons name="logo-apple" size={22} color="#fff" /> },
  { id: 'googleplay', name: 'Google Play', from: '₦470 / $1', bg: '#0F3D2E', icon: <Ionicons name="logo-google-playstore" size={18} color="#fff" /> },
  { id: 'netflix', name: 'Netflix', from: '₦600 / $1', bg: '#2A0A0A', icon: <FontAwesome5 name="n" size={18} color="#E50914" /> },
];

export function PopularGiftCards() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Gift Cards</Text>
        <TouchableOpacity style={styles.viewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {cards.map((c) => (
          <TouchableOpacity key={c.id} style={[styles.card, { backgroundColor: c.bg }]}>
            <TouchableOpacity style={styles.heartBtn}>
              <Ionicons name="heart-outline" size={13} color="#fff" />
            </TouchableOpacity>

            <View style={styles.cardContent}>
              {c.icon}
              <Text style={styles.cardName}>{c.name}</Text>
              <Text style={styles.fromLabel}>From</Text>
              <Text style={styles.fromValue}>{c.from}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop: -5,marginBottom:3 },
  title: { color: colors.textPrimary, fontSize: 12, fontWeight: '700' },
  viewAll: { flexDirection: 'row', alignItems: 'center'},
  viewAllText: { color: colors.primaryLight, fontSize: 10.5, fontWeight: '600' },
  row: { gap: 10 },
  card: { width: 118, height: 100, borderRadius: 14, padding: 12,},
  heartBtn: {
    position: 'absolute', top: 10, right: 10,
    width: 19, height: 19, borderRadius: 11, backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center', alignItems: 'center', zIndex: 1,
  },
  cardContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cardName: { color: colors.textPrimary, fontSize: 10, fontWeight: '700', marginTop: 4, textAlign: 'center' },
  fromLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 8.5, marginTop: 3, textAlign: 'center' },
  fromValue: { color: colors.textPrimary, fontSize: 10.5, fontWeight: '600', marginTop: 1, textAlign: 'center' },
});