import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const STEPS = ['Category', 'Budget Amount', 'Duration', 'Review'];

type Props = { currentStep: number }; // 1-based

export function StepIndicator({ currentStep }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 2 },
  stepGroup: { flexDirection: 'row', alignItems: 'flex-start', flex: 1 },
  stepCol: { alignItems: 'center', width: 52 },
  circle: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: themeColors.surface,
    borderWidth: 1.5, borderColor: themeColors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  circleActive: { backgroundColor: themeColors.primary, borderColor: themeColors.primary },
  circleText: { color: themeColors.textSecondary, fontSize: 9.5, fontWeight: '700' },
  circleTextActive: { color: '#fff' },
  label: { color: themeColors.textSecondary, fontSize: 8, marginTop: 3, textAlign: 'center' },
  labelActive: { color: themeColors.textPrimary, fontWeight: '600' },
  connector: {
    flex: 1, height: 1.5, backgroundColor: themeColors.border,
    marginTop: 11, marginHorizontal: -4,
  },
  connectorActive: { backgroundColor: themeColors.primary },
}),
    [themeColors]
  );

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
                  <Ionicons name="checkmark" size={11} color="#fff" />
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

