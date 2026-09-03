// MoreHeader.tsx — back button, "More" title, subtitle line
// Note: parent screen is wrapped in SafeAreaView, so no top inset needed here.
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

interface Props {
  onBack?: () => void;
}

export default function MoreHeader({ onBack }: Props) {
  const { colors: themeColors } = useTheme();
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Pressable style={styles.iconBtn} onPress={onBack} hitSlop={10}>
          <ChevronLeft color={themeColors.textPrimary} size={22} />
        </Pressable>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          More
        </Text>
        <View
          style={[
            styles.iconBtn,
            {
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
            },
          ]}
        />
      </View>
      <Text style={styles.subtitle}>
        Pay bills, buy airtime and access more services
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "600",
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});
