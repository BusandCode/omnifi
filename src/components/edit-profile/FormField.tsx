import { View, Text, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  onChangeText: (text: string) => void;
} & Pick<TextInputProps, 'keyboardType' | 'autoCapitalize' | 'placeholder' | 'editable'>;

export function FormField({ icon, label, value, onChangeText, editable = true, ...inputProps }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, { color: themeColors.textSecondary }]}>{label}</Text>
      <View style={[styles.inputRow, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
        <View style={[styles.iconBox, { backgroundColor: themeColors.primaryTint }]}>
          <Feather name={icon} size={14} color={themeColors.primaryLight} />
        </View>
        <TextInput
          style={[styles.input, { color: themeColors.textPrimary }]}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          placeholderTextColor={themeColors.textSecondary}
          {...inputProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  label: { fontSize: 11.5, fontWeight: '600', marginLeft: 2 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderRadius: 14, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4,
  },
  iconBox: {
    width: 28, height: 28, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  input: { flex: 1, fontSize: 13, fontWeight: '600', paddingVertical: 10 },
});