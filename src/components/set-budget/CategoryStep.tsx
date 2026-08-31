import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Path, Polyline } from 'react-native-svg';
import { colors } from '../../theme/colors';
import { BUDGET_CATEGORIES, BudgetCategoryKey } from '../../constants/budgetData';
import { CurrencyCode, getCurrency } from '../../constants/currencies';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  repeat: Feather,
  zap: Feather,
  'shopping-bag': Feather,
  coffee: Feather,
  truck: Feather,
  play: Feather,
  send: Feather,
  'more-horizontal': Feather,
};

function TargetIllustration() {
  return (
    <View style={illStyles.wrap}>
      <Svg width={52} height={52} viewBox="0 0 64 64">
        <Circle cx={30} cy={34} r={24} fill="rgba(167,139,250,0.15)" stroke={colors.primaryLight} strokeWidth={1.8} />
        <Circle cx={30} cy={34} r={15} fill="rgba(167,139,250,0.15)" stroke={colors.primaryLight} strokeWidth={1.8} />
        <Circle cx={30} cy={34} r={5} fill={colors.primary} />
        <Path d="M52 10 L30 34" stroke={colors.primaryLight} strokeWidth={2.4} strokeLinecap="round" />
        <Path d="M52 10 L40 10 M52 10 L52 22" stroke={colors.primaryLight} strokeWidth={2.4} strokeLinecap="round" />
      </Svg>
    </View>
  );
}

const illStyles = StyleSheet.create({
  wrap: { width: 58, height: 58, justifyContent: 'center', alignItems: 'center' },
});

type Props = {
  currency: CurrencyCode;
  selected: BudgetCategoryKey;
  onSelect: (key: BudgetCategoryKey) => void;
  onContinue: () => void;
};

export function CategoryStep({ currency, selected, onSelect, onContinue }: Props) {
  const { symbol } = getCurrency(currency);
  const activeCategory = BUDGET_CATEGORIES.find((c) => c.key === selected)!;

  return (
    <View style={{ gap: 13 }}>
      <View style={styles.introCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.introTitle}>Create a Budget</Text>
          <Text style={styles.introSub}>
            Set a spending limit for a category and we'll help you stay on track.
          </Text>
        </View>
        <TargetIllustration />
      </View>

      <View>
        <Text style={styles.sectionTitle}>1. Choose a Category</Text>
        <Text style={styles.sectionSub}>Select the category you want to set a budget for.</Text>

        <View style={styles.grid}>
          {BUDGET_CATEGORIES.map((c) => {
            const active = c.key === selected;
            const Icon = ICON_MAP[c.icon];
            return (
              <TouchableOpacity
                key={c.key}
                style={[styles.item, active && styles.itemActive]}
                onPress={() => onSelect(c.key)}
              >
                <View style={[styles.iconCircle, { backgroundColor: c.color }]}>
                  <Icon name={c.icon} size={15} color="#fff" />
                  {active && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={8} color="#fff" />
                    </View>
                  )}
                </View>
                <Text style={styles.itemLabel} numberOfLines={1}>{c.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.infoNote}>
        <Ionicons name="information-circle-outline" size={13} color={colors.primaryLight} />
        <Text style={styles.infoText}>
          Budgets help you track spending and avoid overspending. You'll receive alerts when you're close to your limit.
        </Text>
      </View>

      <View style={styles.insightCard}>
        <View style={styles.insightHeaderRow}>
          <View style={styles.insightIconBox}>
            <MaterialCommunityIcons name="chart-bar" size={12} color={colors.primaryLight} />
          </View>
          <Text style={styles.insightTitle}>Your Insight</Text>
          <Text style={styles.insightAmount}>{symbol}{activeCategory.avgLastMonth.toLocaleString()}</Text>
        </View>
        <Text style={styles.insightText}>
          You spent an average of {symbol}{activeCategory.avgLastMonth.toLocaleString()} in {activeCategory.label} last month.
        </Text>
      </View>

      <View style={styles.tipCard}>
        <View style={styles.tipIconBox}>
          <Ionicons name="bulb-outline" size={13} color={colors.primaryLight} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.tipTitle}>Budgeting Tip</Text>
          <Text style={styles.tipText}>
            Start with a realistic amount based on your past spending to set yourself up for success.
          </Text>
        </View>
        <Feather name="chevron-right" size={13} color={colors.textSecondary} />
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
        <Text style={styles.continueText}>Continue</Text>
        <Ionicons name="chevron-forward" size={14} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  introCard: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.25)',
  },
  introTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  introSub: { color: colors.textSecondary, fontSize: 9.5, marginTop: 4, lineHeight: 13 },
  sectionTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700', marginBottom: 2 },
  sectionSub: { color: colors.textSecondary, fontSize: 9.5, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  item: {
    width: '22.5%',
    alignItems: 'center', gap: 5,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  itemActive: { borderColor: colors.primary },
  iconCircle: {
    width: 38, height: 38, borderRadius: 19,
    justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute', top: -3, right: -3,
    width: 13, height: 13, borderRadius: 6.5,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: colors.background,
  },
  itemLabel: { color: colors.textSecondary, fontSize: 7.5, textAlign: 'center' },
  infoNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 7,
    backgroundColor: 'rgba(167,139,250,0.08)',
    borderRadius: 10,
    padding: 10,
  },
  infoText: { flex: 1, color: colors.textSecondary, fontSize: 9.5, lineHeight: 13 },
  insightCard: { backgroundColor: colors.surface, borderRadius: 12, padding: 11 },
  insightHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  insightIconBox: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  insightTitle: { flex: 1, color: colors.textPrimary, fontSize: 10.5, fontWeight: '700' },
  insightAmount: { color: colors.textPrimary, fontSize: 11, fontWeight: '700' },
  insightText: { color: colors.textSecondary, fontSize: 9.5, marginTop: 7, lineHeight: 13 },
  tipCard: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 11,
  },
  tipIconBox: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  tipTitle: { color: colors.textPrimary, fontSize: 10.5, fontWeight: '700' },
  tipText: { color: colors.textSecondary, fontSize: 9, marginTop: 2, lineHeight: 13 },
  continueBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 13,
  },
  continueText: { color: '#fff', fontSize: 12.5, fontWeight: '700' },
});