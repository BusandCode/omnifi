import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextStyle } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

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
  iconSize,
  dstvTextStyle,
}: {
  kind: Biller['kind'];
  iconSize: number;
  dstvTextStyle: TextStyle;
}) {
  if (kind === 'dstv') return <Text style={[dstvTextStyle, { fontSize: iconSize * 0.6 }]}>DStv</Text>;
  if (kind === 'bulb') return <Ionicons name="bulb" size={iconSize} color="#F5C518" />;
  if (kind === 'wifi') return <Feather name="wifi" size={iconSize - 2} color="#34C759" />;
  return <Feather name="droplet" size={iconSize - 2} color="#3DB2FF" />;
}

export function QuickPayRow() {
  const layoutScale = useLayoutScale();

  const { styles, iconSize } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      iconSize: s(18),
      styles: StyleSheet.create({
        header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: s(14) },
        title: { color: colors.textPrimary, fontSize: f(15), fontWeight: '600' },
        manage: { color: colors.primaryLight, fontSize: f(12), fontWeight: '600' },
        row: { flexDirection: 'row', justifyContent: 'space-between' },
        item: { alignItems: 'center', gap: s(6), width: s(60) },
        iconCircle: { 
          width: s(48), height: s(48), borderRadius: s(24), 
          justifyContent: 'center', alignItems: 'center' 
        },
        addCircle: {
          width: s(48), height: s(48), borderRadius: s(24),
          borderWidth: 1.5, borderColor: '#3A3A3C', borderStyle: 'dashed',
          justifyContent: 'center', alignItems: 'center',
        },
        dstvText: { color: '#fff', fontWeight: '800' },
        name: { color: colors.textPrimary, fontSize: f(10.5), fontWeight: '600', textAlign: 'center' },
        sub: { color: colors.textSecondary, fontSize: f(9), textAlign: 'center' },
      }),
    };
  }, [layoutScale]);

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
              <BillerIcon kind={b.kind} iconSize={iconSize} dstvTextStyle={styles.dstvText} />
            </View>
            <Text style={styles.name} numberOfLines={1}>{b.name}</Text>
            <Text style={styles.sub} numberOfLines={1}>{b.sub}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.item}>
          <View style={styles.addCircle}>
            <Feather name="plus" size={iconSize} color={colors.textSecondary} />
          </View>
          <Text style={styles.name}>Add new</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}