import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function SuccessHeader() {
  return (
    <View style={styles.row}>
      <View />
      <TouchableOpacity style={styles.shareBtn}>
        <Feather name="share" size={14} color={colors.primaryLight} />
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'flex-end',marginTop: 8, },
  shareBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  shareText: { color: colors.primaryLight, fontSize: 13, fontWeight: '600' },
});