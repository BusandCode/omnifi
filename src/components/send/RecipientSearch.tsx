import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function RecipientSearch({ value, onChangeText }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: themeColors.surface, borderColor: themeColors.primary },
      ]}
    >
      <Feather name="search" size={16} color={themeColors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter bank name, account number or phone number"
        placeholderTextColor={themeColors.textSecondary}
        style={[styles.input, { color: themeColors.textPrimary }]}
      />
      <TouchableOpacity>
        <Feather name="user" size={16} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
});