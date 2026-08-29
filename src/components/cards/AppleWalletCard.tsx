import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function AppleWalletCard() {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name="card" size={18} color="#4C3D8F" />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>Add to Apple Wallet</Text>
        <Text style={styles.sub}>Tap to add this card to Apple Wallet</Text>
      </View>

      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="logo-apple" size={13} color="#fff" />
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    marginTop:-7.5
  },
  iconBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
  },
  textBlock: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 13, fontWeight: '600' },
  sub: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#000', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10,
    borderWidth: 1, borderColor: '#3A3A3C',
  },
  addText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});