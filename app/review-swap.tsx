import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ReviewHeader } from '../src/components/review-swap/ReviewHeader';
import { ReviewSwapCard } from '../src/components/review-swap/ReviewSwapCard';
import { ReviewTransactionSummary } from '../src/components/review-swap/ReviewTransactionSummary';
import { GuaranteeBanner } from '../src/components/review-swap/GuaranteeBanner';
import { PaymentMethodRow } from '../src/components/review-swap/PaymentMethodRow';
import { colors } from '../src/theme/colors';

export default function ReviewSwapScreen() {
  const { amount, currency } = useLocalSearchParams<{ amount?: string; currency?: string }>();
  const swapCurrency = currency === 'USD' || currency === 'EUR' ? currency : 'NGN';

  const handleConfirm = () => {
    router.replace({
      pathname: '/transfer-success',
      params: {
        amount: amount ?? '0',
        currency: swapCurrency,
        recipientName: '',
        recipientBank: '',
        recipientInitials: '',
        paymentMethod: 'Currency Swap',
        note: '',
      },
    });
  };

  return (
    <View style={styles.container}>
      <ReviewHeader />
      <ReviewSwapCard />
      <ReviewTransactionSummary />
      <GuaranteeBanner />
      <PaymentMethodRow />

      <View style={{ flex: 1 }} />

      <TouchableOpacity style={styles.cta} onPress={handleConfirm}>
        <Feather name="lock" size={13} color="#fff" />
        <Text style={styles.ctaText}>Confirm Swap</Text>
      </TouchableOpacity>

      <View style={styles.secureRow}>
        <Feather name="shield" size={10} color={colors.textSecondary} />
        <Text style={styles.secureText}>Secure encrypted transaction</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 46, paddingBottom: 16, gap: 8 },
  cta: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 7,
    backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 13,
  },
  ctaText: { color: '#fff', fontSize: 13.5, fontWeight: '700' },
  secureRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, marginTop: 6 },
  secureText: { color: colors.textSecondary, fontSize: 9.5 },
});