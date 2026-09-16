import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMemo } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { DURATION_OPTIONS, DurationKey } from '../../constants/budgetData';

type Props = {
  selected: DurationKey;
  onSelect: (key: DurationKey) => void;
  startDateLabel: string;
};

export function DurationStep({ selected, onSelect, startDateLabel }: Props) {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  introCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: themeColors.surface,
    borderRadius: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: themeColors.primaryTint,
  },
  introTitle: { color: themeColors.textPrimary, fontSize: 14, fontWeight: '700' },
  introSub: { color: themeColors.textSecondary, fontSize: 9.5, marginTop: 4, lineHeight: 13 },
  introIcon: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: themeColors.primaryTint,
    justifyContent: 'center', alignItems: 'center',
  },
  sectionTitle: { color: themeColors.textPrimary, fontSize: 11.5, fontWeight: '700', marginBottom: 2 },
  sectionSub: { color: themeColors.textSecondary, fontSize: 9.5, marginBottom: 10 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: themeColors.surface,
    borderRadius: 12,
    padding: 11,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  rowActive: { borderColor: themeColors.primary },
  rowIcon: {
    width: 29, height: 29, borderRadius: 9,
    backgroundColor: themeColors.primaryTint,
    justifyContent: 'center', alignItems: 'center',
  },
  rowLabel: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '700' },
  rowSub: { color: themeColors.textSecondary, fontSize: 9, marginTop: 2 },
  radio: {
    width: 19, height: 19, borderRadius: 9.5,
    borderWidth: 2, borderColor: themeColors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  radioActive: { backgroundColor: themeColors.primary, borderColor: themeColors.primary },
  dateRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: themeColors.surface,
    borderRadius: 12,
    padding: 11,
    marginBottom: 9,
  },
  dateLabel: { flex: 1, color: themeColors.textPrimary, fontSize: 11, fontWeight: '600' },
  dateValue: { color: themeColors.primaryLight, fontSize: 10.5, fontWeight: '700', marginRight: 5 },
  infoNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 7,
    backgroundColor: themeColors.primaryTint,
    borderRadius: 10,
    padding: 10,
  },
  infoText: { flex: 1, color: themeColors.textSecondary, fontSize: 9.5, lineHeight: 13 },
}),
    [themeColors]
  );

  return (
    <View style={{ gap: 13 }}>
      <View style={styles.introCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.introTitle}>Set Duration</Text>
          <Text style={styles.introSub}>Choose how long you want this budget to last.</Text>
        </View>
        <View style={styles.introIcon}>
          <Feather name="calendar" size={24} color={themeColors.primaryLight} />
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
                  <Feather name="calendar" size={13} color={themeColors.primaryLight} />
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
            <Feather name="calendar" size={13} color={themeColors.primaryLight} />
          </View>
          <Text style={styles.dateLabel}>Start Date</Text>
          <Text style={styles.dateValue}>{startDateLabel}</Text>
          <Feather name="chevron-right" size={13} color={themeColors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.infoNote}>
          <Ionicons name="information-circle-outline" size={13} color={themeColors.primaryLight} />
          <Text style={styles.infoText}>
            Your budget will start on {startDateLabel} and automatically reset based on the selected duration.
          </Text>
        </View>
      </View>
    </View>
  );
}