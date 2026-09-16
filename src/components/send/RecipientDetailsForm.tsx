import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import {
  FOREIGN_BANK_FIELDS,
  ForeignAccountBrief,
  ForeignCurrency,
} from "../../constants/foreignSendData";

type Props = {
  currency: ForeignCurrency;
  account: ForeignAccountBrief;
  values: Record<string, string>;
  onChangeField: (key: string, value: string) => void;
};

export function RecipientDetailsForm({ currency, account, values, onChangeField }: Props) {
  const { colors: themeColors } = useTheme();
  const fields = FOREIGN_BANK_FIELDS[currency];

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
        <View style={styles.col}>
          <Text style={[styles.label, { color: themeColors.textSecondary }]}>Country</Text>
          <Text style={[styles.valueText, { color: themeColors.textPrimary }]}>
            {account.country}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={14} color={themeColors.textSecondary} />
      </View>

      <View style={[styles.row, { borderBottomColor: themeColors.border }]}>
        <View style={styles.col}>
          <Text style={[styles.label, { color: themeColors.textSecondary }]}>
            Account Type
          </Text>
          <Text style={[styles.valueText, { color: themeColors.textPrimary }]}>
            {account.accountType}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={14} color={themeColors.textSecondary} />
      </View>

      {fields.map((field, i) => (
        <View
          key={field.key}
          style={[
            styles.row,
            { borderBottomColor: themeColors.border },
            i === fields.length - 1 && styles.rowLast,
          ]}
        >
          <View style={styles.col}>
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>
              {field.label}
            </Text>
            <TextInput
              value={values[field.key] ?? ""}
              onChangeText={(t) => onChangeField(field.key, t)}
              style={[styles.input, { color: themeColors.textPrimary }]}
              placeholder={field.label}
              placeholderTextColor={themeColors.textSecondary}
            />
          </View>
          {field.actionIcon && (
            <TouchableOpacity
              style={[styles.actionBox, { backgroundColor: themeColors.primaryTint }]}
            >
              <Feather
                name={field.actionIcon.name as any}
                size={11}
                color={themeColors.primaryLight}
              />
            </TouchableOpacity>
          )}
          {field.verified && !!values[field.key] && (
            <Feather name="check-circle" size={14} color={themeColors.success} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 4 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  rowLast: { borderBottomWidth: 0 },
  col: { flex: 1 },
  label: { fontSize: 10 },
  valueText: { fontSize: 13, fontWeight: "600", marginTop: 2 },
  input: { fontSize: 13, fontWeight: "600", marginTop: 2, padding: 0 },
  actionBox: {
    width: 26,
    height: 26,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});