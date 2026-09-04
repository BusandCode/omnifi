// src/components/gift-cards/SellGiftCardTab.tsx
import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import Svg, { Defs, LinearGradient, Stop, Rect, Line, Text as SvgText, G } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';

type Brand = { id: string; label: string; icon: React.ReactNode };

const brands: Brand[] = [
  { id: 'amazon', label: 'Amazon Gift Card', icon: <FontAwesome5 name="amazon" size={15} color="#fff" /> },
  { id: 'apple', label: 'Apple Gift Card', icon: <FontAwesome5 name="apple" size={15} color="#fff" /> },
  { id: 'steam', label: 'Steam Gift Card', icon: <FontAwesome5 name="steam" size={15} color="#fff" /> },
  { id: 'googleplay', label: 'Google Play Gift Card', icon: <FontAwesome5 name="google-play" size={14} color="#fff" /> },
];

const PAYOUT_RATE = 0.855; // ~85.5% of face value, matching the ₦50,000 → ₦42,750 example

function GiftCardIllustration({ themeColors }: { themeColors: ReturnType<typeof useTheme>['colors'] }) {
  return (
    <View style={illStyles.wrap}>
      <Svg width={104} height={78} viewBox="0 0 104 78">
        <Defs>
          <LinearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#8B5CF6" />
            <Stop offset="1" stopColor="#4C1D95" />
          </LinearGradient>
        </Defs>
        <G rotation={-8} origin="52,39">
          <Rect x={7} y={9} width={90} height={58} rx={10} fill="url(#cardGrad)" />
          <Line x1={52} y1={9} x2={52} y2={67} stroke="rgba(255,255,255,0.45)" strokeWidth={3} />
          <Line x1={7} y1={38} x2={97} y2={38} stroke="rgba(255,255,255,0.45)" strokeWidth={3} />
          <SvgText
            x={52}
            y={28}
            fontSize={11}
            fontWeight="700"
            fontStyle="italic"
            fill="#fff"
            textAnchor="middle"
          >
            GIFT CARD
          </SvgText>
        </G>
      </Svg>
      <View style={illStyles.bow}>
        <Feather name="gift" size={13} color="#fff" />
      </View>
      <View style={[illStyles.cameraBadge, { backgroundColor: themeColors.primary, borderColor: themeColors.surface }]}>
        <Feather name="camera" size={14} color="#fff" />
      </View>
    </View>
  );
}

