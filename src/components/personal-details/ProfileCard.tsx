import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { useProfileStore } from '../../store/profileStore';

export function ProfileCard() {
  const { colors: themeColors } = useTheme();
  const { fullName, email, phone } = useProfileStore();

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <View style={styles.left}>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatar, { backgroundColor: themeColors.primaryTint }]}>
            <Text style={[styles.avatarText, { color: themeColors.primaryLight }]}>{initials || 'SA'}</Text>
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
            <Text style={[styles.name, { color: themeColors.textPrimary }]}>{fullName}</Text>
            <View style={[styles.verifiedBadge, { backgroundColor: themeColors.primary }]}>
              <Feather name="check" size={9} color="#fff" />
            </View>
          </View>
          <Text style={[styles.detail, { color: themeColors.textSecondary }]}>{email}</Text>
          <Text style={[styles.detail, { color: themeColors.textSecondary }]}>{phone}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editRow} onPress={() => router.push('/edit-profile')}>
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