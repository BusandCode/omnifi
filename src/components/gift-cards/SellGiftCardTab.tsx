import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Brand = { id: string; label: string; icon: React.ReactNode };

const brands: Brand[] = [
  { id: 'amazon', label: 'Amazon Gift Card', icon: <FontAwesome5 name="amazon" size={15} color="#fff" /> },
  { id: 'apple', label: 'Apple Gift Card', icon: <FontAwesome5 name="apple" size={15} color="#fff" /> },
  { id: 'steam', label: 'Steam Gift Card', icon: <FontAwesome5 name="steam" size={15} color="#fff" /> },
  { id: 'googleplay', label: 'Google Play Gift Card', icon: <FontAwesome5 name="google-play" size={14} color="#fff" /> },
];

const PAYOUT_RATE = 0.855; // ~85.5% of face value, matching the example payout

export function SellGiftCardTab() {
  const [brandOpen, setBrandOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('apple');
  const [cardNumber, setCardNumber] = useState('');
  const [pin, setPin] = useState('');
  const [pinVisible, setPinVisible] = useState(false);
  const [cardValue, setCardValue] = useState('');
  const [imageAttached, setImageAttached] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const brand = brands.find((b) => b.id === selectedBrand)!;
  const numericValue = Number(cardValue) || 0;
  const estimatedPayout = Math.round(numericValue * PAYOUT_RATE);

  const canSubmit = cardNumber.length > 0 && pin.length > 0 && numericValue > 0 && imageAttached;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitting(true);
    // In a real integration this would call an API to submit for verification.
    setTimeout(() => setSubmitting(false), 600);
  };

  return (
    <View style={{ gap: 20 }}>
      <View style={styles.promoCard}>
        <Text style={styles.promoTitle}>Sell Your Gift Card</Text>
        <Text style={styles.promoSub}>
          Enter your card details and upload a clear image. We'll verify and pay you instantly.
        </Text>
      </View>

      <View>
        <Text style={styles.sectionTitle}>1. Select Card Type</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setBrandOpen(true)}>
          <View style={styles.dropdownIcon}>{brand.icon}</View>
          <Text style={styles.dropdownLabel}>{brand.label}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        <Modal visible={brandOpen} transparent animationType="fade" onRequestClose={() => setBrandOpen(false)}>
          <Pressable style={styles.modalOverlay} onPress={() => setBrandOpen(false)}>
            <View style={styles.modalCard}>
              {brands.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  style={[styles.modalItem, b.id === selectedBrand && styles.modalItemActive]}
                  onPress={() => {
                    setSelectedBrand(b.id);
                    setBrandOpen(false);
                  }}
                >
                  <View style={styles.dropdownIcon}>{b.icon}</View>
                  <Text style={styles.modalItemText}>{b.label}</Text>
                  {b.id === selectedBrand && (
                    <Ionicons name="checkmark" size={16} color={colors.primaryLight} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>
      </View>

      <View>
        <Text style={styles.sectionTitle}>2. Enter Card Details</Text>

        <Text style={styles.fieldLabel}>Card Number</Text>
        <View style={styles.inputRow}>
          <Feather name="credit-card" size={15} color={colors.textSecondary} />
          <TextInput
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="X234 5678 9012 3456"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
          />
          {cardNumber.length > 0 && (
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
          )}
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.fieldHalf}>
            <Text style={styles.fieldLabel}>PIN / Security Code</Text>
            <View style={styles.inputRow}>
              <TextInput
                value={pin}
                onChangeText={setPin}
                placeholder="••••••••"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!pinVisible}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setPinVisible((v) => !v)} hitSlop={6}>
                <Ionicons
                  name={pinVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={15}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
              {pin.length > 0 && (
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              )}
            </View>
          </View>

          <View style={styles.fieldHalf}>
            <Text style={styles.fieldLabel}>Card Value</Text>
            <View style={styles.inputRow}>
              <TextInput
                value={cardValue}
                onChangeText={(t) => setCardValue(t.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                placeholder="₦50,000"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
              />
              {numericValue > 0 && (
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              )}
            </View>
          </View>
        </View>

        <View style={styles.infoNote}>
          <Ionicons name="information-circle" size={15} color={colors.primaryLight} />
          <Text style={styles.infoText}>
            Please ensure the card details are correct. Incorrect details may lead to declined transaction.
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>3. Upload Card Image</Text>
        <Text style={styles.uploadSub}>
          Upload a clear image of the physical or e-code card showing the card number and PIN.
        </Text>

        <TouchableOpacity
          style={[styles.uploadBox, imageAttached && styles.uploadBoxActive]}
          onPress={() => setImageAttached((v) => !v)}
        >
          <View style={styles.uploadIcon}>
            <Feather name="upload-cloud" size={18} color={colors.primaryLight} />
          </View>
          <Text style={styles.uploadText}>
            {imageAttached ? 'Image attached — tap to remove' : 'Tap to upload or drag and drop'}
          </Text>
          <Text style={styles.uploadHint}>JPG, PNG (Max 5MB)</Text>
          {imageAttached && (
            <View style={styles.uploadCheck}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.nextCard}>
        <View style={styles.nextHeaderRow}>
          <Ionicons name="shield-checkmark" size={15} color={colors.primaryLight} />
          <Text style={styles.nextTitle}>What happens next?</Text>
        </View>
        {[
          "We'll verify your card within 5–15 minutes.",
          'Once verified, payment will be sent to your wallet.',
          "You'll be notified at every step.",
        ].map((line) => (
          <View key={line} style={styles.nextRow}>
            <Ionicons name="checkmark" size={13} color={colors.success} />
            <Text style={styles.nextText}>{line}</Text>
          </View>
        ))}
      </View>

      <View style={styles.payoutRow}>
        <View style={styles.payoutLabelRow}>
          <Text style={styles.payoutLabel}>Estimated Payout</Text>
          <Ionicons name="information-circle-outline" size={13} color={colors.textSecondary} />
        </View>
        <View style={styles.payoutValueRow}>
          <Text style={styles.payoutValue}>₦{estimatedPayout.toLocaleString()}.00</Text>
          <Ionicons name="chevron-down" size={14} color={colors.success} />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={!canSubmit || submitting}
      >
        <Text style={styles.submitText}>Submit for Verification</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By continuing, you agree to our{' '}
        <Text style={styles.termsLink}>Terms & Conditions</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  promoCard: { backgroundColor: colors.surface, borderRadius: 18, padding: 16, gap: 6 },
  promoTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '700' },
  promoSub: { color: colors.textSecondary, fontSize: 11.5, lineHeight: 16 },
  sectionTitle: { color: colors.textPrimary, fontSize: 13.5, fontWeight: '700', marginBottom: 10 },
  dropdown: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  dropdownIcon: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#111',
    justifyContent: 'center', alignItems: 'center',
  },
  dropdownLabel: { flex: 1, color: colors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modalCard: { backgroundColor: colors.surface, borderRadius: 16, paddingVertical: 6 },
  modalItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 12 },
  modalItemActive: { backgroundColor: 'rgba(167,139,250,0.1)' },
  modalItemText: { flex: 1, color: colors.textPrimary, fontSize: 12.5, fontWeight: '600' },
  fieldLabel: { color: colors.textSecondary, fontSize: 10.5, marginBottom: 6 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  input: { flex: 1, color: colors.textPrimary, fontSize: 12.5 },
  fieldRow: { flexDirection: 'row', gap: 10 },
  fieldHalf: { flex: 1 },
  infoNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: 'rgba(167,139,250,0.08)',
    borderRadius: 12,
    padding: 12,
  },
  infoText: { flex: 1, color: colors.textSecondary, fontSize: 10.5, lineHeight: 15 },
  uploadSub: { color: colors.textSecondary, fontSize: 11, marginBottom: 10, lineHeight: 15 },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    gap: 6,
    position: 'relative',
  },
  uploadBoxActive: { borderColor: colors.primary, backgroundColor: 'rgba(167,139,250,0.06)' },
  uploadIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 4,
  },
  uploadText: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '600' },
  uploadHint: { color: colors.textSecondary, fontSize: 10 },
  uploadCheck: { position: 'absolute', top: 10, right: 10 },
  nextCard: { backgroundColor: colors.surface, borderRadius: 16, padding: 16, gap: 8 },
  nextHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  nextTitle: { color: colors.primaryLight, fontSize: 12, fontWeight: '700' },
  nextRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nextText: { color: colors.textSecondary, fontSize: 11 },
  payoutRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
  },
  payoutLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  payoutLabel: { color: colors.textSecondary, fontSize: 11.5 },
  payoutValueRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  payoutValue: { color: colors.success, fontSize: 15, fontWeight: '700' },
  submitBtn: { backgroundColor: colors.primary, borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  submitBtnDisabled: { opacity: 0.5 },
  submitText: { color: '#fff', fontSize: 14.5, fontWeight: '700' },
  termsText: { color: colors.textSecondary, fontSize: 10.5, textAlign: 'center' },
  termsLink: { color: colors.primaryLight, fontWeight: '600' },
});