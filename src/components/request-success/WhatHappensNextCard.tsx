import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Step = {
  icon: React.ReactNode;
  title: string;
  sub: string;
};

type Props = {
  recipientFirstName: string;
};

export function WhatHappensNextCard({ recipientFirstName }: Props) {
  const steps: Step[] = [
    {
      icon: <Ionicons name="mail" size={13} color="#fff" />,
      title: `We've notified ${recipientFirstName}`,
      sub: "They'll get a notification about your request.",
    },
    {
      icon: <Feather name="clock" size={12} color="#fff" />,
      title: 'They review your request',
      sub: `${recipientFirstName} can accept or decline.`,
    },
    {
      icon: <Feather name="dollar-sign" size={12} color="#fff" />,
      title: 'You get paid',
      sub: 'Credited instantly once accepted.',
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>What happens next?</Text>

      {steps.map((s) => (
        <View key={s.title} style={styles.row}>
          <View style={styles.iconCircle}>{s.icon}</View>
          <View style={styles.textCol}>
            <Text style={styles.stepTitle}>{s.title}</Text>
            <Text style={styles.stepSub}>{s.sub}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: 16, padding: 14, gap: 10 },
  title: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700', marginBottom: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconCircle: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  textCol: { flex: 1 },
  stepTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700' },
  stepSub: { color: colors.textSecondary, fontSize: 9.5, marginTop: 1, lineHeight: 13 },
});