import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

export function PayHeader() {
  const { colors: themeColors } = useTheme();
  const { styles, iconSize } = useMemo(() => {
    const s = moderateScale;
    const f = fontScale;
    return {
      iconSize: s(18),
      styles: StyleSheet.create({
        row: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: s(20),
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: f(20),
          fontWeight: "700",
        },
        iconBtn: {
          width: s(40),
          height: s(40),
          borderRadius: s(20),
          backgroundColor: themeColors.surface,
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    };
  }, [themeColors]);

  return (
    <View style={styles.row}>
      <Text style={styles.title}>Pay</Text>
      <TouchableOpacity style={styles.iconBtn}>
        <Feather
          name="users"
          size={iconSize}
          color={themeColors.primaryLight}
        />
      </TouchableOpacity>
    </View>
  );
}
