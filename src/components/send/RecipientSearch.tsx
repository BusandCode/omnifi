import { useMemo } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function RecipientSearch({ value, onChangeText }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(16),
      styles: StyleSheet.create({
        wrapper: {
          flexDirection: "row",
          alignItems: "center",
          gap: s(10),
          backgroundColor: themeColors.surface,
          borderRadius: s(14),
          paddingHorizontal: s(14),
          paddingVertical: s(14),
          borderWidth: 1.5,
          borderColor: themeColors.primary,
        },
        input: {
          flex: 1,
          color: themeColors.textPrimary,
          fontSize: f(13),
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.wrapper}>
      <Feather
        name="search"
        size={iconSize}
        color={themeColors.textSecondary}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter bank name, account number or phone number"
        placeholderTextColor={themeColors.textSecondary}
        style={styles.input}
      />
      <TouchableOpacity>
        <Feather name="user" size={iconSize} color={themeColors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}
