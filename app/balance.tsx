import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path, Rect, Text as SvgText } from "react-native-svg";
import { useTheme } from "../src/theme/ThemeContext";

// Self-contained palette matched to the target design.
const palette = {
  background: "#000000",
  cardPurple: "#3D1B78",
  cardPurpleLight: "#4C2A99",
  surface: "#121214",
  surfaceBorder: "rgba(255,255,255,0.08)",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(235,235,245,0.55)",
  primary: "#7C3AED",
  primaryMuted: "rgba(124,58,237,0.35)",
  green: "#22C55E",
  greenBg: "rgba(34,197,94,0.15)",
  amber: "#F59E0B",
  purpleIcon: "#8B5CF6",
  purpleIconBg: "rgba(139,92,246,0.18)",
  blue: "#3B82F6",
  blueBg: "rgba(59,130,246,0.18)",
  gold: "#F5A623",
};

function WithdrawIllustration() {
  return (
    <Svg width={100} height={120} viewBox="0 0 92 112">
      {/* card behind, tilted */}
      <Rect
        x="4"
        y="56"
        width="46"
        height="30"
        rx="6"
        fill={palette.cardPurpleLight}
        opacity={0.75}
        transform="rotate(-8 27 71)"
      />
      <Circle
        cx="15"
        cy="76"
        r="5.5"
        fill={palette.purpleIcon}
        opacity={0.9}
        transform="rotate(-8 27 71)"
      />

      {/* phone body */}
      <Rect
        x="24"
        y="6"
        width="46"
        height="76"
        rx="13"
        fill={palette.cardPurple}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={1.5}
      />
      {/* check circle */}
      <Circle cx="47" cy="42" r="15" fill={palette.purpleIcon} />
      <Path
        d="M40 42 L45 47 L55 35"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* coin */}
      <Circle
        cx="74"
        cy="88"
        r="14"
        fill={palette.purpleIcon}
        stroke={palette.surface}
        strokeWidth={3}
      />
      <SvgText
        x="74"
        y="93"
        fontSize={13}
        fontWeight="bold"
        fill="#fff"
        textAnchor="middle"
      >
        ₦
      </SvgText>

      {/* dashed arrow from coin curving up */}
      <Path
        d="M84 78 C 90 62, 84 40, 70 28"
        stroke={palette.purpleIcon}
        strokeWidth={1.5}
        strokeDasharray="3,3"
        fill="none"
      />
      <Path d="M70 28 L74.5 31 L76 24.5 Z" fill={palette.purpleIcon} />
    </Svg>
  );
}

