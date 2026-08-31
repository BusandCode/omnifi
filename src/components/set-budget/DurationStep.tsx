import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { DURATION_OPTIONS, DurationKey } from '../../constants/budgetData';

type Props = {
  selected: DurationKey;
  onSelect: (key: DurationKey) => void;
  startDateLabel: string;
  onContinue: () => void;
};

export function DurationStep({ selected, onSelect, startDateLabel, onContinue }: Props) {
  return (
    <View style={{ gap: 13 }}>
      <View style={styles.introCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.introTitle}>Set Duration</Text>
          <Text style={styles.introSub}>Choose how long you want this budget to last.</Text>
        </View>
        <View style={styles.introIcon}>
          <Feather name="calendar" size={24} color={colors.primaryLight} />
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>1. Choose Duration</Text>
        <Text style={styles.sectionSub}>Select the time period for this budget.</Text>

        <View style={{ gap: 7 }}>
          {DURATION_OPTIONS.map((d) => {
            const active = d.key === selected;
            return (
              <TouchableOpacity
                key={d.key}
                style={[styles.row, active && styles.rowActive]}
                onPress={() => onSelect(d.key)}
              >
                <View style={styles.rowIcon}>
                  <Feather name="calendar" size={13} color={colors.primaryLight} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>{d.label}</Text>
                  <Text style={styles.rowSub}>{d.sub}</Text>
                </View>
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active && <Ionicons name="checkmark" size={10} color="#fff" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>2. Start Date</Text>
        <Text style={styles.sectionSub}>Select when this budget should start.</Text>

        <TouchableOpacity style={styles.dateRow}>
          <View style={styles.rowIcon}>
            <Feather name="calendar" size={13} color={colors.primaryLight} />
          </View>
          <Text style={styles.dateLabel}>Start Date</Text>
          <Text style={styles.dateValue}>{startDateLabel}</Text>
          <Feather name="chevron-right" size={13} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.infoNote}>
          <Ionicons name="information-circle-outline" size={13} color={colors.primaryLight} />
          <Text style={styles.infoText}>
            Your budget will start on {startDateLabel} and automatically reset based on the selected duration.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
        <Text style={styles.continueText}>Continue</Text>
        <Ionicons name="chevron-forward" size={14} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  introCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.25)',
  },
  introTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  introSub: { color: colors.textSecondary, fontSize: 9.5, marginTop: 4, lineHeight: 13 },
  introIcon: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: 'rgba(167,139,250,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  sectionTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700', marginBottom: 2 },
  sectionSub: { color: colors.textSecondary, fontSize: 9.5, marginBottom: 10 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 11,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  rowActive: { borderColor: colors.primary },
  rowIcon: {
    width: 29, height: 29, borderRadius: 9,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  rowLabel: { color: colors.textPrimary, fontSize: 11, fontWeight: '700' },
  rowSub: { color: colors.textSecondary, fontSize: 9, marginTop: 2 },
  radio: {
    width: 19, height: 19, borderRadius: 9.5,
    borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  radioActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dateRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 11,
    marginBottom: 9,
  },
  dateLabel: { flex: 1, color: colors.textPrimary, fontSize: 11, fontWeight: '600' },
  dateValue: { color: colors.primaryLight, fontSize: 10.5, fontWeight: '700', marginRight: 5 },
  infoNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 7,
    backgroundColor: 'rgba(167,139,250,0.08)',
    borderRadius: 10,
    padding: 10,
  },
  infoText: { flex: 1, color: colors.textSecondary, fontSize: 9.5, lineHeight: 13 },
  continueBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 13,
  },
  continueText: { color: '#fff', fontSize: 12.5, fontWeight: '700' },
});