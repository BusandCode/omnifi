import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type SubjectFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SubjectField({ value, onChangeText }: SubjectFieldProps) {
  return (
    <View>
      <Text style={styles.label}>
        Subject <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.field}>
        <Feather name="edit-2" size={15} color={colors.primaryLight} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Briefly describe your issue"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
      </View>
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
  input: { flex: 1, color: colors.textPrimary, fontSize: 13 },
});