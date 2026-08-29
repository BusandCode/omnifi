import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { applyLayoutScale, useLayoutScale } from "../../theme/ScaleContext";
import { fontScale, moderateScale } from "../../theme/scale";

const amounts = [100, 200, 500, 1000, 2000, 5000, 10000];
const popular = 500;

type Props = {
  amount: number | null;
  onSelect: (n: number) => void;
  savings: Record<number, number>;
};

export function AmountSelector({ amount, onSelect, savings }: Props) {
  const layoutScale = useLayoutScale();

  const { styles } = useMemo(() => {
    const s = (n: number) => applyLayoutScale(moderateScale(n), layoutScale);
    const f = (n: number) => applyLayoutScale(fontScale(n), layoutScale);

    return {
      styles: StyleSheet.create({
        stepTitle: { 
          color: colors.textPrimary, 
          fontSize: f(12.5), 
          fontWeight: '700', 
          marginBottom: s(8) 
        },
        grid: { 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          rowGap: s(8) 
        },
        card: {
          width: '23.5%', 
          backgroundColor: colors.surface, 
          borderRadius: s(10), 
          paddingVertical: s(9), 
          paddingHorizontal: s(4),
          alignItems: 'center', 
          borderWidth: 1.5, 
          borderColor: 'transparent', 
          position: 'relative',
        },
        cardActive: { 
          borderColor: colors.primary, 
          backgroundColor: 'rgba(167,139,250,0.1)' 
        },
        popularTag: {
          position: 'absolute', 
          top: s(-8), 
          alignSelf: 'center',
          backgroundColor: colors.primary, 
          paddingHorizontal: s(5), 
          paddingVertical: s(1.5), 
          borderRadius: s(5),
        },
        popularText: { color: '#fff', fontSize: f(7), fontWeight: '700' },
        amount: { 
          color: colors.textPrimary, 
          fontSize: f(11), 
          fontWeight: '700', 
          marginBottom: s(2) 
        },
        amountActive: { color: colors.primaryLight },
        save: { color: colors.textSecondary, fontSize: f(7.5) },
        saveActive: { color: colors.primaryLight },
        otherTitle: { 
          color: colors.textPrimary, 
          fontSize: f(9.5), 
          fontWeight: '700', 
          marginBottom: s(2), 
          textAlign: 'center' 
        },
        otherSub: { 
          color: colors.textSecondary, 
          fontSize: f(7.5), 
          textAlign: 'center' 
        },
      }),
    };
  }, [layoutScale]);

  return (
    <View>
      <Text style={styles.stepTitle}>3. Select Amount</Text>
      <View style={styles.grid}>
        {amounts.map((a) => {
          const active = a === amount;
          const save = savings[a] ?? 0;
          return (
            <TouchableOpacity
              key={a}
              style={[styles.card, active && styles.cardActive]}
              onPress={() => onSelect(a)}
            >
              {a === popular && (
                <View style={styles.popularTag}>
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )}
              <Text style={[styles.amount, active && styles.amountActive]}>₦{a.toLocaleString()}</Text>
              <Text style={[styles.save, active && styles.saveActive]}>
                {save > 0 ? `Save ₦${save}` : 'Save ₦0'}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.card}>
          <Text style={styles.otherTitle}>Other Amount</Text>
          <Text style={styles.otherSub}>Enter manually</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}