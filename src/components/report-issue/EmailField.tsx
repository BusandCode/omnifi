import { useMemo } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type EmailFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function EmailField({ value, onChangeText }: EmailFieldProps) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  label: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600', marginBottom: 8 },
  required: { color: '#FF3B30' },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: themeColors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  input: { flex: 1, color: themeColors.textPrimary, fontSize: 13 },
}),
    [themeColors]
  );

  return (
    <View>
      <Text style={styles.label}>
        Email Address <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.field}>
        <Feather name="mail" size={15} color={themeColors.primaryLight} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter your email address"
          placeholderTextColor={themeColors.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>
    </View>
  );
}

