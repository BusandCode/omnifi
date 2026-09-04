import { useMemo } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";
import { FOREIGN_BANK_FIELDS, ForeignAccountBrief, ForeignCurrency } from "../../constants/foreignSendData";

type Props = {
  currency: ForeignCurrency;
  account: ForeignAccountBrief;
  values: Record<string, string>;
  onChangeField: (key: string, value: string) => void;
};

export function RecipientDetailsForm({ currency, account, values, onChangeField }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();
  const fields = FOREIGN_BANK_FIELDS[currency];

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(14),
      styles: StyleSheet.create({
        card: { backgroundColor: themeColors.surface, borderRadius: s(14), padding: s(4) },
        row: {
          flexDirection: "row", alignItems: "center", justifyContent: "space-between",
          paddingHorizontal: s(12), paddingVertical: s(10),
          borderBottomWidth: 1, borderBottomColor: themeColors.border,
          gap: s(8),
        },
        rowLast: { borderBottomWidth: 0 },
        col: { flex: 1 },
        label: { color: themeColors.textSecondary, fontSize: f(9) },
        valueText: { color: themeColors.textPrimary, fontSize: f(12), fontWeight: "600", marginTop: s(2) },
        input: { color: themeColors.textPrimary, fontSize: f(12), fontWeight: "600", marginTop: s(2), padding: 0 },
        actionBox: {
          width: s(24), height: s(24), borderRadius: s(6),
          backgroundColor: themeColors.primaryTint,
          justifyContent: "center", alignItems: "center",
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Country</Text>
          <Text style={styles.valueText}>{account.country}</Text>
        </View>
        <Ionicons name="chevron-down" size={iconSize} color={themeColors.textSecondary} />
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Account Type</Text>
          <Text style={styles.valueText}>{account.accountType}</Text>
        </View>
        <Ionicons name="chevron-down" size={iconSize} color={themeColors.textSecondary} />
      </View>

      {fields.map((field, i) => (
        <View key={field.key} style={[styles.row, i === fields.length - 1 && styles.rowLast]}>
          <View style={styles.col}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              value={values[field.key] ?? ""}
              onChangeText={(t) => onChangeField(field.key, t)}
              style={styles.input}
              placeholder={field.label}
              placeholderTextColor={themeColors.textSecondary}
            />
          </View>
          {field.actionIcon && (
            <TouchableOpacity style={styles.actionBox}>
              <Feather name={field.actionIcon.name as any} size={iconSize - 3} color={themeColors.primaryLight} />
            </TouchableOpacity>
          )}
          {field.verified && !!values[field.key] && (
            <Feather name="check-circle" size={iconSize} color={themeColors.success} />
          )}
        </View>
      ))}
    </View>
  );
}