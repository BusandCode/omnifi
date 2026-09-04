// src/components/lifestyle/CategoriesRow.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

type Category = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route?: string;
};

const categories: Category[] = [
  { icon: "airplane", label: "Flights", route: "/flights" },
  { icon: "business", label: "Hotels" },
  { icon: "restaurant", label: "Food", route: "/food" },
  { icon: "bag", label: "Shopping", route: "/strawise" },
  { icon: "film", label: "Entertainment" },
  { icon: "car", label: "Transport" },
];

export function CategoriesRow() {
  const { colors: themeColors } = useTheme();
  const router = useRouter();

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Categories
        </Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: themeColors.primaryLight }]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {categories.map((c) => (
          <TouchableOpacity
            key={c.label}
            style={[
              styles.item,
              {
                backgroundColor: themeColors.surface,
                borderColor: themeColors.primaryTint,
              },
            ]}
            onPress={() => c.route && router.push(c.route)}
            disabled={!c.route}
          >
            <Ionicons
              name={c.icon}
              size={22}
              color={themeColors.primaryLight}
            />
            <Text style={[styles.label, { color: themeColors.textPrimary }]}>
              {c.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { color: colors.textPrimary, fontSize: 11.5, fontWeight: "500" },
  viewAll: { color: colors.primaryLight, fontSize: 11, fontWeight: "600" },
  grid: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  item: {
    flex: 1,
    aspectRatio: 0.85,
    borderRadius: 14,
    backgroundColor: "#0F0F11",
    borderWidth: 1,
    borderColor: "rgba(167,139,250,0.35)",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 8,
    textAlign: "center",
    lineHeight: 10,
  },
});