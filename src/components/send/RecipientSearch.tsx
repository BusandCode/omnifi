import { useMemo } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function RecipientSearch({ value, onChangeText }: Props) {
  const layoutScale = useLayoutScale();

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
          backgroundColor: colors.surface, 
          borderRadius: s(14),
          paddingHorizontal: s(14), 
          paddingVertical: s(14),
          borderWidth: 1.5, 
          borderColor: colors.primary,
        },
        input: { 
          flex: 1, 
          color: colors.textPrimary, 
          fontSize: f(13) 
        },
      }),
    };
  }, [layoutScale]);

  return (
    <View style={styles.wrapper}>
      <Feather name="search" size={iconSize} color={colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter bank name, account number or phone number"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
      <TouchableOpacity>
        <Feather name="user" size={iconSize} color={colors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}