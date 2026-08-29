import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

export type SendMethod = "bank" | "phone" | "wallet" | "qr";

type MethodDef = {
  id: SendMethod;
  title: string;
  sub: string;
  render: () => React.ReactNode;
};

const methods: MethodDef[] = [
  {
    id: "bank",
    title: "To Bank Account",
    sub: "Send to any\nbank account",
    render: () => <Ionicons name="business" size={20} color={colors.primaryLight} />,
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
    render: () => <Feather name="maximize" size={20} color={colors.primaryLight} />,
  },
];

type Props = { onSelect: (method: SendMethod) => void };

export function SendMethodsGrid({ onSelect }: Props) {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(20),
      styles: StyleSheet.create({
        row: { flexDirection: "row", justifyContent: "space-between" },
        item: { 
          flex: 1, 
          alignItems: "center", 
          gap: s(8), 
          paddingHorizontal: s(2) 
        },
        iconBox: {
          width: s(52), 
          height: s(52), 
          borderRadius: s(26), 
          backgroundColor: colors.surface,
          justifyContent: "center", 
          alignItems: "center",
        },
        title: { 
          color: colors.textPrimary, 
          fontSize: f(10.5), 
          fontWeight: "700", 
          textAlign: "center" 
        },
        sub: { 
          color: colors.textSecondary, 
          fontSize: f(9), 
          textAlign: "center", 
          lineHeight: s(12) 
        },
      }),
    };
  }, [layoutScale]);

  return (
    <View style={styles.row}>
      {methods.map((m) => (
        <TouchableOpacity key={m.id} style={styles.item} onPress={() => onSelect(m.id)}>
          <View style={styles.iconBox}>{m.render()}</View>
          <Text style={styles.title}>{m.title}</Text>
          <Text style={styles.sub}>{m.sub}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}