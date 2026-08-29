import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fontScale, moderateScale } from '../../theme/scale';

export function PaySearchBar() {
  const { styles, iconSize, scanIconSize } = useMemo(() => {
    const s = moderateScale;
    const f = fontScale;
    return {
      iconSize: s(18),
      scanIconSize: s(18),
      styles: StyleSheet.create({
        wrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: s(10),
          backgroundColor: colors.surface,
          borderRadius: s(14),
          paddingHorizontal: s(14),
          paddingVertical: s(10),
          marginBottom: s(14),
        },
        input: { flex: 1, color: colors.textPrimary, fontSize: f(14) },
      }),
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <Feather name="search" size={iconSize} color={colors.textSecondary} />
      <TextInput
        placeholder="Who are you paying?"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
      <TouchableOpacity>
        <MaterialCommunityIcons name="qrcode-scan" size={scanIconSize} color={colors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
}