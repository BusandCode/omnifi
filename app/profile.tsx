import { ScrollView, StyleSheet, View } from "react-native";
import { ProfileHeader } from "../src/components/profile/ProfileHeader";
import { ProfileSection } from "../src/components/profile/ProfileSection";
import { QuickActionsGrid } from "../src/components/profile/QuickActionsGrid";
import { SecurityBanner } from "../src/components/profile/SecurityBanner";
import { colors } from "../src/theme/colors";
import { useTheme } from "../src/theme/ThemeContext";

export default function ProfileScreen() {
  const { colors: themeColors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <View
        style={[styles.header, { backgroundColor: themeColors.background }]}
      >
        <ProfileHeader avatarUri="https://i.pravatar.cc/300" />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <SecurityBanner />
        <QuickActionsGrid />

        <ProfileSection
          title="Account"
          items={[
            {
              icon: "user",
              title: "Personal details",
              sub: "View and update your information",
              route: "/personal-details",
            },
            // { icon: "home", title: "Linked accounts", sub: "Manage your linked bank accounts and cards" },
            {
              icon: "file-text",
              title: "Statements & documents",
              sub: "Download account statements and documents",
              route: "/statements",
            },
            {
              icon: "pie-chart",
              title: "Spending analytics",
              sub: "View insights and spending reports",
              route: "/spending-analytics",
            },
            {
              icon: "more-horizontal",
              title: "Account limits",
              sub: "Manage transfer, payment and ATM limits",
              route: "/account-limits",
            },
          ]}
        />

        <ProfileSection
          title="Support"
          items={[
            {
              icon: "help-circle",
              title: "Help center",
              sub: "Get help with common questions",
              route: "/help",
            },
            {
              icon: "headphones",
              title: "Contact us",
              sub: "Chat with us or reach our support",
              route: "/contact",
            },
            {
              icon: "shield",
              title: "Report an issue",
              sub: "Let us know about a problem",
              route: "/report-issue",
            },
          ]}
        />
        <ProfileSection
          danger
          items={[
            {
              icon: "log-out",
              title: "Log out",
              sub: "Securely log out of your account",
              action: "logout",
            },
          ]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, marginTop: 12 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: colors.background,
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 24,
    gap: 8,
  },
});
