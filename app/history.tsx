// app/history.tsx
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../src/theme/colors';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20 }
        ]}
      >
        {/* Back Button */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.textPrimary} />
        </Pressable>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Transaction History</Text>
        </View>

        {/* Placeholder Content */}
        <View style={styles.emptyState}>
          <Feather name="clock" size={64} color={colors.border} />
          <Text style={styles.emptyStateTitle}>No Transactions Yet</Text>
          <Text style={styles.emptyStateText}>
            Your transaction history will appear here once you start making transactions.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    color: colors.textPrimary,
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
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyStateText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});