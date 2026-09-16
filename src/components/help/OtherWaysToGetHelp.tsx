import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Method = {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  sub: string;
  subColor: string;
};

export function OtherWaysToGetHelp() {
  const { colors: themeColors } = useTheme();

  const methods: Method[] = useMemo(
    () => [
      {
        id: 'call',
        icon: <Feather name="phone" size={17} color="#fff" />,
        iconBg: '#34C759',
        title: 'Call Support',
        sub: '+234 800 123 4567',
        subColor: themeColors.success,
      },
      {
        id: 'twitter',
        icon: <FontAwesome5 name="twitter" size={15} color="#fff" />,
        iconBg: '#1DA1F2',
        title: 'Twitter Support',
        sub: '@OmniFi_Support',
        subColor: '#1DA1F2',
      },
      {
        id: 'visit',
        icon: <Ionicons name="location" size={17} color="#fff" />,
        iconBg: themeColors.primary,
        title: 'Visit Us',
        sub: 'OmniFi HQ, Abuja, FCT',
        subColor: themeColors.primaryLight,
      },
    ],
    [themeColors]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '700', marginBottom: 12 },
        row: {
          flexDirection: 'row',
          gap: 8,
        },
        card: {
          flex: 1,
          backgroundColor: themeColors.surface,
          borderRadius: 14,
          paddingVertical: 16,
          paddingHorizontal: 8,
          alignItems: 'center',
        },
        iconCircle: {
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        },
        cardTitle: { color: themeColors.textPrimary, fontSize: 11.5, fontWeight: '600', textAlign: 'center' },
        cardSub: { fontSize: 9.5, marginTop: 4, textAlign: 'center' },
      }),
    [themeColors]
  );

  return (
    <View>
      <Text style={styles.title}>Other Ways to Get Help</Text>
      <View style={styles.row}>
        {methods.map((m) => (
          <TouchableOpacity key={m.id} style={styles.card}>
            <View style={[styles.iconCircle, { backgroundColor: m.iconBg }]}>
              {m.icon}
            </View>
            <Text style={styles.cardTitle}>{m.title}</Text>
            <Text style={[styles.cardSub, { color: m.subColor }]} numberOfLines={1}>
              {m.sub}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}