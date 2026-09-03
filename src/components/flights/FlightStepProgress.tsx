// FlightStepProgress.tsx — "N of total" label + dot/line stepper used in the checkout flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '../../theme/colors';

interface Props {
  current: number;
  total: number;
}

export default function FlightStepProgress({ current, total }: Props) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>
        {current} of {total}
      </Text>
      <View style={styles.row}>
        {steps.map((step, idx) => {
          const state = step < current ? 'done' : step === current ? 'active' : 'pending';
          return (
            <React.Fragment key={step}>
              <View
                style={[
                  styles.dot,
                  state === 'done' && styles.dotDone,
                  state === 'active' && styles.dotActive,
                ]}
              >
                {state === 'done' && <Check color="#fff" size={11} strokeWidth={3} />}
                {state === 'active' && <View style={styles.dotActiveInner} />}
              </View>
              {idx < steps.length - 1 && (
                <View style={[styles.line, step < current && styles.lineDone]} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginBottom: 14,
  },
  label: {
    color: colors.primary,
    fontSize: 11.5,
    fontWeight: '700',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dotActive: {
    borderColor: colors.primary,
  },
  dotActiveInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.border,
  },
  lineDone: {
    backgroundColor: colors.primary,
  },
});
