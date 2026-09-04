import { useMemo } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
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

export function RecentBeneficiaries({ beneficiaries, onSelect, onViewAll, onAddNew }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(18),
      styles: StyleSheet.create({
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: s(14),
        },
        title: { color: themeColors.textPrimary, fontSize: f(11.5), fontWeight: "700" },
        viewAll: { color: themeColors.primaryLight, fontSize: f(11.5), fontWeight: "600" },
        row: { flexDirection: "row", justifyContent: "space-between" },
        item: { alignItems: "center", gap: s(6), width: s(60) },
        avatar: {
          width: s(48),
          height: s(48),
          borderRadius: s(24),
          justifyContent: "center",
          alignItems: "center",
        },
        initials: { color: "#1A1A1A", fontSize: f(14), fontWeight: "700" },
        addCircle: {
          width: s(48),
          height: s(48),
          borderRadius: s(24),
          borderWidth: 1.5,
          borderColor: themeColors.border,
          borderStyle: "dashed",
          justifyContent: "center",
          alignItems: "center",
        },
        name: {
          color: themeColors.textPrimary,
          fontSize: f(10.5),
          fontWeight: "600",
          textAlign: "center",
        },
        bank: {
          color: themeColors.textSecondary,
          fontSize: f(9),
          textAlign: "center",
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Beneficiaries</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View all</Text>
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
            <Text style={styles.name} numberOfLines={1}>{b.name}</Text>
            <Text style={styles.bank} numberOfLines={1}>{b.bank}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.item} onPress={onAddNew}>
          <View style={styles.addCircle}>
            <Feather name="plus" size={iconSize} color={themeColors.textSecondary} />
          </View>
          <Text style={styles.name}>Add New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}