export default function BalanceScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  const handleWithdraw = () => {
    router.push("/withdraw" as any);
  };

  const handleTransactionHistory = () => {
    router.push("/history");
  };

  const steps = [
    { n: "1", title: "Go to Withdraw", desc: "Tap the Withdraw button above." },
    {
      n: "2",
      title: "Enter Amount",
      desc: "Enter the amount you want to withdraw.",
    },
    {
      n: "3",
      title: "Confirm Details",
      desc: "Confirm your bank details and submit.",
    },
    {
      n: "4",
      title: "Receive Funds",
      desc: "Funds will be sent to your bank account.",
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 6,
          paddingBottom: insets.bottom + 8,
          backgroundColor: themeColors.background,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather
            name="chevron-left"
            size={24}
            color={themeColors.textPrimary}
          />
        </Pressable>
        <Text style={[styles.headerTitle, { color: themeColors.textPrimary }]}>
          Available Balance
        </Text>
        <Pressable style={styles.infoButton}>
          <Feather name="info" size={14} color={themeColors.textPrimary} />
        </Pressable>
      </View>

      {/* Balance Card */}
      <View
        style={[
          styles.balanceCard,
          {
            backgroundColor: themeColors.surface,
            borderColor: themeColors.border,
          },
        ]}
      >
        <View style={styles.balanceTopRow}>
          <View style={styles.balanceTextBlock}>
            <View style={styles.balanceLabelRow}>
              <Text
                style={[
                  styles.balanceLabel,
                  { color: themeColors.textSecondary },
                ]}
              >
                Available Balance
              </Text>
              <Feather
                name="help-circle"
                size={13}
                color={themeColors.textSecondary}
                style={{ marginLeft: 4 }}
              />
            </View>

            <Text
              style={[styles.balanceAmount, { color: themeColors.textPrimary }]}
            >
              ₦52,600.00
            </Text>

            <Pressable
              style={styles.totalEarningsRow}
              onPress={handleTransactionHistory}
            >
              <View>
                <Text
                  style={[
                    styles.totalEarningsLabel,
                    { color: themeColors.textSecondary },
                  ]}
                >
                  Total Earnings
                </Text>
                <Text
                  style={[
                    styles.totalEarningsAmount,
                    { color: themeColors.textPrimary },
                  ]}
                >
                  ₦128,600.00
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={14}
                color={themeColors.textSecondary}
              />
            </Pressable>
          </View>

          {/* Decorative wallet illustration */}
          <View style={styles.walletIllustration}>
            <View style={styles.walletCardBehind} />
            <View style={styles.walletBody}>
              <View style={styles.walletButton} />
            </View>
            <View style={styles.coinCircle}>
              <Text style={styles.coinSymbol}>₦</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <Pressable style={styles.actionButton} onPress={handleWithdraw}>
            <Feather name="refresh-cw" size={14} color={themeColors.primary} />
            <Text
              style={[styles.actionButtonText, { color: themeColors.primary }]}
            >
              Withdraw
            </Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={handleTransactionHistory}
          >
            <Feather name="clock" size={14} color={themeColors.primary} />
            <Text
              style={[styles.actionButtonText, { color: themeColors.primary }]}
            >
              Transaction History
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Info Banner */}
      <View
        style={[
          styles.infoBanner,
          {
            backgroundColor: themeColors.surface,
            borderColor: themeColors.border,
          },
        ]}
      >
        <View
          style={[
            styles.infoIconCircle,
            { backgroundColor: themeColors.primaryTint },
          ]}
        >
          <Feather name="info" size={12} color={themeColors.primary} />
        </View>
        <Text
          style={[styles.infoBannerText, { color: themeColors.textSecondary }]}
          numberOfLines={1}
        >
          Amount you can withdraw to your bank account.
        </Text>
        <Pressable>
          <Text style={[styles.learnMore, { color: themeColors.primary }]}>
            Learn more
          </Text>
        </Pressable>
      </View>

      {/* Balance Breakdown */}
      <View
        style={[
          styles.breakdownCard,
          {
            backgroundColor: themeColors.surface,
            borderColor: themeColors.border,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>
          Balance Breakdown
        </Text>

        <View style={styles.breakdownItem}>
          <View
            style={[styles.iconCircle, { backgroundColor: palette.greenBg }]}
          >
            <Feather name="user-plus" size={15} color={palette.green} />
          </View>
          <View style={styles.breakdownTextBlock}>
            <Text
              style={[
                styles.breakdownLabel,
                { color: themeColors.textPrimary },
              ]}
            >
              Total Earnings
            </Text>
            <Text
              style={[
                styles.breakdownSubtext,
                { color: themeColors.textSecondary },
              ]}
            >
              All time earnings
            </Text>
          </View>
          <Text
            style={[styles.breakdownAmount, { color: themeColors.textPrimary }]}
          >
            ₦128,600.00
          </Text>
        </View>

        <View
          style={[styles.divider, { backgroundColor: themeColors.border }]}
        />

        <View style={styles.breakdownItem}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: palette.purpleIconBg },
            ]}
          >
            <Feather name="loader" size={15} color={palette.purpleIcon} />
          </View>
          <View style={styles.breakdownTextBlock}>
            <Text
              style={[
                styles.breakdownLabel,
                { color: themeColors.textPrimary },
              ]}
            >
              Pending Balance
            </Text>
            <Text
              style={[
                styles.breakdownSubtext,
                { color: themeColors.textSecondary },
              ]}
            >
              Pending transactions
            </Text>
          </View>
          <Text style={[styles.breakdownAmount, { color: palette.amber }]}>
            ₦76,000.00
          </Text>
        </View>

        <View
          style={[styles.divider, { backgroundColor: themeColors.border }]}
        />

        <View style={styles.breakdownItem}>
          <View
            style={[styles.iconCircle, { backgroundColor: palette.blueBg }]}
          >
            <Feather name="credit-card" size={15} color={palette.blue} />
          </View>
          <View style={styles.breakdownTextBlock}>
            <Text
              style={[
                styles.breakdownLabel,
                { color: themeColors.textPrimary },
              ]}
            >
              Available Balance
            </Text>
            <Text
              style={[
                styles.breakdownSubtext,
                { color: themeColors.textSecondary },
              ]}
            >
              Ready to withdraw
            </Text>
          </View>
          <Text style={[styles.breakdownAmount, { color: palette.green }]}>
            ₦52,600.00
          </Text>
        </View>
      </View>

      {/* How to withdraw — steps + SVG illustration, side by side */}
      <View
        style={[
          styles.howToCard,
          {
            backgroundColor: themeColors.surface,
            borderColor: themeColors.border,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>
          How to withdraw
        </Text>
        <View style={styles.howToRow}>
          <View style={styles.stepsColumn}>
            {steps.map((step, i) => (
              <View
                key={step.n}
                style={[
                  styles.stepItem,
                  i === steps.length - 1 && { marginBottom: 0 },
                ]}
              >
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.n}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitle,
                      { color: themeColors.textPrimary },
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={[
                      styles.stepDescription,
                      { color: themeColors.textSecondary },
                    ]}
                    numberOfLines={1}
                  >
                    {step.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.illustrationColumn}>
            <WithdrawIllustration />
          </View>
        </View>
      </View>

      <Pressable
        style={[
          styles.withdrawNowButton,
          { backgroundColor: themeColors.primary },
        ]}
        onPress={handleWithdraw}
      >
        <Ionicons name="business" size={17} color="#fff" />
        <Text style={styles.withdrawNowText}>Withdraw Now</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    gap: 8,
  },

  /* Header */
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: palette.textPrimary,
    fontSize: 17,
    fontWeight: "700",
  },
  infoButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Balance Card */
  balanceCard: {
    backgroundColor: palette.cardPurple,
    borderRadius: 14,
    padding: 20,
  },
  balanceTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  balanceTextBlock: {
    flex: 1,
    paddingRight: 8,
  },
  balanceLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  balanceLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
  totalEarningsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalEarningsLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    marginBottom: 1,
  },
  totalEarningsAmount: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    fontWeight: "600",
  },

  /* Wallet illustration */
  walletIllustration: {
    width: 80,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  walletCardBehind: {
    position: "absolute",
    top: 0,
    right: 6,
    width: 24,
    height: 32,
    borderRadius: 5,
    backgroundColor: palette.gold,
    opacity: 0.85,
    transform: [{ rotate: "18deg" }],
  },
  walletBody: {
    width: 56,
    height: 44,
    borderRadius: 9,
    backgroundColor: palette.cardPurpleLight,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 8,
    marginTop: 12,
  },
  walletButton: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  coinCircle: {
    position: "absolute",
    bottom: 0,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: palette.gold,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#3D1B78",
  },
  coinSymbol: {
    color: "#3D1B78",
    fontWeight: "700",
    fontSize: 12,
  },

  /* Action buttons */
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 9,
    flex: 1,
    gap: 6,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.surfaceBorder,
  },
  actionButtonText: {
    color: palette.purpleIcon,
    fontSize: 12,
    fontWeight: "500",
  },

  /* Info banner */
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.surfaceBorder,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  infoIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: palette.purpleIconBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  infoBannerText: {
    flex: 1,
    color: palette.textSecondary,
    fontSize: 11,
  },
  learnMore: {
    color: palette.purpleIcon,
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 6,
  },

  /* Breakdown card */
  breakdownCard: {
    backgroundColor: palette.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.surfaceBorder,
  },
  sectionTitle: {
    color: palette.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  breakdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  breakdownTextBlock: {
    flex: 1,
  },
  breakdownLabel: {
    color: palette.textPrimary,
    fontSize: 13,
    fontWeight: "500",
  },
  breakdownSubtext: {
    color: palette.textSecondary,
    fontSize: 10,
    marginTop: 1,
  },
  breakdownAmount: {
    color: palette.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: palette.surfaceBorder,
  },

  /* How to withdraw */
  howToCard: {
    backgroundColor: palette.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: palette.surfaceBorder,
  },
  howToRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepsColumn: {
    flex: 1,
    paddingRight: 6,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: palette.primaryMuted,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  stepNumberText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    color: palette.textPrimary,
    fontSize: 12,
    fontWeight: "600",
  },
  stepDescription: {
    color: palette.textSecondary,
    fontSize: 10,
    marginTop: 1,
  },
  illustrationColumn: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Withdraw Now */
  withdrawNowButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: palette.primary,
    borderRadius: 11,
    paddingVertical: 13,
  },
  withdrawNowText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
