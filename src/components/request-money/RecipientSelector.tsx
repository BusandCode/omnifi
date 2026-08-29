import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export type RecipientMode = 'omnifi' | 'bank' | 'qr' | 'link' | 'saved';

type ModeOption = {
  id: RecipientMode;
  icon: React.ReactNode;
  label: string;
};

const modes: ModeOption[] = [
  { id: 'omnifi', icon: <Feather name="user" size={18} color="#fff" />, label: 'OmniFi\nUser' },
  // { id: 'bank', icon: <MaterialCommunityIcons name="bank" size={18} color={colors.textPrimary} />, label: 'Bank\nAccount' },
  { id: 'qr', icon: <Ionicons name="qr-code" size={18} color={colors.textPrimary} />, label: 'Scan QR\nCode' },
  { id: 'link', icon: <Feather name="link" size={18} color={colors.textPrimary} />, label: 'Share\nPayment Link' },
  { id: 'saved', icon: <Feather name="users" size={18} color={colors.textPrimary} />, label: 'Saved\nRecipients' },
];

type RecipientSelectorProps = {
  value: RecipientMode;
  onChange: (mode: RecipientMode) => void;
};

export function RecipientSelector({ value, onChange }: RecipientSelectorProps) {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>1. Select Recipient</Text>

      <View style={styles.grid}>
        {modes.map((m) => {
          const active = value === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              style={styles.item}
              onPress={() => onChange(m.id)}
            >
              <View style={[styles.iconCircle, active && styles.iconCircleActive]}>
                {m.icon}
              </View>
              <Text style={styles.label} numberOfLines={2}>{m.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {value === 'omnifi' && (
        <View style={styles.searchRow}>
          <Ionicons name="search" size={16} color={colors.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name, email or @username"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
          />
          <TouchableOpacity style={styles.avatarBtn}>
            <Feather name="user" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
wrapper:{marginTop:-8},
  sectionTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '600', marginBottom: 12 },
  grid: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  item: { flex: 1, alignItems: 'center', gap: 6 },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: 'transparent',
  },
  iconCircleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryLight,
  },
  label: { color: colors.textSecondary, fontSize: 9.5, textAlign: 'center', lineHeight: 12 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: { flex: 1, color: colors.textPrimary, fontSize: 12.5 },
  avatarBtn: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
});