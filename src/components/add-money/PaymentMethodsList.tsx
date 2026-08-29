import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Method = {
  id: string;
  iconName: keyof typeof Feather.glyphMap;
  title: string;
  sub: string;
  right?: 'paystack' | 'cards';
  recommended?: boolean;
};

const methods: Method[] = [
  {
    id: 'paystack',
    iconName: 'bar-chart-2',
    title: 'Paystack',
    sub: 'Pay securely with your bank account or card',
    right: 'paystack',
    recommended: true,
  },
  {
    id: 'card',
    iconName: 'credit-card',
    title: 'Debit Card',
    sub: 'Add money instantly using your debit card',
    right: 'cards',
  },
  {
    id: 'cash',
    iconName: 'dollar-sign',
    title: 'Cash Deposit',
    sub: 'Deposit cash at any partner agent or branch',
  },
];

function MethodIcon({ name }: { name: Method['iconName'] }) {
  return <Feather name={name} size={16} color={colors.primaryLight} />;
}

function MethodBrand({ type }: { type?: Method['right'] }) {
  if (type === 'cards') {
    return (
      <View style={styles.brandRow}>
        <Text style={styles.visaText}>VISA</Text>
        <View style={styles.mcDots}>
          <View style={[styles.mcDot, { backgroundColor: '#EB001B' }]} />
          <View style={[styles.mcDot, { backgroundColor: '#F79E1B', marginLeft: -6 }]} />
        </View>
      </View>
    );
  }
  if (type === 'paystack') {
    return <Text style={styles.paystackText}>paystack</Text>;
  }
  return null;
}

export function PaymentMethodsList() {
  return (
    <View>
      <Text style={styles.title}>Choose a payment method</Text>
      <View style={styles.card}>
        {methods.map((m, i) => (
          <TouchableOpacity key={m.id} style={[styles.row, i !== methods.length - 1 && styles.divider]}>
            <View style={styles.iconBox}>
              <MethodIcon name={m.iconName} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.methodTitle}>{m.title}</Text>
              <Text style={styles.methodSub} numberOfLines={1}>{m.sub}</Text>
            </View>
            <View style={styles.rightCol}>
              {m.recommended && (
                <View style={styles.recommendedTag}>
                  <Text style={styles.recommendedText}>Recommended</Text>
                </View>
              )}
              <View style={styles.brandChevronRow}>
                <MethodBrand type={m.right} />
                <Feather name="chevron-right" size={16} color={colors.textSecondary} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.textPrimary, fontSize: 12, fontWeight: '600', marginBottom: 12, marginTop: -3 },
  card: { backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#2C2C2E' },
  iconBox: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  methodTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '600' },
  methodSub: { color: colors.textSecondary, fontSize: 10.5, marginTop: 2 },
  rightCol: { alignItems: 'flex-end', gap: 4 },
  brandChevronRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  recommendedTag: { backgroundColor: 'rgba(52,199,89,0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginTop: -2 },
  recommendedText: { color: colors.success, fontSize: 8, fontWeight: '600' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  visaText: { color: '#fff', fontSize: 11, fontWeight: '800', fontStyle: 'italic' },
  mcDots: { flexDirection: 'row' },
  mcDot: { width: 12, height: 12, borderRadius: 6, opacity: 0.9 },
  paystackText: { color: '#00C3F7', fontSize: 11, fontWeight: '700', marginTop: -2 },
});