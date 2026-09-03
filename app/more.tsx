// app/more.tsx — Expo Router screen composing the More screen components
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MoreHeader from "../src/components/more/MoreHeader";
import MoreBannerCard from "../src/components/more/MoreBannerCard";
import ServicesGrid from "../src/components/more/ServicesGrid";
import { MORE_SERVICES, MoreService } from "../src/config/moreServices";
import { colors } from "../src/theme/colors";

export default function MoreScreen() {
  const router = useRouter();

  const handleServicePress = (service: MoreService) => {
    router.push(service.route as any);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <MoreHeader onBack={() => router.back()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Services</Text>
        <ServicesGrid services={MORE_SERVICES} onServicePress={handleServicePress} />
        <MoreBannerCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 24,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 12.5,
    fontWeight: "700",
    marginBottom: 12,
  },
});
