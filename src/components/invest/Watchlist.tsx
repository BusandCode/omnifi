import { Feather } from "@expo/vector-icons";
import { useMemo } from "react";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../theme/colors";
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

type Stock = {
  name: string;
  ticker: string;
  logo: "remote" | "local";
  logoUri?: string;
  localLogo?: ImageSourcePropType;
  price: string;
  change: string;
  up: boolean;
  sparkline: string;
};

const APPLE_LOGO: ImageSourcePropType = require("../../../assets/apple.jpg");
const MTN_LOGO: ImageSourcePropType = require("../../../assets/mtn.png");

const stocks: Stock[] = [
  { name: "Apple Inc.", ticker: "AAPL • US Stock", logo: "local", localLogo: APPLE_LOGO, price: "$189.84", change: "2.35%", up: true, sparkline: "M0,20 10,18 20,15 30,17 40,10 50,12 60,5 70,8 80,2" },
  { name: "Tesla, Inc.", ticker: "TSLA • US Stock", logo: "remote", logoUri: "https://logo.clearbit.com/tesla.com", price: "$217.41", change: "3.21%", up: true, sparkline: "M0,18 10,20 20,12 30,14 40,8 50,10 60,4 70,6 80,1" },
  { name: "MTN Nigeria", ticker: "MTNN • Nigerian Stock", logo: "local", localLogo: MTN_LOGO, price: "NGN 240.00", change: "1.48%", up: true, sparkline: "M0,15 10,17 20,14 30,16 40,11 50,13 60,7 70,9 80,4" },
  { name: "SPDR Gold Trust", ticker: "GLD • ETF", logo: "remote", logoUri: "https://logo.clearbit.com/ssga.com", price: "$214.11", change: "0.85%", up: true, sparkline: "M0,16 10,15 20,17 30,13 40,14 50,10 60,11 70,7 80,6" },
];

export function Watchlist() {
  const layoutScale = useLayoutScale();

  const { styles, sparkW, sparkH, arrowSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      sparkW: s(64),
      sparkH: s(24),
      arrowSize: s(10),
      styles: StyleSheet.create({
        wrapper: { marginBottom: s(12) },
        row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: s(8) },
        logo: { width: s(30), height: s(30), borderRadius: s(15), backgroundColor: "#fff" },
        header: { flexDirection: "row", justifyContent: "space-between", marginBottom: s(12) },
        title: { color: colors.textPrimary, fontSize: f(12.5), fontWeight: "500" },
        viewAll: { color: colors.primaryLight, fontSize: f(12.5), fontWeight: "500", marginRight: s(13) },
        card: { backgroundColor: colors.surface, borderRadius: s(16), paddingHorizontal: s(14), marginTop: -5 },
        divider: { borderBottomWidth: 1, borderBottomColor: "#2C2C2E" },
        left: { flexDirection: "row", alignItems: "center", gap: s(10), flex: 1 },
        name: { color: colors.textPrimary, fontSize: f(12.5), fontWeight: "500" },
        ticker: { color: colors.textSecondary, fontSize: f(10.5), marginTop: s(2) },
        chartBox: { marginHorizontal: s(8) },
        price: { color: colors.textPrimary, fontSize: f(12.5), fontWeight: "600" },
        changeRow: { flexDirection: "row", alignItems: "center", gap: s(2), marginTop: s(2) },
        change: { fontSize: f(10.5), fontWeight: "500" },
      }),
    };
  }, [layoutScale]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Watchlist</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {stocks.slice(0, 3).map((stock, i) => (
          <View key={stock.ticker} style={[styles.row, i !== 2 && styles.divider]}>
            <View style={styles.left}>
              {stock.logo === "local" && stock.localLogo ? (
                <Image source={stock.localLogo} style={styles.logo} resizeMode="contain" />
              ) : (
                <Image source={{ uri: stock.logoUri }} style={styles.logo} />
              )}
              <View>
                <Text style={styles.name}>{stock.name}</Text>
                <Text style={styles.ticker}>{stock.ticker}</Text>
              </View>
            </View>

            <View style={styles.chartBox}>
              <Svg width={sparkW} height={sparkH} viewBox="0 0 80 24">
                <Path d={stock.sparkline} fill="none" stroke={colors.success} strokeWidth={2} />
              </Svg>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>{stock.price}</Text>
              <View style={styles.changeRow}>
                <Feather
                  name={stock.up ? "arrow-up-right" : "arrow-down-right"}
                  size={arrowSize}
                  color={stock.up ? colors.success : colors.danger}
                />
                <Text style={[styles.change, { color: stock.up ? colors.success : colors.danger }]}>
                  {stock.change}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}