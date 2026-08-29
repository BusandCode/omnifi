import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function ProfileCard() {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SA</Text>
          </View>
          <View style={styles.editBadge}>
            <Feather name="edit-2" size={9} color="#fff" />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>Silver Abdul</Text>
            <View style={styles.verifiedBadge}>
              <Feather name="check" size={9} color="#fff" />
            </View>
          </View>
          <Text style={styles.detail}>silverabdul@email.com</Text>
          <Text style={styles.detail}>+234 803 123 4567</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editRow}>
        <Text style={styles.editText}>Edit Profile</Text>
        <Feather name="chevron-right" size={13} color={colors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 14 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(167,139,250,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: colors.primaryLight, fontSize: 18, fontWeight: '700' },
  editBadge: {
    position: 'absolute', bottom: -2, right: -2,
    width: 18, height: 18, borderRadius: 9, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: colors.surface,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  name: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  verifiedBadge: {
    width: 15, height: 15, borderRadius: 7.5, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  detail: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  editRow: { flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', gap: 3 },
  editText: { color: colors.primaryLight, fontSize: 11.5, fontWeight: '600' },
});