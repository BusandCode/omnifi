import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function ScreenshotUpload() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(
    () => StyleSheet.create({
  label: { color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600', marginBottom: 3 },
  sub: { color: themeColors.textSecondary, fontSize: 11, marginBottom: 10 },
  dropzone: {
    borderWidth: 1.2,
    borderStyle: 'dashed',
    borderColor: themeColors.primary,
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: { color: themeColors.textSecondary, fontSize: 12 },
  titleAccent: { color: themeColors.textPrimary, fontWeight: '700' },
  hint: { color: themeColors.textSecondary, fontSize: 10.5, marginTop: 2 },
}),
    [themeColors]
  );

  return (
    <View>
      <Text style={styles.label}>Attach Screenshot (Optional)</Text>
      <Text style={styles.sub}>Add screenshots to help us understand the issue better.</Text>

      <TouchableOpacity style={styles.dropzone}>
        <View style={styles.iconCircle}>
          <Feather name="upload-cloud" size={20} color={themeColors.primaryLight} />
        </View>
        <Text style={styles.title}>
          <Text style={styles.titleAccent}>Tap to upload</Text> or drag and drop
        </Text>
        <Text style={styles.hint}>PNG, JPG, JPEG (Max 5MB)</Text>
      </TouchableOpacity>
    </View>
  );
}

