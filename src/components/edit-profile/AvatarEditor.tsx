import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  initials: string;
  onChangePhoto?: () => void;
};

export function AvatarEditor({ initials, onChangePhoto }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.wrap}>
      <View style={styles.avatarWrap}>
        <View style={[styles.avatar, { backgroundColor: themeColors.primaryTint }]}>
          <Text style={[styles.avatarText, { color: themeColors.primaryLight }]}>{initials}</Text>
        </View>
        <TouchableOpacity
          onPress={onChangePhoto}
          style={[styles.editBadge, { backgroundColor: themeColors.primary, borderColor: themeColors.background }]}
          hitSlop={6}
        >
          <Feather name="camera" size={13} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onChangePhoto}>
        <Text style={[styles.changeText, { color: themeColors.primaryLight }]}>Change Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 10 },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: '700' },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2.5,
  },
  changeText: { fontSize: 12.5, fontWeight: '600' },
});