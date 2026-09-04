import { useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";
import { useTheme } from "../../theme/ThemeContext";

type Props = { value: string; onChangeText: (t: string) => void };

export function PhoneNumberInput({ value, onChangeText }: Props) {
  const layoutScale = useLayoutScale();
  const { colors: themeColors } = useTheme();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(12),
      styles: StyleSheet.create({
        stepTitle: {
          color: themeColors.textPrimary,
          fontSize: f(12.5),
          fontWeight: '700',
          marginBottom: s(8)
        },
        wrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: s(8),
          backgroundColor: themeColors.surface,
          borderRadius: s(12),
          paddingHorizontal: s(10),
          paddingVertical: s(9),
          borderWidth: 1.5,
          borderColor: themeColors.primary,
        },
        phoneIconBox: {
          width: s(26),
          height: s(26),
          borderRadius: s(13),
          backgroundColor: themeColors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        },
        codeBlock: { flexDirection: 'row', alignItems: 'center', gap: s(3) },
        flag: { fontSize: f(12) },
        code: { color: themeColors.textPrimary, fontSize: f(11.5), fontWeight: '600' },
        divider: { width: 1, height: s(17), backgroundColor: themeColors.border },
        input: {
          flex: 1,
          color: themeColors.textPrimary,
          fontSize: f(11.5)
        },
        contactBtn: {
          width: s(26),
          height: s(26),
          borderRadius: s(7),
          backgroundColor: themeColors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    };
  }, [layoutScale, themeColors]);

  return (
    <View>
      <Text style={styles.stepTitle}>2. Enter Phone Number</Text>
      <View style={styles.wrapper}>
        <View style={styles.phoneIconBox}>
          <Feather name="phone" size={iconSize} color="#fff" />
        </View>

        <View style={styles.codeBlock}>
          <Text style={styles.flag}>🇳🇬</Text>
          <Text style={styles.code}>+234</Text>
          <Feather name="chevron-down" size={iconSize - 1} color={themeColors.textSecondary} />
        </View>

        <View style={styles.divider} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter phone number"
          placeholderTextColor={themeColors.textSecondary}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TouchableOpacity style={styles.contactBtn}>
          <Feather name="user" size={iconSize} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}