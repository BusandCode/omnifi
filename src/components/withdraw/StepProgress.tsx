import { Feather } from '@expo/vector-icons';
import { Fragment, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const STEPS = ['Amount', 'Bank Details', 'Review', 'Complete'];

export default function StepProgress({ currentStep }: { currentStep: number }) {
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          backgroundColor: themeColors.surfaceAlt,
          alignItems: 'center',
          justifyContent: 'center',
        },
        circleActive: {
          backgroundColor: themeColors.primary,
        },
        circleText: {
          color: themeColors.textSecondary,
          fontSize: 13,
          fontWeight: '600',
        },
        circleTextActive: {
          color: '#fff',
        },
        line: {
          flex: 1,
          height: 2,
          backgroundColor: themeColors.border,
          marginTop: 15,
          marginHorizontal: -6,
        },
        lineActive: {
          backgroundColor: themeColors.primary,
        },
        label: {
          color: themeColors.textSecondary,
          fontSize: 10,
          marginTop: 6,
          textAlign: 'center',
        },
        labelActive: {
          color: themeColors.textPrimary,
          fontWeight: '500',
        },
      }),
    [themeColors]
  );

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