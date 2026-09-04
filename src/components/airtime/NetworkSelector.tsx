import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

export type Network = 'mtn' | 'airtel' | 'glo' | '9mobile';

const GLO_LOGO: ImageSourcePropType = require('../../../assets/glo.png');
const MTN_LOGO: ImageSourcePropType = require("../../../assets/mtn.png");
const AIRTEL_LOGO: ImageSourcePropType = require("../../../assets/airtel.png");
const NINE_MOBILE_LOGO: ImageSourcePropType = require("../../../assets/9mobile.png");

const networks: { id: Network; label: string; bg: string; textColor: string; border?: string }[] = [
  { id: 'mtn', label: 'MTN', bg: '#000', textColor: '#FFCB05', border: '#FFCB05' },
  { id: 'airtel', label: 'Airtel', bg: '#000', textColor: '#ED1C24' },
  { id: 'glo', label: 'Glo', bg: '#000', textColor: '#4CAF50' },
  { id: '9mobile', label: '9mobile', bg: '#000', textColor: '#B5D334' },
];

const LOGO_IMAGES: Partial<Record<Network, ImageSourcePropType>> = {
  glo: GLO_LOGO,
  mtn: MTN_LOGO,
  airtel: AIRTEL_LOGO,
  '9mobile': NINE_MOBILE_LOGO,
};

type Props = { selected: Network; onSelect: (n: Network) => void };

export function NetworkSelector({ selected, onSelect }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      styles: StyleSheet.create({
        stepTitle: {
          color: themeColors.textPrimary,
          fontSize: f(12.5),
          fontWeight: '700',
          marginBottom: s(8)
        },
        row: { flexDirection: 'row', gap: s(7) },
        card: {
          flex: 1,
          alignItems: 'center',
          gap: s(6),
          paddingVertical: s(10),
          backgroundColor: themeColors.surface,
          borderRadius: s(12),
          borderWidth: 1.5,
          borderColor: 'transparent',
        },
        checkBadge: {
          position: 'absolute',
          top: s(-5),
          right: s(-5),
          width: s(16),
          height: s(16),
          borderRadius: s(8),
          backgroundColor: themeColors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: themeColors.background,
        },
        logoCircle: {
          width: s(32),
          height: s(32),
          borderRadius: s(16),
          justifyContent: 'center',
          alignItems: 'center'
        },
        logoImage: {
          width: s(32),
          height: s(32),
          borderRadius: s(16),
          resizeMode: 'contain',
        },
        logoText: { fontSize: f(13), fontWeight: '800' },
        name: { color: themeColors.textPrimary, fontSize: f(9.5), fontWeight: '600' },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View>
      <Text style={styles.stepTitle}>1. Select Network</Text>
      <View style={styles.row}>
        {networks.map((n) => {
          const active = n.id === selected;
          const logo = LOGO_IMAGES[n.id];
          return (
            <TouchableOpacity
              key={n.id}
              style={[styles.card, active && { borderColor: n.border || themeColors.primary }]}
              onPress={() => onSelect(n.id)}
            >
              {active && (
                <View style={styles.checkBadge}>
                  <Feather name="check" size={9} color="#fff" />
                </View>
              )}
              {logo ? (
                <Image source={logo} style={styles.logoImage} />
              ) : (
                <View style={[styles.logoCircle, { backgroundColor: n.bg }]}>
                  <Text style={[styles.logoText, { color: n.textColor }]}>
                    {n.id === '9mobile' ? '9' : n.label.slice(0, 1)}
                  </Text>
                </View>
              )}
              <Text style={styles.name}>{n.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}