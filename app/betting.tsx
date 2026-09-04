// app/betting.tsx
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { BettingHeader } from '../src/components/betting/BettingHeader';
import { BettingHero } from '../src/components/betting/BettingHero';
import { PlatformSearchBar } from '../src/components/betting/PlatformSearchBar';
import { PopularPlatforms, platforms } from '../src/components/betting/PopularPlatforms';
import { AccountDetailsCard } from '../src/components/betting/AccountDetailsCard';
import { BettingAmountCard } from '../src/components/betting/BettingAmountCard';
import { BettingFooter } from '../src/components/betting/BettingFooter';
import { useTheme } from '../src/theme/ThemeContext';

export default function BettingScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();

  const [search, setSearch] = useState('');
  const [selectedPlatformId, setSelectedPlatformId] = useState(platforms[0].id);
  const [username, setUsername] = useState('Silver1999');
  const [amount, setAmount] = useState('25000');

  const selectedPlatform = platforms.find((p) => p.id === selectedPlatformId) ?? platforms[0];

  const handleContinue = () => {
    // wire up to review/confirm screen
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background, paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { backgroundColor: themeColors.background, paddingTop: insets.top + 8 }]}>
        <BettingHeader subtitle="Fund your betting accounts instantly" />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BettingHero />

        <View>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>
            1. Select Betting Platform
          </Text>
          <PlatformSearchBar value={search} onChangeText={setSearch} />
        </View>

        <PopularPlatforms selected={selectedPlatformId} onSelect={setSelectedPlatformId} />

        <View style={{ marginTop: -4 }}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>2. Account Details</Text>
        </View>
        <AccountDetailsCard
          platform={selectedPlatform}
          username={username}
          onChangeUsername={setUsername}
          onChangePlatform={() => {}}
        />

        <View style={{ marginTop: -4 }}>
          <Text style={[styles.sectionTitle, { color: themeColors.textPrimary }]}>3. Amount</Text>
        </View>
        <BettingAmountCard amount={amount} onChangeAmount={setAmount} />
      </ScrollView>

      <View style={[styles.fixedBottom, { backgroundColor: themeColors.background }]}>
        <TouchableOpacity style={[styles.cta, { backgroundColor: themeColors.primary }]} onPress={handleContinue}>
          <Text style={styles.ctaText}>Continue to Review</Text>
          <Feather name="chevron-right" size={18} color="#fff" />
        </TouchableOpacity>
        <BettingFooter />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fixedHeader: { paddingHorizontal: 20, paddingBottom: 8, gap: 8 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20, gap: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '700', marginBottom: 12 },
  fixedBottom: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 0, gap: 8 },
  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    borderRadius: 16, paddingVertical: 16,
  },
  ctaText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});