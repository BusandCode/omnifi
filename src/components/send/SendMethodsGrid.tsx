import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";

export type SendMethod = "bank" | "phone" | "wallet" | "qr";

type MethodDef = {
  id: SendMethod;
  title: string;
  sub: string;
  render: () => React.ReactNode;
};

type Props = { onSelect: (method: SendMethod) => void };

export function SendMethodsGrid({ onSelect }: Props) {
  const { colors: themeColors } = useTheme();

  const methods: MethodDef[] = useMemo(
    () => [
      {
        id: "bank",
        title: "To Bank Account",
        sub: "Send to any\nbank account",
        render: () => (
          <Ionicons name="business" size={20} color={themeColors.primaryLight} />
        ),
      },
      {
        id: "phone",
        title: "To Phone Number",
        sub: "Send to any\nmobile number",
        render: () => <Feather name="smartphone" size={20} color="#34C759" />,
      },
      {
        id: "wallet",
        title: "To Wallet",
        sub: "Send to app\nwallet",
        render: () => <Ionicons name="wallet" size={20} color="#3D9CFF" />,
      },
      {
        id: "qr",
        title: "Scan QR Code",
        sub: "Scan and\nsend money",
        render: () => (
          <Feather name="maximize" size={20} color={themeColors.primaryLight} />
        ),
      },
    ],
    [themeColors]
  );

  return (
    <View style={styles.row}>
      {methods.map((m) => (
        <TouchableOpacity
          key={m.id}
          style={styles.item}
          onPress={() => onSelect(m.id)}
        >
          <View style={[styles.iconBox, { backgroundColor: themeColors.surface }]}>
            {m.render()}
          </View>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>
            {m.title}
          </Text>
          <Text style={[styles.sub, { color: themeColors.textSecondary }]}>
            {m.sub}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 4,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",
  },
  sub: {
    fontSize: 9,
    textAlign: "center",
    lineHeight: 11,
  },
});