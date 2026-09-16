import { View, Text, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const ICON_SIZE = 18;

type Biller = {
  id: string;
  kind: 'dstv' | 'bulb' | 'wifi' | 'droplet';
  bg: string;
  name: string;
  sub: string;
};

const billers: Biller[] = [
  { id: 'dstv', kind: 'dstv', bg: '#0A5EC2', name: 'DStv', sub: '7002345678' },
  { id: 'electricity', kind: 'bulb', bg: '#1A1A1A', name: 'Electricity', sub: 'Ikeja Electric' },
  { id: 'airtime', kind: 'wifi', bg: '#0F2E1F', name: 'Airtime', sub: 'MTN' },
  { id: 'water', kind: 'droplet', bg: '#0F1F2E', name: 'Water', sub: 'Lagos Water' },
];

function BillerIcon({
  kind,
  dstvTextStyle,
}: {
  kind: Biller['kind'];
  dstvTextStyle: TextStyle;
}) {
  if (kind === 'dstv') return <Text style={[dstvTextStyle, { fontSize: ICON_SIZE * 0.6 }]}>DStv</Text>;
  if (kind === 'bulb') return <Ionicons name="bulb" size={ICON_SIZE} color="#F5C518" />;
  if (kind === 'wifi') return <Feather name="wifi" size={ICON_SIZE - 2} color="#34C759" />;
  return <Feather name="droplet" size={ICON_SIZE - 2} color="#3DB2FF" />;
}

export function QuickPayRow() {
  const { colors: themeColors } = useTheme();

  const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
    title: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '600' },
    manage: { color: themeColors.primaryLight, fontSize: 12, fontWeight: '600' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    item: { alignItems: 'center', gap: 6, width: 60 },
    iconCircle: {
      width: 48, height: 48, borderRadius: 24,
      justifyContent: 'center', alignItems: 'center',
    },
    addCircle: {
      width: 48, height: 48, borderRadius: 24,
      borderWidth: 1.5, borderColor: themeColors.border, borderStyle: 'dashed',
      justifyContent: 'center', alignItems: 'center',
    },
    dstvText: { color: '#fff', fontWeight: '800' },
    name: { color: themeColors.textPrimary, fontSize: 10.5, fontWeight: '600', textAlign: 'center' },
    sub: { color: themeColors.textSecondary, fontSize: 9, textAlign: 'center' },
  });

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Quick pay</Text>
        <TouchableOpacity><Text style={styles.manage}>Manage</Text></TouchableOpacity>
      </View>

      <View style={styles.row}>
        {billers.map((b) => (
          <TouchableOpacity key={b.id} style={styles.item}>
            <View style={[styles.iconCircle, { backgroundColor: b.bg }]}>
              <BillerIcon kind={b.kind} dstvTextStyle={styles.dstvText} />
            </View>
            <Text style={styles.name} numberOfLines={1}>{b.name}</Text>
            <Text style={styles.sub} numberOfLines={1}>{b.sub}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.item}>
          <View style={styles.addCircle}>
            <Feather name="plus" size={ICON_SIZE} color={themeColors.textSecondary} />
          </View>
          <Text style={styles.name}>Add new</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}