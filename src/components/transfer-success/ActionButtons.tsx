import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function ActionButtons({ onBackHome }: { onBackHome: () => void }) {
  return (
    <View style={{ gap: 8 }}>
      <TouchableOpacity style={styles.primaryBtn} onPress={onBackHome}>
        <Feather name="home" size={14} color="#fff" />
        <Text style={styles.primaryText}>Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Feather name="grid" size={12} color={colors.primaryLight} />
          <Text style={styles.secondaryText}>View Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn}>
          <Feather name="send" size={12} color={colors.primaryLight} />
          <Text style={styles.secondaryText}>Send Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  primaryBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6,
    backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 12,
  },
  primaryText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 8 },
  secondaryBtn: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5,
    borderWidth: 1.2, borderColor: colors.primary, borderRadius: 12, paddingVertical: 10,
  },
  secondaryText: { color: colors.primaryLight, fontSize: 11.5, fontWeight: '600' },
});