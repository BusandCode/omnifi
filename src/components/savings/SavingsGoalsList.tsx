import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

type Goal = {
  id: string;
  icon: React.ReactNode;
  bg: string;
  name: string;
  status?: string;
  target: number;
  saved: number;
  color: string;
};

const fmt = (n: number) => `₦${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

export function SavingsGoalsList() {
  const { colors: themeColors } = useTheme();

  const goals: Goal[] = useMemo(
    () => [
      {
        id: 'house',
        icon: <Ionicons name="home" size={18} color="#4B23B6" />,
        bg: 'rgba(167,139,250,0.2)',
        name: 'New House',
        status: 'On Track',
        target: 10000000,
        saved: 4250000,
        color: themeColors.primary,
      },
      {
        id: 'education',
        icon: <Ionicons name="school" size={18} color="#F5A623" />,
        bg: 'rgba(245,166,35,0.2)',
        name: 'Education Fund',
        target: 5000000,
        saved: 2150000,
        color: '#F5A623',
      },
      {
        id: 'vacation',
        icon: <Ionicons name="airplane" size={18} color="#34C759" />,
        bg: 'rgba(52,199,89,0.2)',
        name: 'Vacation Trip',
        target: 2000000,
        saved: 850000,
        color: '#34C759',
      },
    ],
    [themeColors]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
        title: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '600' },
        viewAll: { color: themeColors.primaryLight, fontSize: 12, fontWeight: '600' },
        card: { backgroundColor: themeColors.surface, borderRadius: 16, padding: 14 },
        topRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
        iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
        nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
        name: { color: themeColors.textPrimary, fontSize: 13.5, fontWeight: '700' },
        statusPill: { backgroundColor: 'rgba(167,139,250,0.2)', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
        statusText: { color: themeColors.primaryLight, fontSize: 9, fontWeight: '600' },
        targetText: { color: themeColors.textSecondary, fontSize: 11, marginTop: 2 },
        track: { height: 5, borderRadius: 3, backgroundColor: '#2C2C2E', overflow: 'hidden', marginBottom: 8 },
        fill: { height: 5, borderRadius: 3 },
        bottomRow: { flexDirection: 'row', justifyContent: 'space-between' },
        savedText: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '500' },
        pctText: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '600' },
      }),
    [themeColors]
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Your Savings Goals</Text>
        <TouchableOpacity><Text style={styles.viewAll}>See All</Text></TouchableOpacity>
      </View>

      <View style={{ gap: 10 }}>
        {goals.map((g) => {
          const pct = Math.round((g.saved / g.target) * 100);
          return (
            <TouchableOpacity key={g.id} style={styles.card}>
              <View style={styles.topRow}>
                <View style={[styles.iconCircle, { backgroundColor: g.bg }]}>{g.icon}</View>
                <View style={{ flex: 1 }}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>{g.name}</Text>
                    {g.status && (
                      <View style={styles.statusPill}>
                        <Text style={styles.statusText}>{g.status}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.targetText}>Target: {fmt(g.target)}</Text>
                </View>
                <Feather name="chevron-right" size={16} color={themeColors.textSecondary} />
              </View>

              <View style={styles.track}>
                <View style={[styles.fill, { width: `${pct}%`, backgroundColor: g.color }]} />
              </View>

              <View style={styles.bottomRow}>
                <Text style={styles.savedText}>{fmt(g.saved)} saved</Text>
                <Text style={styles.pctText}>{pct}%</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}