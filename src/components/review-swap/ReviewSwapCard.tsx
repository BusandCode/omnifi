import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";

export function ReviewSwapCard() {
  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.label}>You send</Text>
        <View style={styles.row}>
          <View style={styles.currencyPill}>
            <View style={styles.flagCircle}>
              <Text style={styles.flag}>🇺🇸</Text>
            </View>
            <View>
              <View style={styles.codeRow}>
                <Text style={styles.code}>USD</Text>
                <Ionicons
                  name="chevron-down"
                  size={12}
                  color={colors.textPrimary}
                />
              </View>
              <Text style={styles.name}>US Dollar</Text>
            </View>
          </View>
          <Text style={styles.amount}>$1,000.00</Text>
        </View>

        <View style={styles.flipRow}>
          <View style={styles.flipLine} />
          <View style={styles.flipBtn}>
            <View style={styles.flipIconColumn}>
              <View style={styles.flipBtn}>
                <View style={styles.flipBtn}>
                    <Ionicons name="swap-vertical" size={16} color={colors.primaryLight} />
                </View>
            {/* <Feather name="repeat" size={13} color={colors.primaryLight} style={{ transform: [{ rotate: '90deg' }] }} /> */}
          </View>
            </View>
          </View>
        </View>

        <Text style={styles.label}>You receive</Text>
        <View style={styles.row}>
          <View style={styles.currencyPill}>
            <View style={styles.flagCircle}>
              <Text style={styles.flag}>🇳🇬</Text>
            </View>
            <View>
              <View style={styles.codeRow}>
                <Text style={styles.code}>NGN</Text>
                <Ionicons
                  name="chevron-down"
                  size={12}
                  color={colors.textPrimary}
                />
              </View>
              <Text style={styles.name}>Nigerian Naira</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.amount}>₦1,542,350.00</Text>
            <Text style={styles.approx}>≈ $1,000.00</Text>
          </View>
        </View>
      </View>

      <View style={styles.rateCard}>
        <View style={styles.rateRow}>
          <Text style={styles.rateLabel}>Exchange rate</Text>
          <View style={styles.rateValueRow}>
            <Text style={styles.rateValue}>1 USD = 1,542.35 NGN</Text>
            <Feather name="info" size={10} color={colors.primaryLight} />
          </View>
        </View>
        <View style={styles.rateRow}>
          <Text style={styles.rateLabel}>Rate updates in</Text>
          <Text style={styles.timerValue}>00:43</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  label: { color: colors.textSecondary, fontSize: 10, marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  currencyPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    maxWidth: "44%",
    backgroundColor: "rgba(142, 142, 147, 0.18)",
    borderRadius: 12,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  flagCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F11",
  },
  flag: { fontSize: 18 },
  codeRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  code: { color: colors.textPrimary, fontSize: 13.5, fontWeight: "700" },
  name: { color: colors.textSecondary, fontSize: 8.5, marginTop: 1 },
  amount: { color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  approx: { color: colors.textSecondary, fontSize: 9.5, marginTop: 2 },
  flipRow: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  flipLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#2C2C2E",
  },
  flipBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#241A38",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(167,139,250,0.3)",
  },
  flipIconColumn: {
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rateCard: { backgroundColor: "#1A1225", borderRadius: 12, padding: 12 },
  rateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  rateLabel: { color: colors.textSecondary, fontSize: 10.5 },
  rateValueRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  rateValue: { color: colors.textPrimary, fontSize: 11, fontWeight: "600" },
  timerValue: { color: colors.primaryLight, fontSize: 11, fontWeight: "700" },
});
