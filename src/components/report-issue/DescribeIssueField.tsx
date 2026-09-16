import { useMemo } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const MAX_LENGTH = 1000;

type DescribeIssueFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function DescribeIssueField({ value, onChangeText }: DescribeIssueFieldProps) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  label: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600', marginBottom: 8 },
  required: { color: '#FF3B30' },
  field: {
    borderWidth: 1,
    borderColor: themeColors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 13,
    paddingBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    color: themeColors.textPrimary,
    fontSize: 13,
    minHeight: 90,
  },
  counter: {
    color: themeColors.textSecondary,
    fontSize: 10.5,
    textAlign: 'right',
    marginTop: 4,
  },
}),
    [themeColors]
  );

  return (
    <View>
      <Text style={styles.label}>
        Describe the issue <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.field}>
        <View style={styles.topRow}>
          <Feather name="file-text" size={15} color={themeColors.primaryLight} />
          <TextInput
            value={value}
            onChangeText={(t) => onChangeText(t.slice(0, MAX_LENGTH))}
            placeholder="Please provide as much detail as possible..."
            placeholderTextColor={themeColors.textSecondary}
            style={styles.input}
            multiline
            textAlignVertical="top"
          />
        </View>
        <Text style={styles.counter}>{value.length}/{MAX_LENGTH}</Text>
      </View>
    </View>
  );
}

