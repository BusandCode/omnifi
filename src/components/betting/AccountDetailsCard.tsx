// src/components/betting/AccountDetailsCard.tsx
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { Platform } from './PopularPlatforms';

type Props = {
  platform: Platform;
  username: string;
  onChangeUsername: (v: string) => void;
  onChangePlatform: () => void;
};

export function AccountDetailsCard({ platform, username, onChangeUsername, onChangePlatform }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>Account Details</Text>

      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <View style={styles.row}>
          <View style={[styles.iconBox, { backgroundColor: platform.bg }]}>
            <Text style={[styles.iconLabel, { color: platform.labelColor }]} numberOfLines={1}>
              {platform.label}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>Platform</Text>
            <Text style={[styles.rowValue, { color: themeColors.textPrimary }]}>{platform.name}</Text>
          </View>
          <TouchableOpacity
            style={[styles.changeBtn, { backgroundColor: themeColors.primaryTint }]}
            onPress={onChangePlatform}
          >
            <Text style={[styles.changeText, { color: themeColors.primaryLight }]}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.divider, { borderBottomColor: themeColors.border }]} />

        <View style={styles.inputBlock}>
          <Text style={[styles.rowLabel, { color: themeColors.textSecondary }]}>
            {platform.name} Username or Account ID
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              value={username}
              onChangeText={onChangeUsername}
              placeholder="Enter username or account ID"
              placeholderTextColor={themeColors.textSecondary}
              style={[styles.input, { color: themeColors.textPrimary }]}
            />
            <TouchableOpacity hitSlop={8}>
              <Feather name="user" size={16} color={themeColors.primaryLight} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={[styles.helper, { color: themeColors.textSecondary }]}>
        Enter your {platform.name} username or account ID correctly.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 13, fontWeight: '600', marginBottom: 12 },
  card: { borderRadius: 16, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  divider: { borderBottomWidth: 1 },
  iconBox: {
    width: 38, height: 38, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  iconLabel: { fontSize: 8, fontWeight: '800' },
  textContainer: { flex: 1 },
  rowLabel: { fontSize: 10.5 },
  rowValue: { fontSize: 14, fontWeight: '700', marginTop: 2 },
  changeBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  changeText: { fontSize: 11.5, fontWeight: '700' },
  inputBlock: { paddingVertical: 14 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  input: { flex: 1, fontSize: 15, fontWeight: '600', padding: 0 },
  helper: { fontSize: 10.5, marginTop: 8, marginLeft: 2 },
});