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
import { colors } from "../../theme/colors";

type Props = {
  referralLink: string;
};

export function ReferralLinkCard({ referralLink }: Props) {
  const [copied, setCopied] = useState(false);

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
    <View style={styles.card}>
      <Text style={styles.title}>Your Referral Link</Text>

      <Text style={styles.sub}>
        Share your link and start earning
      </Text>

      <View style={styles.linkRow}>
        <View style={styles.linkBox}>
          <Feather
            name="link"
            size={13}
            color={colors.primaryLight}
          />

          <Text
            style={styles.linkText}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {referralLink || "Generating your referral link..."}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.copyBtn,
            copied && styles.copyBtnActive,
          ]}
          onPress={handleCopy}
          activeOpacity={0.7}
        >
          <Feather
            name={copied ? "check" : "copy"}
            size={12}
            color={colors.primaryLight}
          />

          <Text style={styles.copyText}>
            {copied ? "Copied" : "Copy"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.shareBtn}
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
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 13.5,
    fontWeight: "700",
  },

  sub: {
    color: colors.textSecondary,
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
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  linkText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 11.5,
  },

  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  copyBtnActive: {
    backgroundColor: "rgba(167,139,250,0.08)",
  },

  copyText: {
    color: colors.primaryLight,
    fontSize: 11.5,
    fontWeight: "600",
  },

  shareBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
  },

  shareText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
});