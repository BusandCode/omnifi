import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Props = { time: string };

export function ChatResolvedBanner({ time }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <View style={styles.badge}>
        <Ionicons name="checkmark-circle" size={13} color={colors.success} />
        <Text style={styles.text}>Chat resolved • {time}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 10 },
  line: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  text: { color: colors.textSecondary, fontSize: 10.5 },
});