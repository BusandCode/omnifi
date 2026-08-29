import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function NeedHelp() {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="help-circle" size={13} color={colors.primaryLight} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Need Help?</Text>
        <Text style={styles.sub}>Contact our support team if you have any issues.</Text>
      </View>
      <Feather name="chevron-right" size={14} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface, borderRadius: 12, padding: 10, marginTop: 8,
  },
  iconBox: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 11, fontWeight: '600' },
  sub: { color: colors.textSecondary, fontSize: 9, marginTop: 1 },
});