import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function HelpHeader() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconBtn: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: themeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: { left: 0 },
  right: { right: 0 },
  title: { color: themeColors.textPrimary, fontSize: 18, fontWeight: '700' },
  subtitle: {
    color: themeColors.textSecondary,
    maxWidth:260,
    // padding:5,
    // height:50,
    margin:"auto",
    fontSize: 12.5,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 10,
    paddingHorizontal: 12,
  },
}),
    [themeColors]
  );

  return (
    <View>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.iconBtn, styles.left]} hitSlop={8}>
          <Ionicons name="chevron-back" size={20} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Help Center</Text>
        <TouchableOpacity style={[styles.iconBtn, styles.right]}>
          <Ionicons name="headset-outline" size={19} color={themeColors.primaryLight} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>
        We're here to help you. Find answers, get support and solve issues fast.
      </Text>
    </View>
  );
}

