import { Feather } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

type Tone = 'purple' | 'red' | 'green';

export default function DetailIcon({
  name,
  tone = 'purple',
  size = 13,
}: {
  name: React.ComponentProps<typeof Feather>['name'];
  tone?: Tone;
  size?: number;
}) {
  const { colors: themeColors } = useTheme();

  const BG: Record<Tone, string> = {
    purple: themeColors.primaryTint,
    red: themeColors.dangerTint,
    green: themeColors.successTint,
  };
  const FG: Record<Tone, string> = {
    purple: themeColors.primary,
    red: themeColors.danger,
    green: themeColors.success,
  };

  return (
    <View style={[styles.wrap, { backgroundColor: BG[tone] }]}>
      <Feather name={name} size={size} color={FG[tone]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});