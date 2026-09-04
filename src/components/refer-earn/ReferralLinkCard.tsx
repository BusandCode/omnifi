import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  referralLink: string;
};

export function ReferralLinkCard({ referralLink }: Props) {
  const [copied, setCopied] = useState(false);
  const { colors: themeColors } = useTheme();

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (!referralLink?.trim()) {
      Alert.alert("No referral link", "Your referral link is not available yet.");
      return;
    }

    try {
      await Clipboard.setStringAsync(referralLink);
      setCopied(true);
    } catch (error) {
      Alert.alert(
        "Unable to copy",
        "Something went wrong while copying your referral link."
      );
    }
  };

  const handleShare = async () => {
    if (!referralLink?.trim()) {
      Alert.alert("No referral link", "Your referral link is not available yet.");
      return;
    }

    try {
      await Share.share({
        message: `Join me on Omnifi and start earning rewards!\n\n${referralLink}`,
      });
    } catch (error) {
      Alert.alert(
        "Unable to share",
        "Something went wrong while sharing your referral link."
      );
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface }]}>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>Your Referral Link</Text>

      <Text style={[styles.sub, { color: themeColors.textSecondary }]}>
        Share your link and start earning
      </Text>

      <View style={styles.linkRow}>
        <View style={[styles.linkBox, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
          <Feather
            name="link"
            size={13}
            color={themeColors.primaryLight}
          />

          <Text
            style={[styles.linkText, { color: themeColors.textPrimary }]}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {referralLink || "Generating your referral link..."}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.copyBtn,
            { borderColor: themeColors.border },
            copied && { backgroundColor: themeColors.primaryTint },
          ]}
          onPress={handleCopy}
          activeOpacity={0.7}
        >
          <Feather
            name={copied ? "check" : "copy"}
            size={12}
            color={themeColors.primaryLight}
          />

          <Text style={[styles.copyText, { color: themeColors.primaryLight }]}>
            {copied ? "Copied" : "Copy"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.shareBtn, { backgroundColor: themeColors.primary }]}
        onPress={handleShare}
        activeOpacity={0.8}
      >
        <Feather
          name="share-2"
          size={14}
          color="#fff"
        />

        <Text style={styles.shareText}>
          Share Link
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
  },

  title: {
    fontSize: 13.5,
    fontWeight: "700",
  },

  sub: {
    fontSize: 10.5,
    marginTop: 2,
    marginBottom: 12,
  },

  linkRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  linkBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  linkText: {
    flex: 1,
    fontSize: 11.5,
  },

  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  copyText: {
    fontSize: 11.5,
    fontWeight: "600",
  },

  shareBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 14,
    paddingVertical: 14,
  },

  shareText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
});