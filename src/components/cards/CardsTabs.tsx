import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

const tabs = ['My cards', 'Card settings'] as const;

export function CardsTabs() {
  const [active, setActive] = useState<typeof tabs[number]>('My cards');

  return (
    <View style={styles.row}>
      {tabs.map((t) => (
        <TouchableOpacity key={t} onPress={() => setActive(t)} style={styles.tab}>
          <Text style={[styles.text, active === t && styles.textActive]}>{t}</Text>
          {active === t && <View style={styles.underline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 20 },
  tab: { paddingBottom: 8 },
  text: { color: colors.textSecondary, fontSize: 14, fontWeight: '600' },
  textActive: { color: colors.textPrimary },
  underline: { height: 2, backgroundColor: colors.primary, borderRadius: 1, marginTop: 6 },
});