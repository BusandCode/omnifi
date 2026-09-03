import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

const tabs = ["My cards", "Card settings"] as const;

export function CardsTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]>("My cards");
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      {tabs.map((t) => (
        <TouchableOpacity
          key={t}
          onPress={() => setActive(t)}
          style={styles.tab}
        >
          <Text
            style={[
              styles.text,
              { color: themeColors.textSecondary },
              active === t && { color: themeColors.textPrimary },
            ]}
          >
            {t}
          </Text>
          {active === t && (
            <View
              style={[
                styles.underline,
                { backgroundColor: themeColors.primary },
              ]}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 20 },
  tab: { paddingBottom: 8 },
  text: { color: colors.textSecondary, fontSize: 14, fontWeight: "600" },
  textActive: { color: colors.textPrimary },
  underline: {
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
    marginTop: 6,
  },
});
