import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

export function PaySearchBar() {
  const { colors: themeColors } = useTheme();
  const { styles, iconSize, scanIconSize } = useMemo(() => {
    const s = moderateScale;
    const f = fontScale;
    return {
      iconSize: s(18),
      scanIconSize: s(18),
      styles: StyleSheet.create({
        wrapper: {
          flexDirection: "row",
          alignItems: "center",
          gap: s(10),
          backgroundColor: themeColors.surface,
          borderRadius: s(14),
          paddingHorizontal: s(14),
          paddingVertical: s(10),
          marginBottom: s(14),
        },
        input: { flex: 1, color: themeColors.textPrimary, fontSize: f(14) },
      }),
    };
  }, [themeColors]);

  return (
    <View style={styles.wrapper}>
      <Feather
        name="search"
        size={iconSize}
        color={themeColors.textSecondary}
      />
      <TextInput
        placeholder="Who are you paying?"
        placeholderTextColor={themeColors.textSecondary}
        style={styles.input}
      />
      <TouchableOpacity>
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={scanIconSize}
          color={themeColors.primaryLight}
        />
      </TouchableOpacity>
    </View>
  );
}
