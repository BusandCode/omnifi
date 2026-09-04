import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const steps = [
  { icon: 'clipboard' as const, num: 1, title: 'Copy', sub: 'Copy your unique virtual account number' },
  { icon: 'home' as const, num: 2, title: 'Transfer', sub: 'Make a transfer from any bank or fintech app' },
  { icon: 'clock' as const, num: 3, title: 'Wait', sub: "We'll notify you once your payment is received" },
  { icon: 'check-square' as const, num: 4, title: 'Done', sub: 'Money will be added to your account' },
];

const ICON_SIZE = 44;

export function HowItWorks() {
  const { colors: themeColors } = useTheme();

  return (
    <View>
      <Text style={[styles.title, { color: themeColors.textPrimary }]}>How it works</Text>
      <View style={styles.row}>
        <View style={[styles.connectorLine, { borderColor: themeColors.border }]} pointerEvents="none" />
        {steps.map((s) => (
          <View key={s.num} style={styles.stepWrap}>
            <View style={[styles.iconCircle, { backgroundColor: themeColors.surface }]}>
              <Feather name={s.icon} size={18} color={themeColors.primaryLight} />
              <View style={[styles.numBadge, { backgroundColor: themeColors.primary }]}>
                <Text style={styles.numText}>{s.num}</Text>
              </View>
            </View>
            <Text style={[styles.stepTitle, { color: themeColors.textPrimary }]}>{s.title}</Text>
            <Text style={[styles.stepSub, { color: themeColors.textSecondary }]} numberOfLines={3}>{s.sub}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 15, fontWeight: '600', marginBottom: 16, marginTop: -10 },
  row: { flexDirection: 'row', position: 'relative' },
  connectorLine: {
    position: 'absolute',
    top: ICON_SIZE / 2,
    left: '12.5%',
    right: '12.5%',
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 0.7,
  },
  stepWrap: { flex: 1, alignItems: 'center', paddingHorizontal: 2 },
  iconCircle: {
    width: ICON_SIZE, height: ICON_SIZE, borderRadius: ICON_SIZE / 2,
    justifyContent: 'center', alignItems: 'center', position: 'relative',
  },
  numBadge: {
    position: 'absolute', top: -3, right: -3,
    width: 16, height: 16, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
  },
  numText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  stepTitle: { fontSize: 11, fontWeight: '700', marginTop: 8 },
  stepSub: { fontSize: 9, textAlign: 'center', marginTop: 4, lineHeight: 12 },
});