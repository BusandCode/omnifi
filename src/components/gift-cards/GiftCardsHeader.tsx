import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export function GiftCardsHeader() {
  const { colors: themeColors } = useTheme();
  const styles = getStyles(themeColors);

  return (
    <View>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={17} color={themeColors.textPrimary} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Gift Cards</Text>
        </View>
        <TouchableOpacity
          style={styles.tradeBtn}
          onPress={() => router.push('/gift-card-trading')}
        >
          <Feather name="repeat" size={10} color={themeColors.primaryLight} />
          <Text style={styles.tradeText}>Trade Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function getStyles(themeColors: any) {
  return StyleSheet.create({
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    left: { flexDirection: 'row', alignItems: 'center', gap: 9 },
    backBtn: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: themeColors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: { color: themeColors.textPrimary, fontSize: 17, fontWeight: '700' },
    tradeBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderWidth: 1.1,
      borderColor: themeColors.primary,
      borderRadius: 9,
      paddingHorizontal: 9,
      paddingVertical: 6,
    },
    tradeText: { color: themeColors.primaryLight, fontSize: 10, fontWeight: '600' },
  });
}