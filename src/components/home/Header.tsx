import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

export function Header({
  name,
  avatarUri,
}: {
  name: string;
  avatarUri: string;
}) {
  const { colors: themeColors, mode, toggleMode } = useTheme();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.left}
        onPress={() => router.push("/profile" as any)}
      >
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <View>
          <Text style={[styles.greeting, { color: themeColors.textSecondary }]}>
            Good morning,
          </Text>
          <Text style={[styles.name, { color: themeColors.textPrimary }]}>
            {name} 👋
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={[
            styles.themeButton,
            {
              backgroundColor:
                mode === "light"
                  ? themeColors.primaryTint
                  : themeColors.surfaceAlt,
            },
          ]}
          onPress={toggleMode}
          accessibilityRole="button"
          accessibilityLabel={`Switch to ${mode === "light" ? "dark" : "light"} theme`}
        >
          <Feather
            name={mode === "light" ? "moon" : "sun"}
            size={18}
            color={
              mode === "light"
                ? themeColors.primaryDark
                : themeColors.primaryLight
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bell}
          onPress={() => router.push("/notifications")}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={themeColors.textPrimary}
          />
          <View
            style={[styles.dot, { backgroundColor: themeColors.primaryLight }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  left: { flexDirection: "row", alignItems: "center", gap: 10 },
  rightActions: { flexDirection: "row", alignItems: "center", gap: 4 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  greeting: { color: colors.textSecondary, fontSize: 13 },
  name: { color: colors.textPrimary, fontSize: 17, fontWeight: "600" },
  bell: { padding: 4 },
  themeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  dot: {
    position: "absolute",
    top: 2,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryLight,
  },
});
