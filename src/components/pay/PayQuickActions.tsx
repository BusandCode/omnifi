import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from '../../theme/ScaleContext';
import { fontScale, moderateScale } from '../../theme/scale';

type Action = {
  iconSet: 'feather' | 'mci';
  icon: keyof typeof Feather.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  sub: string;
  route?: Href;
};

const actions: Action[] = [
  { iconSet: 'feather', icon: 'arrow-up-right', title: 'Send money', sub: 'To bank or mobile', route: '/send' },
  { iconSet: 'feather', icon: 'arrow-down-left', title: 'Request money', sub: 'From anyone' },
  { iconSet: 'mci', icon: 'qrcode-scan', title: 'Scan to pay', sub: 'Instantly' },
  { iconSet: 'feather', icon: 'file-text', title: 'Pay bill', sub: 'Utilities & more' },
];

export function PayQuickActions() {
  const router = useRouter();
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(20),
      styles: StyleSheet.create({
        row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: s(13) },
        item: { flex: 1, alignItems: 'center' },
        iconBox: {
          width: s(52),
          height: s(52),
          borderRadius: s(26),
          backgroundColor: 'rgba(167,139,250,0.15)',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: s(8),
        },
        title: { color: colors.textPrimary, fontSize: f(11), fontWeight: '600', textAlign: 'center' },
        sub: { color: colors.textSecondary, fontSize: f(9), textAlign: 'center', marginTop: s(2) },
      }),
    };
  }, [layoutScale]);

  const handlePress = (action: Action) => {
    if (action.route) {
      router.push(action.route);
    }
    // TODO: wire routes for Request money, Scan to pay, Pay bill
  };

  return (
    <View style={styles.row}>
      {actions.map((a) => (
        <TouchableOpacity key={a.title} style={styles.item} onPress={() => handlePress(a)}>
          <View style={styles.iconBox}>
            {a.iconSet === 'feather' ? (
              <Feather name={a.icon as keyof typeof Feather.glyphMap} size={iconSize} color={colors.primaryLight} />
            ) : (
              <MaterialCommunityIcons
                name={a.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                size={iconSize}
                color={colors.primaryLight}
              />
            )}
          </View>
          <Text style={styles.title}>{a.title}</Text>
          <Text style={styles.sub}>{a.sub}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}