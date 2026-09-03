import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

type Item = {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  sub: string;
  route?: string;
  action?: "logout";
};

type Props = {
  title?: string;
  items: Item[];
  danger?: boolean;
};

export function ProfileSection({ title, items, danger }: Props) {
  const { colors: themeColors } = useTheme();

  const handlePress = (item: Item) => {
    // Handle logout separately
    if (item.action === "logout") {
      router.replace("/login");
      return;
    }

    // Handle normal navigation
    if (item.route) {
      router.push(item.route as any);
    }
  };

  return (
    <View>
      {title && (
        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>
          {title}
        </Text>
      )}

      <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
        {items.map((item, i) => (
          <TouchableOpacity
            key={item.title}
            style={[
              styles.row,
              i !== items.length - 1 && [
                styles.divider,
                { borderBottomColor: themeColors.border },
              ],
            ]}
            activeOpacity={0.7}
            onPress={() => handlePress(item)}
          >
            <View
              style={[
                styles.iconBox,
                { backgroundColor: themeColors.surfaceAlt },
                danger && styles.iconBoxDanger,
              ]}
            >
              <Feather
                name={item.icon}
                size={18}
                color={danger ? themeColors.danger : themeColors.textPrimary}
              />
            </View>

            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  { color: themeColors.textPrimary },
                  danger && styles.titleDanger,
                ]}
                numberOfLines={1}
              >
                {item.title}
              </Text>

              <Text
                style={[styles.sub, { color: themeColors.textSecondary }]}
                numberOfLines={1}
              >
                {item.sub}
              </Text>
            </View>

            <Feather
              name="chevron-right"
              size={18}
              color={themeColors.textSecondary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    alignItems: "center",
  },

  iconBoxDanger: {
    backgroundColor: "rgba(255,59,48,0.12)",
  },

  textContainer: {
    flex: 1,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },

  titleDanger: {
    color: colors.danger,
  },

  sub: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 1,
  },
});
