import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function LogoutButton() {
  return (
    <TouchableOpacity style={styles.btn}>
      <Feather name="log-out" size={15} color={colors.danger} />
      <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    borderWidth: 1.2, borderColor: colors.danger, borderRadius: 16, paddingVertical: 15,
  },
  text: { color: colors.danger, fontSize: 14, fontWeight: '700' },
});