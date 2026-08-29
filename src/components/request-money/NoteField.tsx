import { View, Text, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../theme/colors';

const MAX_LENGTH = 50;

type NoteFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function NoteField({ value, onChangeText }: NoteFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>3. Add a Note (Optional)</Text>
      <View style={styles.field}>
        <TextInput
          value={value}
          onChangeText={(t) => onChangeText(t.slice(0, MAX_LENGTH))}
          placeholder="What's this request for?"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
        <Text style={styles.counter}>{value.length}/{MAX_LENGTH}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:{marginTop:-10},
  sectionTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', marginBottom: 12 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  input: { flex: 1, color: colors.textPrimary, fontSize: 12.5 },
  counter: { color: colors.textSecondary, fontSize: 10.5 },
});