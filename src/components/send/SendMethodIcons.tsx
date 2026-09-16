import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";
import {
  FOREIGN_SEND_METHODS,
  ForeignCurrency,
  SendMethodId,
} from "../../constants/foreignSendData";

type Props = {
  currency: ForeignCurrency;
  selected: SendMethodId;
  onSelect: (id: SendMethodId) => void;
};

export function SendMethodIcons({ currency, selected, onSelect }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      {FOREIGN_SEND_METHODS.map((m) => {
        const active = m.id === selected;
        const Icon = m.icon.lib === "Ionicons" ? Ionicons : Feather;
        return (
          <TouchableOpacity key={m.id} style={styles.item} onPress={() => onSelect(m.id)}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: themeColors.surface },
                active && { borderColor: themeColors.primary },
              ]}
            >
              <Icon
                name={m.icon.name as any}
                size={18}
                color={active ? themeColors.primaryLight : themeColors.textSecondary}
              />
            </View>
            <Text style={[styles.label, { color: themeColors.textPrimary }]} numberOfLines={2}>
              {m.label(currency)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  item: { alignItems: "center", gap: 6, width: 60 },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  label: { fontSize: 9, fontWeight: "600", textAlign: "center" },
});