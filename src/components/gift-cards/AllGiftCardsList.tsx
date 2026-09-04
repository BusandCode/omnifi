// src/components/gift-cards/AllGiftCardsList.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { GiftCategory } from './CategoryTabs';

type GiftCard = {
  id: string;
  name: string;
  tag: string;
  category: Exclude<GiftCategory, 'all'>;
  markets: string;
  from: string;
  bg: string;
  icon: React.ReactNode;
};

const allCards: GiftCard[] = [
  { id: 'amazon', name: 'Amazon', tag: 'E-Commerce', category: 'ecommerce', markets: 'Available in NGN & USD', from: '₦480 / $1', bg: '#1A1A1A', icon: <FontAwesome5 name="amazon" size={16} color="#fff" /> },
  { id: 'apple', name: 'Apple', tag: 'E-Commerce', category: 'ecommerce', markets: 'Available in NGN & USD', from: '₦500 / $1', bg: '#4A1F8C', icon: <Ionicons name="logo-apple" size={18} color="#fff" /> },
  { id: 'steam', name: 'Steam', tag: 'Gaming', category: 'gaming', markets: 'Available in NGN & USD', from: '₦450 / $1', bg: '#1B2838', icon: <FontAwesome5 name="steam" size={15} color="#fff" /> },
  { id: 'spotify', name: 'Spotify', tag: 'Entertainment', category: 'entertainment', markets: 'Available in NGN & USD', from: '₦350 / $1', bg: '#0F3D24', icon: <FontAwesome5 name="spotify" size={15} color="#1DB954" /> },
  { id: 'uber', name: 'Uber', tag: 'Transport', category: 'more', markets: 'Available in NGN', from: '₦300 / $1', bg: '#000', icon: <FontAwesome5 name="uber" size={13} color="#fff" /> },
];

export function AllGiftCardsList({ category }: { category: GiftCategory }) {
  const { colors: themeColors } = useTheme();
  const filtered = category === 'all' ? allCards : allCards.filter((c) => c.category === category);

  return (
    <View>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>All Gift Cards</Text>
      <View style={{ gap: 8 }}>
        {filtered.map((c) => (
          <TouchableOpacity key={c.id} style={[styles.row, { backgroundColor: themeColors.surface }]}>
            <View style={[styles.iconCircle, { backgroundColor: c.bg }]}>{c.icon}</View>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={[styles.name, { color: themeColors.textPrimary }]}>{c.name}</Text>
                <View style={[styles.tagPill, { backgroundColor: themeColors.primaryTint }]}>
                  <Text style={[styles.tagText, { color: themeColors.primaryLight }]}>{c.tag}</Text>
                </View>
              </View>
              <Text style={[styles.markets, { color: themeColors.textSecondary }]}>{c.markets}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.fromLabel, { color: themeColors.textSecondary }]}>From</Text>
              <Text style={[styles.fromValue, { color: themeColors.textPrimary }]}>{c.from}</Text>
            </View>
            <Feather name="chevron-right" size={14} color={themeColors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 12, fontWeight: '700', marginBottom: 12, marginTop: -8 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 14, padding: 12, marginTop: -7,
  },
  iconCircle: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  name: { fontSize: 12.5, fontWeight: '600' },
  tagPill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5 },
  tagText: { fontSize: 8.5, fontWeight: '700' },
  markets: { fontSize: 10, marginTop: 3 },
  fromLabel: { fontSize: 9 },
  fromValue: { fontSize: 11, fontWeight: '600', marginTop: 1 },
});