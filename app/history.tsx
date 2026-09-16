// app/history.tsx
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../src/theme/ThemeContext';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: themeColors.background,
        },
        content: {
          paddingHorizontal: 20,
          paddingBottom: 40,
          flex: 1,
        },
        backButton: {
          padding: 4,
          marginBottom: 8,
          alignSelf: 'flex-start',
        },
        header: {
          marginBottom: 20,
        },
        title: {
          color: themeColors.textPrimary,
          fontSize: 28,
          fontWeight: '700',
        },
        emptyState: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 60,
        },
        emptyStateTitle: {
          color: themeColors.textPrimary,
          fontSize: 20,
          fontWeight: '600',
          marginTop: 16,
        },
        emptyStateText: {
          color: themeColors.textSecondary,
          fontSize: 14,
          textAlign: 'center',
          marginTop: 8,
          paddingHorizontal: 40,
          lineHeight: 20,
        },
      }),
    [themeColors]
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20 }
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={themeColors.textPrimary} />
        </Pressable>

        <View style={styles.header}>
          <Text style={styles.title}>Transaction History</Text>
        </View>

        <View style={styles.emptyState}>
          <Feather name="clock" size={64} color={themeColors.border} />
          <Text style={styles.emptyStateTitle}>No Transactions Yet</Text>
          <Text style={styles.emptyStateText}>
            Your transaction history will appear here once you start making transactions.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}