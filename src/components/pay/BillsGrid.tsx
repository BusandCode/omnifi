import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from '../../theme/ScaleContext';
import { fontScale, moderateScale } from '../../theme/scale';

type Bill =
  | { family: 'feather'; icon: keyof typeof Feather.glyphMap; label: string }
  | { family: 'mci'; icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string };

const bills: Bill[] = [
  { family: 'feather', icon: 'smartphone', label: 'Airtime' },
  { family: 'feather', icon: 'wifi', label: 'Data' },
  { family: 'feather', icon: 'zap', label: 'Electricity' },
  { family: 'feather', icon: 'tv', label: 'TV' },
  { family: 'mci', icon: 'soccer', label: 'Betting' },
];

export function BillsGrid() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(20),
      styles: StyleSheet.create({
        wrapper: { marginBottom: s(2) },
        header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: s(14) },
        title: { color: colors.textPrimary, fontSize: f(11.5), fontWeight: '500' },
        viewAll: { color: colors.primaryLight, fontSize: f(12), fontWeight: '600' },
        row: { flexDirection: 'row', justifyContent: 'space-between' },
        item: { alignItems: 'center', gap: s(8) },
        iconBox: {
          width: s(52),
          height: s(52),
          borderRadius: s(16),
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: 'rgba(167,139,250,0.35)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        label: { color: colors.textPrimary, fontSize: f(11) },
        card: { backgroundColor: colors.surface, borderRadius: s(16), padding: s(12), marginBottom: s(14) },
      }),
    };
  }, [layoutScale]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Pay bills & top up</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {bills.map((b) => (
            <TouchableOpacity
              key={b.label}
              style={styles.item}
              onPress={() => {
                if (b.label === 'Airtime') router.push('/airtime');
                if (b.label === 'Data') router.push('/data');
              }}
            >
              <View style={styles.iconBox}>
                {b.family === 'feather' ? (
                  <Feather name={b.icon} size={iconSize} color={colors.primaryLight} />
                ) : (
                  <MaterialCommunityIcons name={b.icon} size={iconSize} color={colors.primaryLight} />
                )}
              </View>
              <Text style={styles.label}>{b.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}