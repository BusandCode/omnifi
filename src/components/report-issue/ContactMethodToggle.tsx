import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export type ContactMethod = 'email' | 'inapp';

type ContactMethodToggleProps = {
  value: ContactMethod;
  onChange: (method: ContactMethod) => void;
};

export function ContactMethodToggle({ value, onChange }: ContactMethodToggleProps) {
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
          <Feather name="mail" size={14} color={value === 'email' ? colors.primaryLight : colors.textSecondary} />
          <Text style={[styles.optionText, value === 'email' && styles.optionTextActive]}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, value === 'inapp' && styles.optionActive]}
          onPress={() => onChange('inapp')}
        >
          <Feather name="message-circle" size={14} color={value === 'inapp' ? colors.primaryLight : colors.textSecondary} />
          <Text style={[styles.optionText, value === 'inapp' && styles.optionTextActive]}>In-app Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '600', marginBottom: 8 },
  required: { color: '#FF3B30' },
  row: { flexDirection: 'row', gap: 10 },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 13,
  },
  optionActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(167,139,250,0.1)',
  },
  optionText: { color: colors.textSecondary, fontSize: 12.5, fontWeight: '600' },
  optionTextActive: { color: colors.primaryLight },
});