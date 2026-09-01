import { Feather } from '@expo/vector-icons';
import { Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const STEPS = ['Amount', 'Bank Details', 'Review', 'Complete'];

export default function StepProgress({ currentStep }: { currentStep: number }) {
  return (
    <View style={styles.row}>
      {STEPS.map((label, i) => {
        const step = i + 1;
        const isDone = step < currentStep;
        const isActive = step === currentStep;
        const isFilled = isDone || isActive;
        return (
          <Fragment key={label}>
            <View style={styles.col}>
              <View style={[styles.circle, isFilled && styles.circleActive]}>
                {isDone ? (
                  <Feather name="check" size={14} color="#fff" />
                ) : (
                  <Text style={[styles.circleText, isFilled && styles.circleTextActive]}>
                    {step}
                  </Text>
                )}
              </View>
              <Text style={[styles.label, isFilled && styles.labelActive]} numberOfLines={1}>
                {label}
              </Text>
            </View>
            {i < STEPS.length - 1 && (
              <View style={[styles.line, isDone && styles.lineActive]} />
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  col: {
    alignItems: 'center',
    width: 60,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: colors.primary,
  },
  circleText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  circleTextActive: {
    color: '#fff',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
    marginTop: 15,
    marginHorizontal: -6,
  },
  lineActive: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  labelActive: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
});