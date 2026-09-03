import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../theme/colors";
import { fontScale, moderateScale } from "../../theme/scale";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { useTheme } from "../../theme/ThemeContext";

type Contact = {
  name: string;
  sub: string;
  type: "photo" | "logo" | "initials" | "more";
  uri?: string;
  initials?: string;
  bg?: string;
  starred?: boolean;
};

const contacts: Contact[] = [
  {
    name: "Ibrahim S.",
    sub: "GTBank",
    type: "photo",
    uri: "https://i.pravatar.cc/100?img=12",
    starred: true,
  },
  {
    name: "GTCO",
    sub: "Payment",
    type: "logo",
    uri: "https://logo.clearbit.com/gtbank.com",
    bg: "#E85D2F",
  },
  {
    name: "Aisha M.",
    sub: "Access Bank",
    type: "initials",
    initials: "AM",
    bg: "#4C3D8F",
  },
  {
    name: "Oluwaseun O.",
    sub: "Opay",
    type: "initials",
    initials: "OO",
    bg: "#D6C8F5",
  },
  { name: "More", sub: "", type: "more" },
];

export function PayAgainRow() {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, moreIconSize, starIconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      moreIconSize: s(20),
      starIconSize: s(9),
      styles: StyleSheet.create({
        card: {
          backgroundColor: themeColors.surface,
          borderRadius: s(16),
          padding: s(10),
          marginBottom: s(12),
        },
        header: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: s(10),
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: f(11),
          fontWeight: "500",
        },
        viewAll: {
          color: themeColors.primaryLight,
          fontSize: f(11),
          fontWeight: "600",
        },
        row: { flexDirection: "row", justifyContent: "space-between" },
        item: { alignItems: "center", width: s(52) },
        avatarWrap: { marginBottom: s(4) },
        avatar: { width: s(40), height: s(40), borderRadius: s(20) },
        logoBox: {
          justifyContent: "center",
          alignItems: "center",
          padding: s(6),
        },
        logoImg: { width: "100%", height: "100%" },
        initialsBox: { justifyContent: "center", alignItems: "center" },
        initialsText: { color: "#fff", fontSize: f(12), fontWeight: "700" },
        moreBox: {
          backgroundColor: themeColors.surfaceAlt,
          justifyContent: "center",
          alignItems: "center",
        },
        star: {
          position: "absolute",
          top: -2,
          right: -2,
          width: s(14),
          height: s(14),
          borderRadius: s(7),
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
          borderColor: themeColors.surface,
        },
        name: {
          color: themeColors.textPrimary,
          fontSize: f(10),
          fontWeight: "600",
          textAlign: "center",
        },
        sub: {
          color: themeColors.textSecondary,
          fontSize: f(8.5),
          textAlign: "center",
          marginTop: s(1),
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Pay again</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        {contacts.map((c) => (
          <TouchableOpacity key={c.name} style={styles.item}>
            <View style={styles.avatarWrap}>
              {c.type === "photo" && (
                <Image source={{ uri: c.uri }} style={styles.avatar} />
              )}
              {c.type === "logo" && (
                <View
                  style={[
                    styles.avatar,
                    styles.logoBox,
                    { backgroundColor: c.bg },
                  ]}
                >
                  <Image
                    source={{ uri: c.uri }}
                    style={styles.logoImg}
                    resizeMode="contain"
                  />
                </View>
              )}
              {c.type === "initials" && (
                <View
                  style={[
                    styles.avatar,
                    styles.initialsBox,
                    { backgroundColor: c.bg },
                  ]}
                >
                  <Text
                    style={[
                      styles.initialsText,
                      c.name === "Oluwaseun O." && { color: "#2B2140" },
                    ]}
                  >
                    {c.initials}
                  </Text>
                </View>
              )}
              {c.type === "more" && (
                <View style={[styles.avatar, styles.moreBox]}>
                  <Feather
                    name="more-horizontal"
                    size={moreIconSize}
                    color={themeColors.textSecondary}
                  />
                </View>
              )}
              {c.starred && (
                <View style={styles.star}>
                  <Feather name="star" size={starIconSize} color="#fff" />
                </View>
              )}
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {c.name}
            </Text>
            {!!c.sub && (
              <Text style={styles.sub} numberOfLines={1}>
                {c.sub}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
