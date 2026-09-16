import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export type ContactMethod = 'email' | 'inapp';

type ContactMethodToggleProps = {
  value: ContactMethod;
  onChange: (method: ContactMethod) => void;
};

export function ContactMethodToggle({ value, onChange }: ContactMethodToggleProps) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  label: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600', marginBottom: 8 },
  required: { color: '#FF3B30' },
  row: { flexDirection: 'row', gap: 10 },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: themeColors.border,
    borderRadius: 12,
    paddingVertical: 13,
  },
  optionActive: {
    borderColor: themeColors.primary,
    backgroundColor: 'rgba(167,139,250,0.1)',
  },
  optionText: { color: themeColors.textSecondary, fontSize: 12.5, fontWeight: '600' },
  optionTextActive: { color: themeColors.primaryLight },
}),
    [themeColors]
  );

  return (
    <View>
      <Text style={styles.label}>
        Preferred Contact Method <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.option, value === 'email' && styles.optionActive]}
          onPress={() => onChange('email')}
        >
          <Feather name="mail" size={14} color={value === 'email' ? themeColors.primaryLight : themeColors.textSecondary} />
          <Text style={[styles.optionText, value === 'email' && styles.optionTextActive]}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, value === 'inapp' && styles.optionActive]}
          onPress={() => onChange('inapp')}
        >
          <Feather name="message-circle" size={14} color={value === 'inapp' ? themeColors.primaryLight : themeColors.textSecondary} />
          <Text style={[styles.optionText, value === 'inapp' && styles.optionTextActive]}>In-app Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

