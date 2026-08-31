import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function GiftCardsHeader() {
  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={17} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.title}>Gift Cards</Text>
        </View>
       <TouchableOpacity
                   style={styles.tradeBtn}
                   onPress={() => router.push('/gift-card-trading')}
                 >
                   <Feather name="repeat" size={10} color={colors.primaryLight} />
                   <Text style={styles.tradeText}>Trade Card</Text>
                 </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  backBtn: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 17, fontWeight: '700' },
  tradeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1.1, borderColor: colors.primary, borderRadius: 9,
    paddingHorizontal: 9, paddingVertical: 6,
  },
  tradeText: { color: colors.primaryLight, fontSize: 10, fontWeight: '600' },
});