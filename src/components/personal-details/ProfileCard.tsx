import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function ProfileCard() {
  const { colors: themeColors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <View style={styles.left}>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatar, { backgroundColor: themeColors.primaryTint }]}>
            <Text style={[styles.avatarText, { color: themeColors.primaryLight }]}>SA</Text>
          </View>
          <View
            style={[
              styles.editBadge,
              { backgroundColor: themeColors.primary, borderColor: themeColors.surface },
            ]}
          >
            <Feather name="edit-2" size={9} color="#fff" />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: themeColors.textPrimary }]}>Silver Abdul</Text>
            <View style={[styles.verifiedBadge, { backgroundColor: themeColors.primary }]}>
              <Feather name="check" size={9} color="#fff" />
            </View>
          </View>
          <Text style={[styles.detail, { color: themeColors.textSecondary }]}>silverabdul@email.com</Text>
          <Text style={[styles.detail, { color: themeColors.textSecondary }]}>+234 803 123 4567</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editRow}>
        <Text style={[styles.editText, { color: themeColors.primaryLight }]}>Edit Profile</Text>
        <Feather name="chevron-right" size={13} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 14 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '700' },
  editBadge: {
    position: 'absolute', bottom: -2, right: -2,
    width: 18, height: 18, borderRadius: 9,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  name: { fontSize: 14, fontWeight: '700' },
  verifiedBadge: {
    width: 15, height: 15, borderRadius: 7.5,
    justifyContent: 'center', alignItems: 'center',
  },
  detail: { fontSize: 11, marginTop: 2 },
  editRow: { flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', gap: 3 },
  editText: { fontSize: 11.5, fontWeight: '600' },
});