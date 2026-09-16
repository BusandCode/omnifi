// src/components/lifestyle/CategoriesRow.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
            onPress={() => c.route && router.push(c.route as any)}
            disabled={!c.route}
          >
            <Ionicons
              name={c.icon}
              size={16}
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
  title: { fontSize: 11.5, fontWeight: "500" },
  viewAll: { fontSize: 11, fontWeight: "600" },
  grid: {
    flexDirection: "row",
    gap: 3,
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    aspectRatio: 0.75,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 1,
    paddingVertical: 5,
  },
  label: {
    fontSize: 7,
    textAlign: "center",
    lineHeight: 8.5,
  },
});