import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";

export type Beneficiary = {
  id: string;
  initials: string;
  name: string;
  bank: string;
  avatarColor: string;
  photoUri?: string;
};

type Props = {
  beneficiaries: Beneficiary[];
  onSelect: (b: Beneficiary) => void;
  onViewAll: () => void;
  onAddNew: () => void;
};

export function RecentBeneficiaries({
  beneficiaries,
  onSelect,
  onViewAll,
  onAddNew,
}: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.textPrimary }]}>
          Recent Beneficiaries
        </Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={[styles.viewAll, { color: themeColors.primaryLight }]}>
            View all
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        {beneficiaries.map((b) => (
          <TouchableOpacity key={b.id} style={styles.item} onPress={() => onSelect(b)}>
            {b.photoUri ? (
              <Image source={{ uri: b.photoUri }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, { backgroundColor: b.avatarColor }]}>
                <Text style={styles.initials}>{b.initials}</Text>
              </View>
            )}
            <Text style={[styles.name, { color: themeColors.textPrimary }]} numberOfLines={1}>
              {b.name}
            </Text>
            <Text style={[styles.bank, { color: themeColors.textSecondary }]} numberOfLines={1}>
              {b.bank}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.item} onPress={onAddNew}>
          <View style={[styles.addCircle, { borderColor: themeColors.border }]}>
            <Feather name="plus" size={18} color={themeColors.textSecondary} />
          </View>
          <Text style={[styles.name, { color: themeColors.textPrimary }]}>Add New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: { fontSize: 12, fontWeight: "600" },
  viewAll: { fontSize: 13, fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  item: { alignItems: "center", gap: 6, width: 64 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: { color: "#1A1A1A", fontSize: 14, fontWeight: "700" },
  addCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
  bank: {
    fontSize: 9.5,
    textAlign: "center",
  },
});