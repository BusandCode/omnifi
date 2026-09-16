import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

type Props = {
  onPress: () => void;
  loading?: boolean;
};

export function SaveButton({ onPress, loading }: Props) {
  const { colors: themeColors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[styles.btn, { backgroundColor: themeColors.primary, opacity: loading ? 0.7 : 1 }]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>Save Changes</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center', alignItems: 'center',
    borderRadius: 16, paddingVertical: 15,
  },
  text: { fontSize: 14, fontWeight: '700', color: '#fff' },
});