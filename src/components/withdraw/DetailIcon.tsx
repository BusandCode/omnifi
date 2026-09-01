import { Feather } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

type Tone = 'purple' | 'red' | 'green';

const BG: Record<Tone, string> = {
  purple: colors.primaryTint,
  red: colors.dangerTint,
  green: colors.successTint,
};
const FG: Record<Tone, string> = {
  purple: colors.primary,
  red: colors.danger,
  green: colors.success,
};

export default function DetailIcon({
  name,
  tone = 'purple',
  size = 13,
}: {
  name: React.ComponentProps<typeof Feather>['name'];
  tone?: Tone;
  size?: number;
}) {
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