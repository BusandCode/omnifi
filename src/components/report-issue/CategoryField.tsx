import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export type IssueCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export const categories: IssueCategory[] = [
  {
    id: 'payment',
    label: 'Payment Issue',
    icon: <Feather name="credit-card" size={16} color={colors.primaryLight} />,
  },
  {
    id: 'transfer',
    label: 'Transfer & Transaction',
    icon: <MaterialCommunityIcons name="swap-horizontal" size={18} color={colors.primaryLight} />,
  },
  {
    id: 'account',
    label: 'Account Issue',
    icon: <Feather name="user" size={16} color={colors.primaryLight} />,
  },
  {
    id: 'security',
    label: 'Security & Fraud',
    icon: <Ionicons name="shield" size={16} color={colors.primaryLight} />,
  },
  {
    id: 'app',
    label: 'App Bug / Technical Issue',
    icon: <Feather name="alert-triangle" size={16} color={colors.primaryLight} />,
  },
  {
    id: 'card',
    label: 'Card Issue',
    icon: <Feather name="credit-card" size={16} color={colors.primaryLight} />,
  },
  {
    id: 'kyc',
    label: 'KYC & Verification',
    icon: <Feather name="user-check" size={16} color={colors.primaryLight} />,
  },
  {
    id: 'other',
    label: 'Other',
    icon: <Feather name="more-horizontal" size={16} color={colors.primaryLight} />,
  },
];

type CategoryFieldProps = {
  value: IssueCategory | null;
  onChange: (category: IssueCategory) => void;
};

export function CategoryField({ value, onChange }: CategoryFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Text style={styles.label}>
        Issue Category <Text style={styles.required}>*</Text>
      </Text>
      <TouchableOpacity style={styles.field} onPress={() => setOpen(true)}>
        <Ionicons name="apps" size={16} color={colors.primaryLight} />
        <Text style={[styles.value, !value && styles.placeholder]}>
          {value?.label ?? 'Select a category'}
        </Text>
        <Feather name="chevron-down" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>Select a category</Text>
            {categories.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[styles.option, value?.id === c.id && styles.optionActive]}
                onPress={() => {
                  onChange(c);
                  setOpen(false);
                }}
              >
                <View style={styles.optionIcon}>{c.icon}</View>
                <Text style={styles.optionText}>{c.label}</Text>
                {value?.id === c.id && (
                  <Ionicons name="checkmark" size={16} color={colors.primaryLight} />
                )}
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '600', marginBottom: 8 },
  required: { color: '#FF3B30' },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  value: { flex: 1, color: colors.textPrimary, fontSize: 13 },
  placeholder: { color: colors.textSecondary },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
  },
  sheetTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '700', marginBottom: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  optionActive: { backgroundColor: 'rgba(167,139,250,0.1)' },
  optionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: { flex: 1, color: colors.textPrimary, fontSize: 13, fontWeight: '600' },
});