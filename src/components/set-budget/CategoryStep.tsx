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
      <Svg width={64} height={64} viewBox="0 0 64 64">
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
  wrap: { width: 72, height: 72, justifyContent: 'center', alignItems: 'center' },
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
    <View style={{ gap: 16 }}>
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
                  <Icon name={c.icon} size={18} color="#fff" />
                  {active && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={9} color="#fff" />
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
        <Ionicons name="information-circle-outline" size={15} color={colors.primaryLight} />
        <Text style={styles.infoText}>
          Budgets help you track spending and avoid overspending. You'll receive alerts when you're close to your limit.
        </Text>
      </View>

      <View style={styles.insightCard}>
        <View style={styles.insightHeaderRow}>
          <View style={styles.insightIconBox}>
            <MaterialCommunityIcons name="chart-bar" size={14} color={colors.primaryLight} />
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
          <Ionicons name="bulb-outline" size={15} color={colors.primaryLight} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.tipTitle}>Budgeting Tip</Text>
          <Text style={styles.tipText}>
            Start with a realistic amount based on your past spending to set yourself up for success.
          </Text>
        </View>
        <Feather name="chevron-right" size={15} color={colors.textSecondary} />
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={onContinue}>
        <Text style={styles.continueText}>Continue</Text>
        <Ionicons name="chevron-forward" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  introCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.25)',
  },
  introTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  introSub: { color: colors.textSecondary, fontSize: 11, marginTop: 5, lineHeight: 15 },
  sectionTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', marginBottom: 3 },
  sectionSub: { color: colors.textSecondary, fontSize: 11, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  item: {
    width: '22.5%',
    alignItems: 'center', gap: 6,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  itemActive: { borderColor: colors.primary },
  iconCircle: {
    width: 46, height: 46, borderRadius: 23,
    justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute', top: -3, right: -3,
    width: 15, height: 15, borderRadius: 7.5,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: colors.background,
  },
  itemLabel: { color: colors.textSecondary, fontSize: 8.5, textAlign: 'center' },
  infoNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: 'rgba(167,139,250,0.08)',
    borderRadius: 12,
    padding: 12,
  },
  infoText: { flex: 1, color: colors.textSecondary, fontSize: 10.5, lineHeight: 15 },
  insightCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 13 },
  insightHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  insightIconBox: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  insightTitle: { flex: 1, color: colors.textPrimary, fontSize: 11.5, fontWeight: '700' },
  insightAmount: { color: colors.textPrimary, fontSize: 12.5, fontWeight: '700' },
  insightText: { color: colors.textSecondary, fontSize: 10.5, marginTop: 8, lineHeight: 15 },
  tipCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 13,
  },
  tipIconBox: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(167,139,250,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  tipTitle: { color: colors.textPrimary, fontSize: 11.5, fontWeight: '700' },
  tipText: { color: colors.textSecondary, fontSize: 10, marginTop: 2, lineHeight: 14 },
  continueBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 15,
  },
  continueText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});