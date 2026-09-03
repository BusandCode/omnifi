import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  LayoutChangeEvent,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CURRENCIES,
  CurrencyCode,
  getCurrency,
} from "../../constants/currencies";
import { useBalances } from "../../store/BalanceContext";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";

const actions = [
  { icon: "plus", label: "Add money", primary: true },
  { icon: "arrow-right", label: "Send", primary: false },
  { icon: "refresh-cw", label: "Swap", primary: false },
  { icon: "target", label: "Savings", primary: false },
] as const;

const VISIBLE_COUNT = 3;
const GAP = 8;

type BalanceCardProps = {
  visible: boolean;
  onToggleVisible: () => void;
  currency: CurrencyCode;
  onChangeCurrency: (code: CurrencyCode) => void;
};

export type BalanceCardHandle = {
  resetActions: () => void;
};

export const BalanceCard = forwardRef<BalanceCardHandle, BalanceCardProps>(
  ({ visible, onToggleVisible, currency, onChangeCurrency }, ref) => {
    const [rowWidth, setRowWidth] = useState(0);
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const scrollRef = useRef<ScrollView>(null);
    const insets = useSafeAreaInsets();
    const { balances } = useBalances();
    const { colors: themeColors } = useTheme();

    const activeCurrency = getCurrency(currency);

    const itemWidth =
      rowWidth > 0 ? (rowWidth - GAP * (VISIBLE_COUNT - 1)) / VISIBLE_COUNT : 0;

    const onRowLayout = useCallback((e: LayoutChangeEvent) => {
      setRowWidth(e.nativeEvent.layout.width);
    }, []);

    useImperativeHandle(ref, () => ({
      resetActions: () => {
        scrollRef.current?.scrollTo({ x: 0, animated: true });
      },
    }));

    // Pulled from the shared store so Add Money / Send debits and
    // credits are reflected here immediately, and persist across app restarts.
    const convertedBalance = balances[currency].toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return (
      <View style={styles.wrapper}>
        <View style={styles.labelRow}>
          <View style={styles.labelGroup}>
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>
              Total balance
            </Text>
            <TouchableOpacity onPress={onToggleVisible} hitSlop={8}>
              <Ionicons
                name={visible ? "eye-outline" : "eye-off-outline"}
                size={16}
                color={themeColors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.currencyPill,
              { backgroundColor: themeColors.surface },
            ]}
            onPress={() => setCurrencyOpen(true)}
          >
            <Text style={styles.flag}>{activeCurrency.flag}</Text>
            <Text
              style={[styles.currencyText, { color: themeColors.textPrimary }]}
            >
              {activeCurrency.code}
            </Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color={themeColors.textPrimary}
            />
          </TouchableOpacity>

          <Modal
            visible={currencyOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setCurrencyOpen(false)}
          >
            <Pressable
              style={[
                styles.modalOverlay,
                { paddingTop: insets.top + 140, paddingRight: 20 },
              ]}
              onPress={() => setCurrencyOpen(false)}
            >
              <View
                style={[
                  styles.dropdown,
                  { backgroundColor: themeColors.surface },
                ]}
              >
                {CURRENCIES.map((c) => (
                  <TouchableOpacity
                    key={c.code}
                    style={[
                      styles.dropdownItem,
                      c.code === currency && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      onChangeCurrency(c.code);
                      setCurrencyOpen(false);
                    }}
                  >
                    <Text style={styles.flag}>{c.flag}</Text>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.dropdownCode,
                          { color: themeColors.textPrimary },
                        ]}
                      >
                        {c.code}
                      </Text>
                      <Text
                        style={[
                          styles.dropdownLabel,
                          { color: themeColors.textSecondary },
                        ]}
                      >
                        {c.label}
                      </Text>
                    </View>
                    {c.code === currency && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={themeColors.primaryLight}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>
        </View>

        <View style={styles.balanceRow}>
          <View style={styles.amountGroup}>
            <Text style={[styles.amount, { color: themeColors.textPrimary }]}>
              {activeCurrency.code}
            </Text>
            {visible ? (
              <Text style={[styles.amount, { color: themeColors.textPrimary }]}>
                {convertedBalance}
              </Text>
            ) : (
              <View style={styles.dotsRow}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      { backgroundColor: themeColors.textPrimary },
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        </View>

        <View onLayout={onRowLayout}>
          {rowWidth > 0 && (
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={itemWidth + GAP}
              decelerationRate="fast"
              snapToAlignment="start"
              contentContainerStyle={{ gap: GAP }}
            >
              {actions.map((a) => (
                <TouchableOpacity
                  key={a.label}
                  style={[
                    styles.actionBtn,
                    { width: itemWidth, backgroundColor: themeColors.surface },
                  ]}
                  onPress={() => {
                    if (a.label === "Add money") {
                      router.push({
                        pathname: "/add-money",
                        params: { currency },
                      });
                    }
                    if (a.label === "Send") {
                      router.push({ pathname: "/send", params: { currency } });
                    }
                    if (a.label === "Savings") router.push("/savings");
                    if (a.label === "Swap") router.push("/swap");
                  }}
                >
                  <Feather
                    name={a.icon}
                    size={18}
                    color={themeColors.primaryLight}
                  />
                  <Text
                    style={[
                      styles.actionText,
                      { color: themeColors.textPrimary },
                    ]}
                  >
                    {a.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    );
  },
);

BalanceCard.displayName = "BalanceCard";

const styles = StyleSheet.create({
  wrapper: { marginBottom: 0 },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  labelGroup: { flexDirection: "row", alignItems: "center", gap: 6 },
  label: { color: colors.textSecondary, fontSize: 12, fontWeight: "500" },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  amountGroup: { flexDirection: "row", alignItems: "center", gap: 10 },
  amount: { color: colors.textPrimary, fontSize: 20, fontWeight: "700",marginTop:-8,marginBottom:8 },
  dotsRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: colors.textPrimary,
  },
  currencyPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  flag: { fontSize: 14 },
  currencyText: { color: colors.textPrimary, fontSize: 10, fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  dropdown: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 6,
    width: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  dropdownItemActive: {
    backgroundColor: "rgba(167,139,250,0.12)",
  },
  dropdownCode: { color: colors.textPrimary, fontSize: 12, fontWeight: "700" },
  dropdownLabel: { color: colors.textSecondary, fontSize: 10, marginTop: 1 },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: colors.surface,
    paddingVertical: 5,
    borderRadius: 10,
  },
  actionText: { fontSize: 12, fontWeight: "600", color: colors.textPrimary },
});
