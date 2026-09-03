import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

export function ProfileHeader({ avatarUri }: { avatarUri: string }) {
  const { colors: themeColors } = useTheme();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.backBtn, { backgroundColor: themeColors.surface }]}
        hitSlop={8}
      >
        <Ionicons
          name="chevron-back"
          size={18}
          color={themeColors.textPrimary}
        />
      </TouchableOpacity>

      <View style={styles.left}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Profile
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
          Manage your account and settings
        </Text>
      </View>

      <Image
        source={{ uri: avatarUri }}
        style={[styles.avatar, { borderColor: themeColors.primary }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  backBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  left: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 15, fontWeight: "700" },
  subtitle: { color: colors.textSecondary, fontSize: 9.5, marginTop: 2 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
});
