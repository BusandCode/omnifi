import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function CardsHeader() {
  return (
    <View style={styles.row}>
      {/* <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addBtn}>
        <Feather name="plus" size={16} color={colors.primaryLight} />
      </TouchableOpacity> */}
    </View>
  );
}

export function CardsTitle() {
  return <Text style={styles.title}>Cards</Text>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  addBtn: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 1.5, borderColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: '500', marginTop: 2 },
});