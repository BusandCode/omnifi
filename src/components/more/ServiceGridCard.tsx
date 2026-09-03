// ServiceGridCard.tsx — single service tile (icon bubble + title + description)
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  Smartphone,
  Wifi,
  Gift,
  Trophy,
  FileText,
  QrCode,
  Zap,
  Tv,
  MessageCircle,
  Plane,
  ShieldCheck,
  Banknote,
} from "lucide-react-native";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";
import { MoreService, MoreServiceIcon } from "../../config/moreServices";

const ICON_MAP: Record<MoreServiceIcon, React.ComponentType<any>> = {
  airtime: Smartphone,
  data: Wifi,
  giftCard: Gift,
  betting: Trophy,
  utilityBill: FileText,
  scanToPay: QrCode,
  electricity: Zap,
  cable: Tv,
  liveChat: MessageCircle,
  flights: Plane,
  insurance: ShieldCheck,
  airtimeToCash: Banknote,
};

interface Props {
  service: MoreService;
  onPress?: () => void;
}

export default function ServiceGridCard({ service, onPress }: Props) {
  const { colors: themeColors } = useTheme();
  const Icon = ICON_MAP[service.key];

  return (
    <Pressable
      style={[
        styles.card,
        {
          backgroundColor: themeColors.surface,
          borderColor: themeColors.border,
        },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconBubble,
          { backgroundColor: themeColors.primaryTint },
        ]}
      >
        <Icon color={themeColors.primary} size={22} />
      </View>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>
        {service.title}
      </Text>
      <Text
        style={[styles.description, { color: themeColors.textSecondary }]}
        numberOfLines={2}
      >
        {service.description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "31%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  iconBubble: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(139, 92, 246, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  description: {
    color: colors.textSecondary,
    fontSize: 9.5,
    textAlign: "center",
    lineHeight: 13,
  },
});
