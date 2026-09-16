import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RequestSuccessHeader } from '../src/components/request-success/RequestSuccessHeader';
import { SuccessBadge } from '../src/components/request-success/SuccessBadge';
import { RequestDetailsCard } from '../src/components/request-success/RequestDetailsCard';
import { WhatHappensNextCard } from '../src/components/request-success/WhatHappensNextCard';
import { RequestSuccessActions } from '../src/components/request-success/RequestSuccessActions';
import { useTheme } from '../src/theme/ThemeContext';
import { getCurrency, CurrencyCode } from '../src/constants/currencies';

export default function RequestSuccessScreen() {
  const insets = useSafeAreaInsets();
  const { colors: themeColors } = useTheme();
  const params = useLocalSearchParams<{
    requestId?: string;
    recipientName?: string;
    recipientInitials?: string;
    recipientSub?: string;
    amount?: string;
    currency?: string;
    note?: string;
  }>();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: themeColors.background },
        fixedHeader: {
          paddingHorizontal: 20,
          paddingBottom: 8,
          backgroundColor: themeColors.background,
        },
        scroll: { flex: 1 },
        content: {
          paddingHorizontal: 20,
          paddingTop: 2,
          paddingBottom: 16,
          gap: 10,
        },
        badgeCard: {
          backgroundColor: themeColors.surface,
          borderRadius: 16,
          paddingVertical: 12,
          alignItems: 'center',
        },
        successTitle: { color: themeColors.textPrimary, fontSize: 16, fontWeight: '700', marginTop: 2 },
        successSub: { color: themeColors.textSecondary, fontSize: 10.5, marginTop: 2 },
        pendingPill: {
          flexDirection: 'row', alignItems: 'center', gap: 5,
          backgroundColor: 'rgba(245,158,11,0.15)',
          borderRadius: 18,
          paddingHorizontal: 11,
          paddingVertical: 5,
          marginTop: 8,
        },
        pendingText: { color: '#F59E0B', fontSize: 10, fontWeight: '700' },
        doneBtn: {
          backgroundColor: themeColors.primary,
          borderRadius: 14,
          paddingVertical: 14,
          alignItems: 'center',
        },
        doneText: { color: '#fff', fontSize: 13.5, fontWeight: '700' },
        footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 },
        footerText: { color: themeColors.textSecondary, fontSize: 9.5 },
      }),
    [themeColors],
  );

  const currencyCode: CurrencyCode =
    params.currency === 'USD' || params.currency === 'EUR' ? params.currency : 'NGN';
  const { symbol, code } = getCurrency(currencyCode);

  const requestId = params.requestId ?? `REQ-${Date.now().toString().slice(-9)}`;
  const recipientName = params.recipientName || 'Recipient';
  const recipientInitials =
    params.recipientInitials ||
    recipientName
      .split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  const recipientSub = params.recipientSub || 'OmniFi User';
  const amountValue = Number(params.amount) || 0;
  const amountLabel = `${symbol}${amountValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${code}`;

  const now = new Date();
  const dateTimeLabel = now.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }) + ' • ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const recipientFirstName = recipientName.split(' ')[0];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 6 }]}>
        <RequestSuccessHeader />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgeCard}>
          <SuccessBadge />
          <Text style={styles.successTitle}>Request Sent!</Text>
          <Text style={styles.successSub}>We've notified the recipient.</Text>
          <View style={styles.pendingPill}>
            <Feather name="clock" size={10} color="#F59E0B" />
            <Text style={styles.pendingText}>Pending</Text>
          </View>
        </View>

        <RequestDetailsCard
          requestId={requestId}
          recipientName={recipientName}
          recipientInitials={recipientInitials}
          recipientSub={recipientSub}
          amountLabel={amountLabel}
          accountBadge={currencyCode !== 'NGN' ? `${code} Account` : undefined}
          accountFlag={currencyCode === 'USD' ? '🇺🇸' : currencyCode === 'EUR' ? '🇪🇺' : undefined}
          note={params.note}
          dateTimeLabel={dateTimeLabel}
        />

        <WhatHappensNextCard recipientFirstName={recipientFirstName} />

        <RequestSuccessActions
          requestId={requestId}
          onRequestAgain={() => router.replace('/request-money')}
        />

        <TouchableOpacity style={styles.doneBtn} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Feather name="lock" size={10} color={themeColors.textSecondary} />
          <Text style={styles.footerText}>Your request is secure and private</Text>
        </View>
      </ScrollView>
    </View>
  );
}