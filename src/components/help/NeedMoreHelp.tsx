import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../../theme/ThemeContext';

export function NeedMoreHelp() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    padding: 14,
    overflow: 'hidden',
  },
  title: { color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 5 },
  sub: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10.5,
    lineHeight: 15,
    maxWidth: '70%',
  },
  illustration: {
    position: 'absolute',
    top: 10,
    right: 6,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 44,
  },
  chatBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: themeColors.primary,
    borderRadius: 12,
    padding: 10,
  },
  chatBtnTitle: { color: '#fff', fontSize: 10.5, fontWeight: '700' },
  chatBtnSub: { color: 'rgba(255,255,255,0.75)', fontSize: 8.5, marginTop: 1 },
  emailBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.4)',
  },
  emailBtnTitle: { color: '#fff', fontSize: 10.5, fontWeight: '700' },
  emailBtnSub: { color: 'rgba(255,255,255,0.55)', fontSize: 8.5, marginTop: 1 },
}),
    [themeColors]
  );

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#2A1858', '#160D33', '#0A0616']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Text style={styles.title}>Need more help?</Text>
      <Text style={styles.sub}>
        Our support team is ready to assist you 24/7 whenever you need it.
      </Text>

      <View style={styles.illustration}>
        <Ionicons name="headset" size={64} color="rgba(167,139,250,0.55)" />
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.chatBtn} onPress={() => router.push('/livechat')}>
          <Ionicons name="chatbubbles" size={13} color="#fff" />
          <View>
            <Text style={styles.chatBtnTitle}>Chat with us</Text>
            <Text style={styles.chatBtnSub}>We reply in minutes</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emailBtn}>
          <Feather name="mail" size={13} color={themeColors.primaryLight} />
          <View>
            <Text style={styles.emailBtnTitle}>Email Support</Text>
            <Text style={styles.emailBtnSub}>Get help via email</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

