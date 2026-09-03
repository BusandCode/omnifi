import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  onShowDetails: () => void;
};

export function CardActions({ onShowDetails }: Props) {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { colors: themeColors } = useTheme();

  const handleDetailsPress = () => {
    setDetailsVisible((current) => !current);
    onShowDetails();
  };

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <TouchableOpacity style={styles.item}>
        <View
          style={[styles.iconBox, { backgroundColor: themeColors.surfaceAlt }]}
        >
          <Feather
            name="plus-circle"
            size={18}
            color={themeColors.textPrimary}
          />
        </View>
        <Text style={[styles.label, { color: themeColors.textPrimary }]}>
          Top up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <View
          style={[styles.iconBox, { backgroundColor: themeColors.surfaceAlt }]}
        >
          <Feather
            name="arrow-down-circle"
            size={18}
            color={themeColors.textPrimary}
          />
        </View>
        <Text style={[styles.label, { color: themeColors.textPrimary }]}>
          Withdraw
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={handleDetailsPress}>
        <View
          style={[styles.iconBox, { backgroundColor: themeColors.surfaceAlt }]}
        >
          <Feather
            name={detailsVisible ? "eye-off" : "eye"}
            size={18}
            color={themeColors.textPrimary}
          />
        </View>
        <Text style={[styles.label, { color: themeColors.textPrimary }]}>
          {detailsVisible ? "Hide details" : "Show details"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <View
          style={[styles.iconBox, { backgroundColor: themeColors.surfaceAlt }]}
        >
          <Feather name="file-text" size={18} color={themeColors.textPrimary} />
        </View>
        <Text style={[styles.label, { color: themeColors.textPrimary }]}>
          Statement
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 9,
  },
  item: { alignItems: "center", gap: 8 },
  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 22,
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
  },
});
