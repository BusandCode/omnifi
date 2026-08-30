import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

const STEPS = ['Category', 'Budget Amount', 'Duration', 'Review'];

type Props = { currentStep: number }; // 1-based

export function StepIndicator({ currentStep }: Props) {
  return (
    <View style={styles.row}>
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < currentStep;
        const active = stepNum === currentStep;
        const isLast = i === STEPS.length - 1;

        return (
          <View key={label} style={styles.stepGroup}>
            <View style={styles.stepCol}>
              <View style={[styles.circle, (done || active) && styles.circleActive]}>
                {done ? (
                  <Ionicons name="checkmark" size={13} color="#fff" />
                ) : (
                  <Text style={[styles.circleText, active && styles.circleTextActive]}>{stepNum}</Text>
                )}
              </View>
              <Text style={[styles.label, (done || active) && styles.labelActive]} numberOfLines={1}>
                {label}
              </Text>
            </View>
            {!isLast && <View style={[styles.connector, done && styles.connectorActive]} />}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 2 },
  stepGroup: { flexDirection: 'row', alignItems: 'flex-start', flex: 1 },
  stepCol: { alignItems: 'center', width: 60 },
  circle: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: colors.surface,
    borderWidth: 1.5, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  circleActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  circleText: { color: colors.textSecondary, fontSize: 11, fontWeight: '700' },
  circleTextActive: { color: '#fff' },
  label: { color: colors.textSecondary, fontSize: 9, marginTop: 4, textAlign: 'center' },
  labelActive: { color: colors.textPrimary, fontWeight: '600' },
  connector: {
    flex: 1, height: 1.5, backgroundColor: colors.border,
    marginTop: 13, marginHorizontal: -4,
  },
  connectorActive: { backgroundColor: colors.primary },
});