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
    <View style={{ gap: 16 }}>
      <View style={styles.introCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.introTitle}>Set Duration</Text>
          <Text style={styles.introSub}>Choose how long you want this budget to last.</Text>
        </View>
        <View style={styles.introIcon}>
          <Feather name="calendar" size={30} color={colors.primaryLight} />
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>1. Choose Duration</Text>
        <Text style={styles.sectionSub}>Select the time period for this budget.</Text>

        <View style={{ gap: 8 }}>
          {DURATION_OPTIONS.map((d) => {
            const active = d.key === selected;
            return (
              <TouchableOpacity
                key={d.key}
                style={[styles.row, active && styles.rowActive]}
                onPress={() => onSelect(d.key)}
              >
                <View style={styles.rowIcon}>
                  <Feather name="calendar" size={15} color={colors.primaryLight} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>{d.label}</Text>
                  <Text style={styles.rowSub}>{d.sub}</Text>
                </View>
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active && <Ionicons name="checkmark" size={12} color="#fff" />}
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
            <Feather name="calendar" size={15} color={colors.primaryLight} />
          </View>
          <Text style={styles.dateLabel}>Start Date</Text>
          <Text style={styles.dateValue}>{startDateLabel}</Text>
          <Feather name="chevron-right" size={15} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.infoNote}>
          <Ionicons name="information-circle-outline" size={15} color={colors.primaryLight} />
          <Text style={styles.infoText}>
            Your budget will start on {startDateLabel} and automatically reset based on the selected duration.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
        <Text style={styles.continueText}>Continue</Text>
        <Ionicons name="chevron-forward" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  introCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.25)',
  },
  introTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  introSub: { color: colors.textSecondary, fontSize: 11, marginTop: 5, lineHeight: 15 },
  introIcon: {
    width: 64, height: 64, borderRadius: 16,
    backgroundColor: 'rgba(167,139,250,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  sectionTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', marginBottom: 3 },
  sectionSub: { color: colors.textSecondary, fontSize: 11, marginBottom: 12 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 13,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  rowActive: { borderColor: colors.primary },
  rowIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  rowLabel: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  rowSub: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  radio: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  radioActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dateRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 13,
    marginBottom: 10,
  },
  dateLabel: { flex: 1, color: colors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  dateValue: { color: colors.primaryLight, fontSize: 12, fontWeight: '700', marginRight: 6 },
  infoNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: 'rgba(167,139,250,0.08)',
    borderRadius: 12,
    padding: 12,
  },
  infoText: { flex: 1, color: colors.textSecondary, fontSize: 10.5, lineHeight: 15 },
  continueBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 15,
  },
  continueText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});