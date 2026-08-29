import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { useBalances } from '../../store/BalanceContext';

type Brand = { id: string; label: string; icon: React.ReactNode };

const brands: Brand[] = [
  { id: 'amazon', label: 'Amazon', icon: <FontAwesome5 name="amazon" size={20} color="#fff" /> },
  { id: 'apple', label: 'Apple', icon: <FontAwesome5 name="apple" size={20} color="#fff" /> },
  { id: 'googleplay', label: 'Google Play', icon: <FontAwesome5 name="google-play" size={19} color="#fff" /> },
  { id: 'steam', label: 'Steam', icon: <FontAwesome5 name="steam" size={20} color="#fff" /> },
  { id: 'netflix', label: 'Netflix', icon: <MaterialCommunityIcons name="netflix" size={21} color="#fff" /> },
  { id: 'spotify', label: 'Spotify', icon: <FontAwesome5 name="spotify" size={20} color="#fff" /> },
];

const AMOUNTS = [5000, 10000, 20000, 50000, 100000, 200000];
const FEE_RATE = 0.01; // 1% transaction fee

export function BuyGiftCardTab() {
  const { balances, debit } = useBalances();
  const [selectedBrand, setSelectedBrand] = useState('amazon');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(10000);
  const [customOpen, setCustomOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'bank'>('wallet');
  const [loading, setLoading] = useState(false);

  const brand = brands.find((b) => b.id === selectedBrand)!;
  const amount = customOpen ? Number(customAmount) || 0 : selectedAmount || 0;
  const fee = Math.round(amount * FEE_RATE);
  const total = amount + fee;

  const handleSelectAmount = (a: number) => {
    setCustomOpen(false);
    setSelectedAmount(a);
  };

  const handleSelectCustom = () => {
    setCustomOpen(true);
    setSelectedAmount(null);
  };

  const handlePay = () => {
    if (amount <= 0) return;
    if (paymentMethod === 'wallet' && balances.NGN < total) return;

    setLoading(true);
    try {
      if (paymentMethod === 'wallet') {
        debit('NGN', total);
      }
      router.replace({
        pathname: '/transfer-success',
        params: {
          amount: total.toString(),
          recipientName: '',
          recipientBank: '',
          recipientInitials: '',
          paymentMethod: 'Gift Card Purchase',
          note: `${brand.label} Gift Card`,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ gap: 20 }}>
      <View style={styles.promoCard}>
        <Text style={styles.promoTitle}>Buy Gift Cards Instantly</Text>
        <Text style={styles.promoSub}>
          Pay with your wallet balance and get the best deals on top brands.
        </Text>

        <View style={styles.promoFeature}>
          <Ionicons name="shield-checkmark" size={14} color={colors.primaryLight} />
          <View>
            <Text style={styles.promoFeatureTitle}>Secure & Trusted</Text>
            <Text style={styles.promoFeatureSub}>100% safe transactions</Text>
          </View>
        </View>
        <View style={styles.promoFeature}>
          <Ionicons name="flash" size={14} color={colors.primaryLight} />
          <View>
            <Text style={styles.promoFeatureTitle}>Instant Delivery</Text>
            <Text style={styles.promoFeatureSub}>Quick & easy to use</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>1. Select a Brand</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
        </View>
        <View style={styles.brandGrid}>
          {brands.map((b) => {
            const active = b.id === selectedBrand;
            return (
              <TouchableOpacity
                key={b.id}
                style={styles.brandItem}
                onPress={() => setSelectedBrand(b.id)}
              >
                <View style={[styles.brandIcon, active && styles.brandIconActive]}>
                  {b.icon}
                  {active && (
                    <View style={styles.brandCheck}>
                      <Ionicons name="checkmark" size={9} color="#fff" />
                    </View>
                  )}
                </View>
                <Text style={styles.brandLabel} numberOfLines={1}>{b.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>2. Select Card Type</Text>
        <View style={styles.amountGrid}>
          {AMOUNTS.map((a) => {
            const active = !customOpen && selectedAmount === a;
            return (
              <TouchableOpacity
                key={a}
                style={[styles.amountChip, active && styles.amountChipActive]}
                onPress={() => handleSelectAmount(a)}
              >
                <Text style={[styles.amountChipText, active && styles.amountChipTextActive]}>
                  ₦{a.toLocaleString()}
                </Text>
                {active && (
                  <View style={styles.amountCheck}>
                    <Ionicons name="checkmark" size={9} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[styles.amountChip, styles.customChip, customOpen && styles.amountChipActive]}
            onPress={handleSelectCustom}
          >
            <Text style={[styles.amountChipText, customOpen && styles.amountChipTextActive]}>
              Custom Amount
            </Text>
            <Feather name="edit-2" size={12} color={customOpen ? '#fff' : colors.primaryLight} />
          </TouchableOpacity>
        </View>
        {customOpen && (
          <TextInput
            value={customAmount}
            onChangeText={(t) => setCustomAmount(t.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad"
            placeholder="Enter amount"
            placeholderTextColor={colors.textSecondary}
            style={styles.customInput}
          />
        )}
      </View>

      <View>
        <Text style={styles.sectionTitle}>3. Payment Method</Text>
        <TouchableOpacity
          style={[styles.paymentRow, paymentMethod === 'wallet' && styles.paymentRowActive]}
          onPress={() => setPaymentMethod('wallet')}
        >
          <View style={styles.paymentIcon}>
            <Ionicons name="wallet" size={16} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>OmniFi Pay Balance</Text>
            <Text style={styles.paymentSub}>
              Available Balance: ₦{balances.NGN.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={[styles.radio, paymentMethod === 'wallet' && styles.radioActive]}>
            {paymentMethod === 'wallet' && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentRow, paymentMethod === 'bank' && styles.paymentRowActive]}
          onPress={() => setPaymentMethod('bank')}
        >
          <View style={styles.paymentIcon}>
            <Ionicons name="business" size={16} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>Bank Transfer</Text>
            <Text style={styles.paymentSub}>Pay directly from your bank account</Text>
          </View>
          <View style={[styles.radio, paymentMethod === 'bank' && styles.radioActive]}>
            {paymentMethod === 'bank' && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Gift Card</Text>
          <Text style={styles.summaryValue}>{brand.label} Gift Card</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Amount</Text>
          <Text style={styles.summaryValue}>₦{amount.toLocaleString()}.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Transaction Fee</Text>
          <Text style={styles.summaryValue}>₦{fee.toLocaleString()}.00</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTotalLabel}>Total Payable</Text>
          <Text style={styles.summaryTotalValue}>₦{total.toLocaleString()}.00</Text>
        </View>
      </View>

      <View style={styles.infoNote}>
        <Ionicons name="shield-checkmark" size={16} color={colors.primaryLight} />
        <Text style={styles.infoText}>
          You will receive the gift card code instantly after successful payment.
        </Text>
      </View>

      <TouchableOpacity style={styles.payBtn} onPress={handlePay} disabled={loading}>
        <Ionicons name="lock-closed" size={14} color="#fff" />
        <Text style={styles.payText}>Proceed to Pay</Text>
        <Text style={styles.payAmount}>₦{total.toLocaleString()}.00</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  promoCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    gap: 10,
  },
  promoTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  promoSub: { color: colors.textSecondary, fontSize: 11.5, lineHeight: 16 },
  promoFeature: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  promoFeatureTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700' },
  promoFeatureSub: { color: colors.textSecondary, fontSize: 10, marginTop: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { color: colors.textPrimary, fontSize: 13.5, fontWeight: '700', marginBottom: 10 },
  viewAll: { color: colors.primaryLight, fontSize: 11.5, fontWeight: '600' },
  brandGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  brandItem: { width: '28%', alignItems: 'center', gap: 6 },
  brandIcon: {
    width: 52, height: 52, borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: 'transparent',
    position: 'relative',
  },
  brandIconActive: { borderColor: colors.primary },
  brandCheck: {
    position: 'absolute', top: -4, right: -4,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: colors.background,
  },
  brandLabel: { color: colors.textSecondary, fontSize: 9.5, textAlign: 'center' },
  amountGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  amountChip: {
    width: '47%',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 13,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  amountChipActive: { borderColor: colors.primary, backgroundColor: 'rgba(167,139,250,0.1)' },
  amountChipText: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  amountChipTextActive: { color: colors.primaryLight },
  amountCheck: {
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  customChip: { width: '100%' },
  customInput: {
    marginTop: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.textPrimary,
    fontSize: 13,
  },
  paymentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  paymentRowActive: { borderColor: colors.primary },
  paymentIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  paymentTitle: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  paymentSub: { color: colors.textSecondary, fontSize: 10.5, marginTop: 2 },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  radioActive: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  summaryCard: { backgroundColor: colors.surface, borderRadius: 16, padding: 16 },
  summaryTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', marginBottom: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  summaryLabel: { color: colors.textSecondary, fontSize: 11.5 },
  summaryValue: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '600' },
  summaryDivider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  summaryTotalLabel: { color: colors.textPrimary, fontSize: 13, fontWeight: '700' },
  summaryTotalValue: { color: colors.primaryLight, fontSize: 14, fontWeight: '700' },
  infoNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: 'rgba(167,139,250,0.08)',
    borderRadius: 14,
    padding: 14,
  },
  infoText: { flex: 1, color: colors.textSecondary, fontSize: 11, lineHeight: 16 },
  payBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
  },
  payText: { color: '#fff', fontSize: 14.5, fontWeight: '700' },
  payAmount: { color: '#fff', fontSize: 14.5, fontWeight: '700', marginLeft: 4 },
});