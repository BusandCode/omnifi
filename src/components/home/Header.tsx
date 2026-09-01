import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export function Header({ name, avatarUri }: { name: string; avatarUri: string }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.left} onPress={() => router.push('/profile')}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>{name} 👋</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bell} onPress={() => router.push('/notifications')}>
        <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  greeting: { color: colors.textSecondary, fontSize: 13 },
  name: { color: colors.textPrimary, fontSize: 17, fontWeight: '600' },
  bell: { padding: 4 },
  dot: { position: 'absolute', top: 2, right: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primaryLight },
});