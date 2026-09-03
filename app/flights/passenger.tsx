// app/flights/passenger.tsx — passenger details form before payment/review
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Mail,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFlightDetails, TRIP_ROUTE } from "../../src/config/flightMockData";
import { colors } from "../../src/theme/colors";

type PassengerForm = {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
};

const EMPTY_FORM: PassengerForm = {
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  phone: "",
};

export default function PassengerDetailsScreen() {
  const router = useRouter();
  const { flightKey } = useLocalSearchParams<{ flightKey?: string }>();
  const flight = getFlightDetails(flightKey);
  const [form, setForm] = useState<PassengerForm>(EMPTY_FORM);
  const [saveInfo, setSaveInfo] = useState(true);

  const update = (key: keyof PassengerForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isValid =
    form.firstName.trim().length > 1 &&
    form.lastName.trim().length > 1 &&
    form.email.includes("@") &&
    form.phone.trim().length >= 7;

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable
          style={styles.iconBtn}
          onPress={() => router.back()}
          hitSlop={10}
        >
          <ChevronLeft color={colors.textPrimary} size={20} />
        </Pressable>
        <Text style={styles.title}>Passenger details</Text>
        <View style={styles.iconBtn} />
      </View>

      <View style={styles.progressRow}>
        <ProgressStep label="Flight" active done />
        <ProgressLine />
        <ProgressStep label="Passenger" active />
        <ProgressLine />
        <ProgressStep label="Review" />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.route}>
            {TRIP_ROUTE.from} → {TRIP_ROUTE.to}
          </Text>
          <Text style={styles.routeMeta}>
            {flight.outbound.date} • {flight.cabin} • {TRIP_ROUTE.passengers}
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Passenger 1 (Adult)</Text>

            <View style={styles.nameRow}>
              <Field
                icon={User}
                label="First name"
                value={form.firstName}
                onChangeText={(v) => update("firstName", v)}
                placeholder="John"
                style={{ flex: 1, marginRight: 8 }}
              />
              <Field
                icon={User}
                label="Last name"
                value={form.lastName}
                onChangeText={(v) => update("lastName", v)}
                placeholder="Doe"
                style={{ flex: 1 }}
              />
            </View>

            <Field
              icon={Calendar}
              label="Date of birth"
              value={form.dob}
              onChangeText={(v) => update("dob", v)}
              placeholder="DD / MM / YYYY"
            />

            <Field
              icon={Mail}
              label="Email address"
              value={form.email}
              onChangeText={(v) => update("email", v)}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Field
              icon={Phone}
              label="Phone number"
              value={form.phone}
              onChangeText={(v) => update("phone", v)}
              placeholder="+234 800 000 0000"
              keyboardType="phone-pad"
            />
          </View>

          <Pressable
            style={styles.saveRow}
            onPress={() => setSaveInfo((v) => !v)}
          >
            <View style={[styles.checkbox, saveInfo && styles.checkboxActive]}>
              {saveInfo && <View style={styles.checkboxDot} />}
            </View>
            <Text style={styles.saveLabel}>
              Save passenger info for faster checkout next time
            </Text>
          </Pressable>

          <View style={styles.noticeRow}>
            <ShieldCheck color={colors.primary} size={16} />
            <Text style={styles.noticeText}>
              Enter your name exactly as it appears on your travel ID or
              passport.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total for 1 passenger</Text>
          <Text style={styles.footerTotal}>{flight.fareBreakdown.total}</Text>
        </View>
        <Pressable
          disabled={!isValid}
          onPress={() =>
            router.push({ pathname: "/flights/review", params: { flightKey } })
          }
        >
          <LinearGradient
            colors={[colors.primary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.continueBtn, !isValid && styles.continueBtnDisabled]}
          >
            <Text style={styles.continueLabel}>Continue</Text>
            <ChevronRight color="#fff" size={15} />
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Field({
  icon: Icon,
  label,
  style,
  ...inputProps
}: {
  icon: React.ComponentType<any>;
  label: string;
  style?: any;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  keyboardType?: any;
  autoCapitalize?: any;
}) {
  return (
    <View style={[styles.fieldWrap, style]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldInputRow}>
        <Icon color={colors.textSecondary} size={15} />
        <TextInput
          style={styles.fieldInput}
          placeholderTextColor={colors.textSecondary}
          {...inputProps}
        />
      </View>
    </View>
  );
}

function ProgressStep({
  label,
  active,
  done,
}: {
  label: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <View style={styles.progressStep}>
      <View
        style={[
          styles.progressDot,
          active && styles.progressDotActive,
          done && styles.progressDotDone,
        ]}
      />
      <Text
        style={[styles.progressLabel, active && styles.progressLabelActive]}
      >
        {label}
      </Text>
    </View>
  );
}

function ProgressLine() {
  return <View style={styles.progressLine} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: colors.textPrimary, fontSize: 15.5, fontWeight: "700" },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  progressStep: { alignItems: "center", width: 56 },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
    marginBottom: 4,
  },
  progressDotActive: { backgroundColor: colors.primary },
  progressDotDone: { backgroundColor: colors.primary },
  progressLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: "600",
  },
  progressLabelActive: { color: colors.primary },
  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 14,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 14, paddingTop: 6, paddingBottom: 20 },
  route: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
  routeMeta: {
    color: colors.textSecondary,
    fontSize: 10.5,
    textAlign: "center",
    marginTop: 3,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginTop: 14,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 12.5,
    fontWeight: "700",
    marginBottom: 12,
  },
  nameRow: { flexDirection: "row" },
  fieldWrap: { marginBottom: 12 },
  fieldLabel: { color: colors.textSecondary, fontSize: 9.5, marginBottom: 5 },
  fieldInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    height: 42,
  },
  fieldInput: { flex: 1, color: colors.textPrimary, fontSize: 12.5 },
  saveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 14,
    paddingHorizontal: 2,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkboxDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: "#fff",
  },
  saveLabel: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 10.5,
    lineHeight: 14,
  },
  noticeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 14,
    backgroundColor: "rgba(139, 92, 246, 0.10)",
    borderRadius: 12,
    padding: 10,
  },
  noticeText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 9.5,
    lineHeight: 13,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerLabel: { color: colors.textSecondary, fontSize: 10 },
  footerTotal: { color: colors.primary, fontSize: 18, fontWeight: "800" },
  continueBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 46,
    borderRadius: 13,
    paddingHorizontal: 22,
  },
  continueBtnDisabled: { opacity: 0.4 },
  continueLabel: { color: "#fff", fontSize: 13, fontWeight: "700" },
});