export function SellGiftCardTab() {
  const { colors: themeColors } = useTheme();
  const styles = useMemo(() => makeStyles(themeColors), [themeColors]);

  const [brandOpen, setBrandOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('apple');
  const [cardNumber, setCardNumber] = useState('X234 5678 9012 3456');
  const [pin, setPin] = useState('12345678');
  const [pinVisible, setPinVisible] = useState(false);
  const [cardValue, setCardValue] = useState('50000');
  const [imageAttached, setImageAttached] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const brand = brands.find((b) => b.id === selectedBrand)!;
  const numericValue = Number(cardValue) || 0;
  const estimatedPayout = Math.round(numericValue * PAYOUT_RATE);

  const canSubmit = cardNumber.length > 0 && pin.length > 0 && numericValue > 0 && imageAttached;

  const handleSubmit = () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 700);
  };

  return (
    <View style={{ gap: 10 }}>
      <View style={styles.promoCard}>
        <View style={styles.promoRow}>
          <View style={styles.promoTextCol}>
            <Text style={styles.promoTitle}>Sell Your Gift Card</Text>
            <Text style={styles.promoSub}>
              Enter your card details and upload a clear image. We'll verify and pay you instantly.
            </Text>
          </View>
          <GiftCardIllustration themeColors={themeColors} />
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>1. Select Card Type</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setBrandOpen(true)}>
          <View style={styles.dropdownIcon}>{brand.icon}</View>
          <Text style={styles.dropdownLabel}>{brand.label}</Text>
          <Ionicons name="chevron-down" size={16} color={themeColors.textSecondary} />
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
                    <Ionicons name="checkmark" size={16} color={themeColors.primaryLight} />
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
          <Feather name="credit-card" size={15} color={themeColors.textSecondary} />
          <TextInput
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="X234 5678 9012 3456"
            placeholderTextColor={themeColors.textSecondary}
            style={styles.input}
          />
          {cardNumber.length > 0 && (
            <Ionicons name="checkmark-circle" size={16} color={themeColors.success} />
          )}
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.fieldHalf}>
            <View style={styles.fieldLabelRow}>
              <Text style={styles.fieldLabel}>PIN / Security Code</Text>
              <Ionicons name="information-circle-outline" size={11} color={themeColors.textSecondary} />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                value={pin}
                onChangeText={setPin}
                placeholder="••••••••"
                placeholderTextColor={themeColors.textSecondary}
                secureTextEntry={!pinVisible}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setPinVisible((v) => !v)} hitSlop={6}>
                <Ionicons
                  name={pinVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={15}
                  color={themeColors.textSecondary}
                />
              </TouchableOpacity>
              {pin.length > 0 && (
                <Ionicons name="checkmark-circle" size={16} color={themeColors.success} />
              )}
            </View>
          </View>

          <View style={styles.fieldHalf}>
            <View style={styles.fieldLabelRow}>
              <Text style={styles.fieldLabel}>Card Value</Text>
              <Ionicons name="information-circle-outline" size={11} color={themeColors.textSecondary} />
            </View>
            <View style={styles.inputRow}>
              <TextInput
                value={cardValue ? `₦${Number(cardValue).toLocaleString()}` : ''}
                onChangeText={(t) => setCardValue(t.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                placeholder="₦50,000"
                placeholderTextColor={themeColors.textSecondary}
                style={styles.input}
              />
              {numericValue > 0 && (
                <Ionicons name="checkmark-circle" size={16} color={themeColors.success} />
              )}
            </View>
          </View>
        </View>

        <View style={styles.infoNote}>
          <Ionicons name="information-circle" size={15} color={themeColors.primaryLight} />
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
          style={styles.uploadBox}
          onPress={() => setImageAttached((v) => !v)}
          activeOpacity={0.85}
        >
          {imageAttached ? (
            <View style={styles.uploadRow}>
              <View style={styles.thumbWrap}>
                <View style={styles.thumbPlaceholder}>
                  <FontAwesome5 name={brand.id === 'apple' ? 'apple' : 'gift'} size={20} color="#fff" />
                </View>
                <TouchableOpacity
                  style={styles.thumbRemove}
                  onPress={() => setImageAttached(false)}
                  hitSlop={8}
                >
                  <Ionicons name="close" size={10} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.uploadPromptCol}>
                <View style={styles.uploadIconSm}>
                  <Feather name="upload-cloud" size={16} color={themeColors.primaryLight} />
                </View>
                <Text style={styles.uploadText}>Tap to upload or drag and drop</Text>
                <Text style={styles.uploadHint}>JPG, PNG (Max 5MB)</Text>
              </View>

              <View style={styles.uploadCheckAbs}>
                <Ionicons name="checkmark-circle" size={18} color={themeColors.success} />
              </View>
            </View>
          ) : (
            <View style={styles.uploadEmptyCol}>
              <View style={styles.uploadIconSm}>
                <Feather name="upload-cloud" size={18} color={themeColors.primaryLight} />
              </View>
              <Text style={styles.uploadText}>Tap to upload or drag and drop</Text>
              <Text style={styles.uploadHint}>JPG, PNG (Max 5MB)</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.nextCard}>
        <View style={styles.nextHeaderRow}>
          <Ionicons name="shield-checkmark" size={15} color={themeColors.primaryLight} />
          <Text style={styles.nextTitle}>What happens next?</Text>
        </View>
        {[
          "We'll verify your card within 5–15 minutes.",
          'Once verified, payment will be sent to your wallet.',
          "You'll be notified at every step.",
        ].map((line) => (
          <View key={line} style={styles.nextRow}>
            <Ionicons name="checkmark" size={13} color={themeColors.success} />
            <Text style={styles.nextText}>{line}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.payoutRow}>
        <View style={styles.payoutLabelRow}>
          <Text style={styles.payoutLabel}>Estimated Payout</Text>
          <Ionicons name="information-circle-outline" size={13} color={themeColors.textSecondary} />
        </View>
        <View style={styles.payoutValueRow}>
          <Text style={styles.payoutValue}>₦{estimatedPayout.toLocaleString()}.00</Text>
          <Ionicons name="chevron-down" size={14} color={themeColors.success} />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
        onPress={handleSubmit}
        disabled={!canSubmit || submitting}
      >
        <Text style={styles.submitText}>{submitting ? 'Submitting…' : 'Submit for Verification'}</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By continuing, you agree to our{' '}
        <Text style={styles.termsLink}>Terms & Conditions</Text>
      </Text>
    </View>
  );
}

const illStyles = StyleSheet.create({
  wrap: { width: 104, height: 78, position: 'relative' },
  bow: {
    position: 'absolute',
    top: -2,
    left: 40,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#A78BFA',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-8deg' }],
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -4,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
});

function makeStyles(themeColors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    promoCard: { backgroundColor: themeColors.surface, borderRadius: 18, padding: 16 },
    promoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    promoTextCol: { flex: 1, gap: 6 },
    promoTitle: { color: themeColors.textPrimary, fontSize: 15, fontWeight: '700' },
    promoSub: { color: themeColors.textSecondary, fontSize: 11.5, lineHeight: 16 },
    sectionTitle: { color: themeColors.textPrimary, fontSize: 13.5, fontWeight: '700', marginBottom: 10 },
    dropdown: {
      flexDirection: 'row', alignItems: 'center', gap: 10,
      backgroundColor: themeColors.surface,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 14,
    },
    dropdownIcon: {
      width: 26, height: 26, borderRadius: 13,
      backgroundColor: '#111',
      justifyContent: 'center', alignItems: 'center',
    },
    dropdownLabel: { flex: 1, color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
    modalCard: { backgroundColor: themeColors.surface, borderRadius: 16, paddingVertical: 6 },
    modalItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 12 },
    modalItemActive: { backgroundColor: themeColors.primaryTint },
    modalItemText: { flex: 1, color: themeColors.textPrimary, fontSize: 12.5, fontWeight: '600' },
    fieldLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
    fieldLabel: { color: themeColors.textSecondary, fontSize: 10.5 },
    inputRow: {
      flexDirection: 'row', alignItems: 'center', gap: 8,
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 12,
      marginBottom: 12,
    },
    input: { flex: 1, color: themeColors.textPrimary, fontSize: 12.5 },
    fieldRow: { flexDirection: 'row', gap: 10 },
    fieldHalf: { flex: 1 },
    infoNote: {
      flexDirection: 'row', alignItems: 'flex-start', gap: 8,
      backgroundColor: themeColors.primaryTint,
      borderRadius: 12,
      padding: 12,
    },
    infoText: { flex: 1, color: themeColors.textSecondary, fontSize: 10.5, lineHeight: 15 },
    uploadSub: { color: themeColors.textSecondary, fontSize: 11, marginBottom: 10, lineHeight: 15 },
    uploadBox: {
      borderWidth: 1.5,
      borderColor: themeColors.border,
      borderStyle: 'dashed',
      borderRadius: 16,
      padding: 12,
    },
    uploadRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      position: 'relative',
    },
    thumbWrap: { position: 'relative' },
    thumbPlaceholder: {
      width: 64,
      height: 44,
      borderRadius: 10,
      backgroundColor: '#1a1a1a',
      justifyContent: 'center',
      alignItems: 'center',
    },
    thumbRemove: {
      position: 'absolute',
      top: -6,
      right: -6,
      width: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: '#3A3A3C',
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadPromptCol: { flex: 1, alignItems: 'center', gap: 4 },
    uploadEmptyCol: { alignItems: 'center', gap: 6, paddingVertical: 14 },
    uploadIconSm: {
      width: 32, height: 32, borderRadius: 16,
      backgroundColor: themeColors.primaryTint,
      justifyContent: 'center', alignItems: 'center',
    },
    uploadText: { color: themeColors.textPrimary, fontSize: 11, fontWeight: '600', textAlign: 'center' },
    uploadHint: { color: themeColors.textSecondary, fontSize: 9.5 },
    uploadCheckAbs: { position: 'absolute', top: -2, right: 0 },
    nextCard: { backgroundColor: themeColors.surface, borderRadius: 16, padding: 16, gap: 8 },
    nextHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    nextTitle: { color: themeColors.primaryLight, fontSize: 12, fontWeight: '700' },
    nextRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    nextText: { color: themeColors.textSecondary, fontSize: 11 },
    divider: { height: StyleSheet.hairlineWidth, backgroundColor: themeColors.border },
    payoutRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    payoutLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    payoutLabel: { color: themeColors.textSecondary, fontSize: 11.5 },
    payoutValueRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    payoutValue: { color: themeColors.success, fontSize: 15, fontWeight: '700' },
    submitBtn: { backgroundColor: themeColors.primary, borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
    submitBtnDisabled: { opacity: 0.5 },
    submitText: { color: '#fff', fontSize: 14.5, fontWeight: '700' },
    termsText: { color: themeColors.textSecondary, fontSize: 10.5, textAlign: 'center' },
    termsLink: { color: themeColors.primaryLight, fontWeight: '600' },
  });
}