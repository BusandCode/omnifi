import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';

export function PushBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['rgba(167,139,250,0.28)', 'rgba(167,139,250,0.06)', 'rgba(20,17,24,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.card}>
        <View style={styles.iconBox}>
          <View style={styles.dot} />
          <Feather name="bell" size={18} color={colors.primaryLight} />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Enable push notifications</Text>
          <Text style={styles.sub}>Stay updated with real-time alerts on transactions and more.</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.enableBtn}>
            <Text style={styles.enableText}>Enable</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDismissed(true)} hitSlop={8}>
            <Feather name="x" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#141118',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    position: 'relative',
  },
  // dot: {
  //   position: 'absolute', top: -2, right: -2,
  //   width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primaryLight,
  // },
  dot: {
  position: 'absolute', top: 4, right: 4,
  width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primaryLight,
},
  iconBox: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(167,139,250,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  textBlock: { flex: 1 },
  title: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  sub: { color: colors.textSecondary, fontSize: 11, marginTop: 3, lineHeight: 15 },
  actions: { alignItems: 'center', gap: 10,justifyContent:'center',flexDirection:'row' },
  enableBtn: { backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  enableText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});