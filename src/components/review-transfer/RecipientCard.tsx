import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  recipientName: string;
  idLabel: string;
  idValue: string;
  refLabel: string;
  refValue: string;
  onEdit?: () => void;
};

function mask(value: string) {
  if (value.length <= 4) return value;
  return `•••• ${value.slice(-4)}`;
}

export function RecipientCard({ recipientName, idLabel, idValue, refLabel, refValue, onEdit }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  wrap: { position: 'relative' },
  arrowWrap: {
    position: 'absolute',
    top: -22,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  arrowCircle: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: themeColors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 3, borderColor: themeColors.background,
  },
  card: { backgroundColor: themeColors.surface, borderRadius: 18, padding: 16, paddingTop: 22 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  label: { color: themeColors.textSecondary, fontSize: 10.5 },
  name: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '700', marginTop: 3 },
  accountRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 },
  accountText: { color: themeColors.textSecondary, fontSize: 11 },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  editText: { color: themeColors.primaryLight, fontSize: 12, fontWeight: '600' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: themeColors.border, marginVertical: 14 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between' },
  value: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '700', marginTop: 0 },
}),
    [themeColors]
  );

  return (
    <View style={styles.wrap}>
      <View style={styles.arrowWrap}>
        <View style={styles.arrowCircle}>
          <Ionicons name="arrow-down" size={14} color="#fff" />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.name}>{recipientName || 'Recipient'}</Text>
            {!!idValue && (
              <View style={styles.accountRow}>
                <Feather name="hash" size={12} color={themeColors.textSecondary} />
                <Text style={styles.accountText}>{idLabel}: {mask(idValue)}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <Text style={styles.editText}>Edit</Text>
            <Feather name="edit-2" size={12} color={themeColors.primaryLight} />
          </TouchableOpacity>
        </View>

        {!!refValue && (
          <>
            <View style={styles.divider} />
            <View style={styles.bottomRow}>
              <Text style={styles.label}>{refLabel}</Text>
              <Text style={styles.value}>{refValue}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

