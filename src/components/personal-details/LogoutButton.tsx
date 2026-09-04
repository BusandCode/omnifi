import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function LogoutButton() {
  const { colors: themeColors } = useTheme();

  return (
    <TouchableOpacity style={[styles.btn, { borderColor: themeColors.danger }]}>
      <Feather name="log-out" size={15} color={themeColors.danger} />
      <Text style={[styles.text, { color: themeColors.danger }]}>Log Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    borderWidth: 1.2, borderRadius: 16, paddingVertical: 15,
  },
  text: { fontSize: 14, fontWeight: '700' },
});