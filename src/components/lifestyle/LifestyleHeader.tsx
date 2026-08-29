import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function LifestyleHeader() {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>Lifestyle</Text>
        <Text style={styles.subtitle}>Explore, shop and enjoy exclusive offers</Text>
      </View>
      <TouchableOpacity style={styles.iconBtn}>
        <Feather name="search" size={15} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: '700' },
  subtitle: { color: colors.textSecondary, fontSize: 9.5, marginTop: 2 },
  iconBtn: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
  },
});